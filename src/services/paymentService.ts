import { supabase } from '../config/supabase';
import { PaymentData } from '../types/payment';

const PAYSTACK_SECRET_KEY = 'sk_test_4d80ee5ab1e37972991fd7cece38474edc4819db';

export async function verifyPayment(reference: string): Promise<PaymentData | null> {
  try {
    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to verify payment with Paystack');
    }

    const { data } = await response.json();
    
    if (data) {
      // Transform Paystack response to match our PaymentData interface
      const paymentData: PaymentData = {
        reference: data.reference,
        email: data.customer.email,
        amount: data.amount,
        status: data.status,
        plan_name: data.metadata?.plan_name || 'Unknown Plan',
        metadata: {
          custom_fields: data.metadata?.custom_fields || []
        }
      };
      return paymentData;
    }
    return null;
  } catch (error) {
    console.error('Error verifying payment:', error);
    throw error;
  }
}

export async function savePaymentToSupabase(paymentData: PaymentData) {
  try {
    console.log('Attempting to save payment data:', paymentData);

    const { data, error } = await supabase
      .from('payments')
      .insert([
        {
          reference: paymentData.reference,
          email: paymentData.email,
          amount: paymentData.amount,
          plan_name: paymentData.plan_name,
          status: paymentData.status,
          custom_fields: paymentData.metadata.custom_fields,
          created_at: new Date().toISOString(),
        }
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    console.log('Payment saved successfully:', data);
    return true;
  } catch (error) {
    console.error('Error saving payment:', error);
    throw error;
  }
}