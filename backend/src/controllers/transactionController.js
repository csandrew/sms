import Transaction from "../models/Transaction.js"
import User from "../models/User.js"

// Get User Transactions
export const getUserTransactions = async (req, res) => {
  try {
    const { page = 1, limit = 20, type, status } = req.query

    const filter = { user: req.user.id }
    if (type) filter.type = type
    if (status) filter.status = status

    const skip = (page - 1) * limit

    const transactions = await Transaction.find(filter)
      .populate("rental", "vehicle startTime endTime pricing")
      .skip(skip)
      .limit(Number.parseInt(limit))
      .sort({ createdAt: -1 })

    const total = await Transaction.countDocuments(filter)

    res.status(200).json({
      success: true,
      transactions,
      pagination: {
        total,
        page: Number.parseInt(page),
        limit: Number.parseInt(limit),
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Top Up Wallet
export const topUpWallet = async (req, res) => {
  try {
    const { amount } = req.body

    if (amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Amount must be greater than 0",
      })
    }

    // Update user wallet
    const user = await User.findByIdAndUpdate(req.user.id, { $inc: { "wallet.balance": amount } }, { new: true })

    // Create transaction record
    await Transaction.create({
      user: req.user.id,
      type: "wallet_topup",
      amount,
      status: "completed",
      description: `Wallet top-up of ${amount}`,
    })

    res.status(200).json({
      success: true,
      message: "Wallet topped up successfully",
      wallet: user.wallet,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Get Wallet Balance
export const getWalletBalance = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("wallet")

    res.status(200).json({
      success: true,
      wallet: user.wallet,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
