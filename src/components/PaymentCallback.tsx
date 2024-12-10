import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { verifyPayment, savePaymentToSupabase } from '../services/paymentService';
import { CheckCircle, XCircle, Loader } from 'lucide-react';

export function PaymentCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const reference = searchParams.get('reference');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    async function handlePaymentVerification() {
      if (!reference) {
        setStatus('error');
        setError('No payment reference found');
        return;
      }

      try {
        console.log('Verifying payment with reference:', reference);
        const paymentData = await verifyPayment(reference);
        
        if (!paymentData) {
          throw new Error('No payment data received from Paystack');
        }

        console.log('Payment verified:', paymentData);
        
        const saved = await savePaymentToSupabase(paymentData);
        if (saved) {
          console.log('Payment saved to Supabase successfully');
          setStatus('success');
          setTimeout(() => navigate('/'), 3000);
        } else {
          throw new Error('Failed to save payment data');
        }
      } catch (err) {
        console.error('Payment processing error:', err);
        setStatus('error');
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      }
    }

    handlePaymentVerification();
  }, [reference, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        {status === 'loading' && (
          <div className="text-center">
            <Loader className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Processing Payment</h2>
            <p className="text-gray-600">Please wait while we verify your payment...</p>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center">
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Payment Successful!</h2>
            <p className="text-gray-600 mb-4">Your payment has been processed and verified.</p>
            <p className="text-sm text-gray-500">Redirecting you back to home...</p>
          </div>
        )}

        {status === 'error' && (
          <div className="text-center">
            <XCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Payment Error</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => navigate('/')}
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Return to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
}