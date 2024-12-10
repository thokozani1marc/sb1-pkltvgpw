export interface Plan {
  id: number;
  name: string;
  price: number;
  paymentLink: string;
  frequency: string;
  features: string[];
}

export interface PaymentConfig {
  email: string;
  amount: number;
  publicKey: string;
  currency: string;
}

export interface PaymentData {
  reference: string;
  email: string;
  amount: number;
  plan_name: string;
  status: string;
  metadata: {
    custom_fields: Array<{
      display_name: string;
      variable_name: string;
      value: string;
    }>;
  };
}