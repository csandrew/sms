import express from "express"
import { getUserTransactions, topUpWallet, getWalletBalance } from "../controllers/transactionController.js"
import { protect } from "../middleware/auth.js"

const router = express.Router()

// Protected routes
router.get("/", protect, getUserTransactions)
router.post("/wallet/topup", protect, topUpWallet)
router.get("/wallet/balance", protect, getWalletBalance)

export default router
