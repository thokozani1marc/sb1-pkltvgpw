import React from 'react';
import { usePaystackPayment } from 'react-paystack';
import { PaymentConfig } from '../types/payment';

interface PaystackButtonProps {
  config: PaymentConfig;
  onSuccess: () => void;
  onClose: () => void;
}

export function PaystackButton({ config, onSuccess, onClose }: PaystackButtonProps) {
  const initializePayment = usePaystackPayment(config);

  return (
    <button
      onClick={() => {
        initializePayment(onSuccess, onClose);
      }}
      className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
    >
      Pay with Paystack
    </button>
  );
}