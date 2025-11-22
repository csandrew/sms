"use client"

import { useState } from "react"
import { Zap, Users, TrendingUp, MapPin, Shield, Smartphone, ArrowRight, Menu, X } from "lucide-react"
import Link from "next/link"

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              ⚡
            </div>
            <span className="text-xl font-bold text-gray-900">SmartMobility</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">
              How It Works
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
              Pricing
            </a>
            <Link
              href="/login"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Sign In
            </Link>
          </div>

                Get Started as Rider
                <ArrowRight className="w-5 h-5" />
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
                Become an Owner
                <ArrowRight className="w-5 h-5" />
              </a>
              <a href="#how-it-works" className="block text-gray-600 hover:text-gray-900">
                How It Works
              </a>
              <a href="#pricing" className="block text-gray-600 hover:text-gray-900">
                Pricing
              </a>
              <Link
                href="/login"
                className="block w-full text-center px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold"
              >
                Sign In
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 text-balance">
            Eco-Friendly Mobility at Your Fingertips
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto text-balance">
            Rent electric scooters and bikes from independent owners. Earn passive income by sharing your vehicles.
            Sustainable transportation for everyone.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/register?role=rider"
              className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
<<<<<<< HEAD
              Get Started as Rider
=======
              Start Riding
>>>>>>> 0391e96 (SMS project)
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/register?role=owner"
              className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
            >
<<<<<<< HEAD
              Become an Owner
=======
              Start Earning
>>>>>>> 0391e96 (SMS project)
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Hero Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
              <p className="text-gray-600">Active Users</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="text-3xl font-bold text-blue-600 mb-2">5K+</div>
              <p className="text-gray-600">Vehicles Available</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
              <p className="text-gray-600">Cities Covered</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Why Choose SmartMobility?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Eco-Friendly</h3>
              <p className="text-gray-600">
                Reduce your carbon footprint with electric scooters and bikes. Sustainable transportation for a better
                future.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Earn Passive Income</h3>
              <p className="text-gray-600">
                List your vehicles and earn 80% commission on every rental. Turn your assets into income streams.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Flexible Locations</h3>
              <p className="text-gray-600">
                Pick up and drop off at any rental center. No need to return to your starting point.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Secure & Safe</h3>
              <p className="text-gray-600">
                GPS tracking, IoT locks, and insurance coverage. Your safety is our priority.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Smartphone className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Easy to Use</h3>
              <p className="text-gray-600">
                Intuitive mobile app for booking, tracking, and managing your rides or vehicles.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Community Driven</h3>
              <p className="text-gray-600">
                Join thousands of riders and owners building a sustainable mobility ecosystem.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">How It Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* For Riders */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8">For Riders</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Sign Up</h4>
                    <p className="text-gray-600">Create your account in minutes with email and phone verification.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Browse & Book</h4>
                    <p className="text-gray-600">
                      Find available vehicles near you and book instantly through the app.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Ride & Enjoy</h4>
                    <p className="text-gray-600">Unlock with your phone and ride to your destination.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Drop Off & Pay</h4>
                    <p className="text-gray-600">Return at any center and pay automatically. Rate your experience.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* For Owners */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8">For Owners</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Register</h4>
                    <p className="text-gray-600">Sign up as an owner and verify your identity and vehicle details.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">List Your Vehicle</h4>
                    <p className="text-gray-600">Add your scooter or bike with photos, pricing, and features.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Get Approved</h4>
                    <p className="text-gray-600">Admin reviews and approves your vehicle for the platform.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Earn Money</h4>
                    <p className="text-gray-600">Receive 80% of rental fees. Track earnings in real-time.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Simple, Transparent Pricing</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Rider Pricing */}
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">For Riders</h3>
              <div className="mb-6">
                <p className="text-gray-600 mb-2">Pay as you go</p>
                <p className="text-4xl font-bold text-blue-600">$0.50</p>
                <p className="text-gray-600">per minute (varies by vehicle)</p>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-blue-600">✓</span> No membership fees
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-600">✓</span> Flexible drop-off locations
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-600">✓</span> Insurance included
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-600">✓</span> 24/7 support
                </li>
              </ul>
            </div>

            {/* Owner Pricing */}
            <div className="bg-white rounded-lg p-8 shadow-sm border-2 border-blue-600">
              <div className="bg-blue-600 text-white px-4 py-2 rounded-full inline-block mb-4 text-sm font-semibold">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">For Owners</h3>
              <div className="mb-6">
                <p className="text-gray-600 mb-2">Earn per rental</p>
                <p className="text-4xl font-bold text-green-600">80%</p>
                <p className="text-gray-600">commission on each ride</p>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span> No listing fees
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span> Real-time earnings tracking
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span> Vehicle maintenance support
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span> Dedicated owner support
                </li>
              </ul>
            </div>

            {/* Admin Pricing */}
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Platform Fee</h3>
              <div className="mb-6">
                <p className="text-gray-600 mb-2">Per transaction</p>
                <p className="text-4xl font-bold text-purple-600">20%</p>
                <p className="text-gray-600">service fee</p>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-purple-600">✓</span> Payment processing
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-600">✓</span> Platform maintenance
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-600">✓</span> Customer support
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-600">✓</span> Insurance & security
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-blue-100">Join thousands of riders and owners on SmartMobility today.</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register?role=rider"
              className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Start Riding
            </Link>
            <Link
              href="/register?role=owner"
              className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Start Earning
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  ⚡
                </div>
                <span className="font-bold text-white">SmartMobility</span>
              </div>
              <p className="text-sm">Sustainable mobility for everyone.</p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#features" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className="hover:text-white transition-colors">
                    How It Works
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2025 SmartMobility. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
