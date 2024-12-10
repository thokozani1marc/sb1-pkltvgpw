import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CreditCard } from 'lucide-react';
import { plans } from './config/plans';
import { PricingCard } from './components/PricingCard';
import { PaymentCallback } from './components/PaymentCallback';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/payment/callback" element={<PaymentCallback />} />
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-gray-100">
              <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-6">
                  <div className="flex items-center">
                    <CreditCard className="w-8 h-8 text-blue-600 mr-3" />
                    <h1 className="text-2xl font-bold text-gray-900">Subscription Plans</h1>
                  </div>
                </div>
              </header>

              <main className="max-w-7xl mx-auto px-4 py-12">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
                  <p className="text-lg text-gray-600">Select the perfect plan for your needs</p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8">
                  {plans.map((plan) => (
                    <PricingCard key={plan.id} plan={plan} />
                  ))}
                </div>

                <div className="mt-12 text-center text-gray-600">
                  <p>All payments are processed securely through Paystack</p>
                  <p className="mt-2">Prices are in South African Rand (ZAR)</p>
                </div>
              </main>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;