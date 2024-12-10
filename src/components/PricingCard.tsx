import React from 'react';
import { Check } from 'lucide-react';
import { Plan } from '../types/payment';

interface PricingCardProps {
  plan: Plan;
}

export function PricingCard({ plan }: PricingCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col">
      <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
      <div className="mb-6">
        <p className="text-3xl font-bold">R{(plan.price / 100).toFixed(2)}</p>
        <p className="text-gray-600">{plan.frequency}</p>
      </div>
      <ul className="flex-grow mb-6">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-center mb-2">
            <Check className="w-5 h-5 text-green-500 mr-2" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <a
        href={plan.paymentLink}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-center"
      >
        Subscribe Now
      </a>
    </div>
  );
}