import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Product,
  CartItem,
  EmptyBottleReturnItem,
  Order,
  WalletTransaction,
  ReturnVerificationStatus
} from '../types';
import {
  PRODUCTS,
  EMPTY_BOTTLE_CATALOGUE,
  INITIAL_ORDERS,
  INITIAL_WALLET_TRANSACTIONS
} from '../data/mockData';

interface AppContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  products: Product[];
  selectedProductModal: Product | null;
  setSelectedProductModal: (product: Product | null) => void;
  // Cart
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (item: CartItem) => void;
  updateCartQuantity: (refillOptionId: string, quantity: number) => void;
  removeFromCart: (refillOptionId: string) => void;
  clearCart: () => void;
  cartSubtotal: number;
  totalCartItemCount: number;
  // Bottle Returns in Cart
  isReturnOptedIn: boolean;
  setIsReturnOptedIn: (optedIn: boolean) => void;
  returnItems: EmptyBottleReturnItem[];
  setReturnBottleQuantity: (bottleId: string, quantity: number) => void;
  estimatedReturnReward: number;
  totalReturnBottlesCount: number;
  // Wallet
  walletBalance: number;
  walletTransactions: WalletTransaction[];
  redeemCredit: (amount: number) => boolean;
  // Checkout & Orders
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  orders: Order[];
  placedOrderModal: Order | null;
  setPlacedOrderModal: (order: Order | null) => void;
  placeOrder: (orderData: Omit<Order, 'id' | 'date' | 'returnStatus' | 'statusHistory'>) => Order;
  simulateOrderVerification: (orderId: string) => void;
  // Toast notifications
  toastMessage: string | null;
  showToast: (message: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY_CART = 'bodywise_cart_v1';
const LOCAL_STORAGE_KEY_RETURNS = 'bodywise_returns_v1';
const LOCAL_STORAGE_KEY_RETURNS_OPTED = 'bodywise_returns_opted_v1';
const LOCAL_STORAGE_KEY_WALLET = 'bodywise_wallet_v1';
const LOCAL_STORAGE_KEY_TRANSACTIONS = 'bodywise_transactions_v1';
const LOCAL_STORAGE_KEY_ORDERS = 'bodywise_orders_v1';

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedProductModal, setSelectedProductModal] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [placedOrderModal, setPlacedOrderModal] = useState<Order | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initialize cart from localStorage (filtered against current active products)
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_CART);
      if (saved) {
        const parsed: CartItem[] = JSON.parse(saved);
        return parsed.filter((item) => PRODUCTS.some((p) => p.id === item.productId));
      }
      return [];
    } catch {
      return [];
    }
  });

  // Bottle returns opt-in state
  const [isReturnOptedIn, setIsReturnOptedIn] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_RETURNS_OPTED);
      return saved ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  // Bottle returns items (synchronized with current catalogue)
  const [returnItems, setReturnItems] = useState<EmptyBottleReturnItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_RETURNS);
      if (saved) {
        const parsed: EmptyBottleReturnItem[] = JSON.parse(saved);
        return EMPTY_BOTTLE_CATALOGUE.map((cat) => {
          const existing = parsed.find((p) => p.id === cat.id);
          return {
            id: cat.id,
            productName: cat.name,
            bottleType: cat.containerType,
            rewardPerBottle: cat.rewardAmount,
            quantity: existing ? existing.quantity : 0,
            image: cat.image
          };
        });
      }
    } catch {
      // fallback
    }
    return EMPTY_BOTTLE_CATALOGUE.map((cat) => ({
      id: cat.id,
      productName: cat.name,
      bottleType: cat.containerType,
      rewardPerBottle: cat.rewardAmount,
      quantity: 0,
      image: cat.image
    }));
  });

  // Wallet balance (default initial ₹60 demo balance from prior verified return)
  const [walletBalance, setWalletBalance] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_WALLET);
      return saved !== null ? JSON.parse(saved) : 60;
    } catch {
      return 60;
    }
  });

  // Wallet transactions
  const [walletTransactions, setWalletTransactions] = useState<WalletTransaction[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_TRANSACTIONS);
      return saved ? JSON.parse(saved) : INITIAL_WALLET_TRANSACTIONS;
    } catch {
      return INITIAL_WALLET_TRANSACTIONS;
    }
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_ORDERS);
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  // Persistence effects
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_CART, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_RETURNS_OPTED, JSON.stringify(isReturnOptedIn));
  }, [isReturnOptedIn]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_RETURNS, JSON.stringify(returnItems));
  }, [returnItems]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_WALLET, JSON.stringify(walletBalance));
  }, [walletBalance]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_TRANSACTIONS, JSON.stringify(walletTransactions));
  }, [walletTransactions]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_ORDERS, JSON.stringify(orders));
  }, [orders]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 3200);
  };

  const addToCart = (newItem: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.refillOptionId === newItem.refillOptionId);
      if (existing) {
        return prev.map((item) =>
          item.refillOptionId === newItem.refillOptionId
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      }
      return [...prev, newItem];
    });
    showToast(`Added ${newItem.productName} (${newItem.refillSize}) to cart`);
  };

  const updateCartQuantity = (refillOptionId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(refillOptionId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.refillOptionId === refillOptionId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (refillOptionId: string) => {
    setCart((prev) => prev.filter((item) => item.refillOptionId !== refillOptionId));
    showToast('Item removed from cart');
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalCartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const setReturnBottleQuantity = (bottleId: string, quantity: number) => {
    const safeQty = Math.max(0, Math.min(8, quantity)); // cap at 8 per delivery
    setReturnItems((prev) =>
      prev.map((b) => (b.id === bottleId ? { ...b, quantity: safeQty } : b))
    );
  };

  const totalReturnBottlesCount = isReturnOptedIn
    ? returnItems.reduce((sum, b) => sum + b.quantity, 0)
    : 0;

  const estimatedReturnReward = isReturnOptedIn
    ? returnItems.reduce((sum, b) => sum + b.quantity * b.rewardPerBottle, 0)
    : 0;

  const redeemCredit = (amount: number): boolean => {
    if (amount <= 0 || amount > walletBalance) return false;
    setWalletBalance((prev) => prev - amount);
    const newTx: WalletTransaction = {
      id: `tx-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      type: 'REDEEMED',
      amount,
      description: 'Store credit applied at checkout'
    };
    setWalletTransactions((prev) => [newTx, ...prev]);
    return true;
  };

  const placeOrder = (
    orderData: Omit<Order, 'id' | 'date' | 'returnStatus' | 'statusHistory'>
  ): Order => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const newOrderId = `BW-${randomNum}`;
    const today = new Date().toISOString().split('T')[0];

    const initialHistory = [
      {
        status: 'Return Expected' as ReturnVerificationStatus,
        timestamp: `${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
        note: orderData.returnedEmpties.length > 0
          ? `Order placed. Customer selected ${orderData.returnedEmpties.reduce((s, b) => s + b.quantity, 0)} empty bottle(s) for collection.`
          : 'Refill order placed without bottle returns.'
      }
    ];

    const newOrder: Order = {
      ...orderData,
      id: newOrderId,
      date: today,
      returnStatus: 'Return Expected',
      statusHistory: initialHistory
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();

    // Reset return selections after placing order
    setReturnItems((prev) => prev.map((b) => ({ ...b, quantity: 0 })));
    setIsReturnOptedIn(false);

    setPlacedOrderModal(newOrder);
    setIsCheckoutOpen(false);
    return newOrder;
  };

  // Simulated Verification for testing circular loop
  const simulateOrderVerification = (orderId: string) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;

        if (order.returnStatus === 'Credit Issued') {
          return order; // already completed
        }

        let nextStatus: ReturnVerificationStatus = 'Empties Collected';
        let note = 'Courier collected empty bottles during refill handover.';

        if (order.returnStatus === 'Return Expected') {
          nextStatus = 'Empties Collected';
          note = 'Delivery partner safely collected empty bottles at doorstep.';
        } else if (order.returnStatus === 'Empties Collected') {
          nextStatus = 'Under Verification';
          note = 'Inspection team inspected bottles: labels intact, packaging cleaned.';
        } else if (order.returnStatus === 'Under Verification') {
          nextStatus = 'Credit Issued';
          note = `Quality check passed! ₹${order.estimatedReward} credited to Bodywise Back wallet.`;
        }

        const now = `${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

        // If next status is 'Credit Issued', deposit credit into wallet!
        if (nextStatus === 'Credit Issued' && order.estimatedReward > 0) {
          setWalletBalance((b) => b + order.estimatedReward);
          const creditTx: WalletTransaction = {
            id: `tx-${Date.now()}`,
            date: new Date().toISOString().split('T')[0],
            type: 'EARNED',
            amount: order.estimatedReward,
            description: `Bottle return reward verified for Order #${order.id}`,
            orderId: order.id
          };
          setWalletTransactions((txs) => [creditTx, ...txs]);
          showToast(`₹${order.estimatedReward} store credit added to your wallet!`);
        } else {
          showToast(`Return status updated to: ${nextStatus}`);
        }

        return {
          ...order,
          returnStatus: nextStatus,
          statusHistory: [
            ...order.statusHistory,
            { status: nextStatus, timestamp: now, note }
          ]
        };
      })
    );
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        products: PRODUCTS,
        selectedProductModal,
        setSelectedProductModal,
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartSubtotal,
        totalCartItemCount,
        isReturnOptedIn,
        setIsReturnOptedIn,
        returnItems,
        setReturnBottleQuantity,
        estimatedReturnReward,
        totalReturnBottlesCount,
        walletBalance,
        walletTransactions,
        redeemCredit,
        isCheckoutOpen,
        setIsCheckoutOpen,
        orders,
        placedOrderModal,
        setPlacedOrderModal,
        placeOrder,
        simulateOrderVerification,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
