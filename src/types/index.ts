export type ProductCategory = 'all' | 'skincare' | 'bodycare' | 'haircare';

export interface RefillOption {
  id: string;
  size: string; // e.g., "375 ml"
  format: string; // e.g., "Spout Eco-Pouch"
  price: number; // in INR
  originalPrice: number; // original packaged price
  originalSize: string; // e.g., "375 ml"
  pricePerMl: number;
  originalPricePerMl: number;
  savingsPercent: number;
  savingsAmount: number;
  packagingDetails: string;
  isVerifiedFormat: boolean; // whether commercially verified or proposed prototype
  compatibilityNote: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'skincare' | 'bodycare' | 'haircare';
  subtitle: string;
  image: string;
  originalBottleImage?: string;
  refillPouchImage?: string;
  description: string;
  benefits: string[];
  directions: string;
  refillInstructions: string[];
  eligibleBottleType: string;
  rewardValuePerEmpty: number; // in INR
  refills: RefillOption[];
  rating: number;
  reviewCount: number;
  isBestseller?: boolean;
}

export interface CartItem {
  productId: string;
  refillOptionId: string;
  productName: string;
  refillSize: string;
  refillFormat: string;
  price: number;
  quantity: number;
  image: string;
}

export interface EmptyBottleReturnItem {
  id: string;
  productName: string;
  bottleType: string;
  rewardPerBottle: number; // in INR
  quantity: number;
  image?: string;
}

export type ReturnVerificationStatus = 
  | 'Return Expected' 
  | 'Empties Collected' 
  | 'Under Verification' 
  | 'Credit Issued';

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  creditRedeemed: number;
  totalPayable: number;
  deliverySlot: string;
  deliveryAddress: {
    name: string;
    phone: string;
    email: string;
    address: string;
    pincode: string;
    city: string;
  };
  returnedEmpties: EmptyBottleReturnItem[];
  estimatedReward: number;
  returnStatus: ReturnVerificationStatus;
  statusHistory: {
    status: ReturnVerificationStatus;
    timestamp: string;
    note: string;
  }[];
}

export interface WalletTransaction {
  id: string;
  date: string;
  type: 'EARNED' | 'REDEEMED' | 'PROMOTIONAL';
  amount: number;
  description: string;
  orderId?: string;
}

export interface EmptyBottleCategory {
  id: string;
  name: string;
  containerType: string;
  volume: string;
  rewardAmount: number; // in INR
  image: string;
  description: string;
  instructions: string;
}
