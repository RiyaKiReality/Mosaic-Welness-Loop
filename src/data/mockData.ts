import { Product, EmptyBottleCategory, Order, WalletTransaction } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'salicylic-acid-body-wash',
    name: '1% Salicylic Acid Body Wash',
    category: 'bodycare',
    subtitle: 'Prevents body acne, exfoliates dead skin & smoothens texture',
    image: '/assets/aistudio/salicylic_body_wash_pouch.png',
    originalBottleImage: '/assets/aistudio/image_d21ab557.png',
    refillPouchImage: '/assets/aistudio/salicylic_body_wash_pouch.png',
    description: 'Formulated with 1% Salicylic Acid, Betaine, and Glycolic Acid to unclog pores, eliminate strawberry legs, and gently exfoliate without stripping the skin barrier.',
    benefits: [
      'Unclogs stubborn body pores and prevents back & chest acne',
      'Gentle exfoliating formula suitable for daily shower use',
      'pH balanced (5.5 - 6.0) to preserve delicate skin barrier',
      'Non-drying with natural hydrating moisturizers'
    ],
    directions: 'Pump onto a wet loofah or palms. Work into a rich lather over damp body skin, leave on for 60 seconds on acne-prone zones, and rinse thoroughly.',
    refillInstructions: [
      'Ensure your original 375ml pump bottle is completely empty and rinsed with clean water.',
      'Allow the inside to air dry for 15-20 minutes to prevent bacterial contamination.',
      'Cut the top spout of the eco-refill pouch along the marked scissor line.',
      'Slowly decant the gel into the bottle opening without splashing.',
      'Fasten the pump mechanism tightly until the neck clicks shut.',
      'Store any remaining pouch flat in a cool place, or return the empty bottle during your next delivery!'
    ],
    eligibleBottleType: '375ml Body Wash Pump Bottle',
    rewardValuePerEmpty: 40,
    rating: 4.8,
    reviewCount: 3410,
    isBestseller: true,
    refills: [
      {
        id: 'saw-refill-375',
        size: '375 ml',
        format: 'Spout Eco-Pouch',
        price: 299,
        originalPrice: 549,
        originalSize: '375 ml',
        pricePerMl: 0.80,
        originalPricePerMl: 1.46,
        savingsPercent: 45,
        savingsAmount: 250,
        packagingDetails: 'Multi-layer recyclable barrier pouch (78% less plastic than original rigid HDPE pump bottle)',
        isVerifiedFormat: true,
        compatibilityNote: '100% compatible with all standard 375ml Be Bodywise Body Wash pump bottles.'
      },
      {
        id: 'saw-refill-750',
        size: '750 ml (Twin Pouch)',
        format: 'Duo Spout Eco-Pouch',
        price: 549,
        originalPrice: 1098,
        originalSize: '2x 375 ml',
        pricePerMl: 0.73,
        originalPricePerMl: 1.46,
        savingsPercent: 50,
        savingsAmount: 549,
        packagingDetails: '2x Multi-layer recyclable barrier pouches with resealable spouts',
        isVerifiedFormat: true,
        compatibilityNote: 'Fills your original pump bottle twice for maximum savings.'
      }
    ]
  },
  {
    id: 'aha-bha-underarm-rollon',
    name: '4% AHA BHA Underarm Roll-on (Flora)',
    category: 'bodycare',
    subtitle: 'Controls body odour & reduces armpit hyperpigmentation',
    image: '/assets/aistudio/image_febcf3f6.png',
    originalBottleImage: '/assets/aistudio/image_febcf3f6.png',
    refillPouchImage: '/assets/aistudio/advanced_hair_growth_serum.png',
    description: 'Powered by 4% AHA BHA complex (Lactic Acid, Mandelic Acid & Salicylic Acid) to neutralize odour-causing bacteria and gently fade dark patches under arms.',
    benefits: [
      'Neutralizes sweat odour for up to 24 hours without aluminum salts',
      'Exfoliates dead cells to lighten dark, textured underarms',
      'Leaves a refreshing, subtle floral fragrance',
      'Non-sticky formula dries down within 30 seconds'
    ],
    directions: 'Apply directly onto clean, dry underarms after showering. Allow 30 seconds to dry before dressing. Use once daily.',
    refillInstructions: [
      'Gently pop off the roller-ball housing from the original 50ml bottle using a clean butter knife or thumb pressure.',
      'Rinse the roller housing and glass container with warm water; shake out excess moisture.',
      'Snip the tip of the 50ml refill pouch and decant the liquid into the container up to the fill line.',
      'Snap the roller-ball assembly firmly back down until it clicks.',
      'Store upright and roll lightly on the back of your hand to prime the ball.'
    ],
    eligibleBottleType: '50ml Underarm Roll-on Bottle',
    rewardValuePerEmpty: 20,
    rating: 4.7,
    reviewCount: 2190,
    isBestseller: true,
    refills: [
      {
        id: 'rollon-refill-50',
        size: '50 ml',
        format: 'Precision Decant Pouch',
        price: 179,
        originalPrice: 299,
        originalSize: '50 ml',
        pricePerMl: 3.58,
        originalPricePerMl: 5.98,
        savingsPercent: 40,
        savingsAmount: 120,
        packagingDetails: 'Ultra-light mono-material pouch with narrow nozzle tip',
        isVerifiedFormat: true,
        compatibilityNote: 'Engineered specifically for Be Bodywise snap-fit 50ml roll-on containers.'
      },
      {
        id: 'rollon-refill-100',
        size: '100 ml (2x Refill Pack)',
        format: 'Twin Precision Decant Pouch',
        price: 329,
        originalPrice: 598,
        originalSize: '2x 50 ml',
        pricePerMl: 3.29,
        originalPricePerMl: 5.98,
        savingsPercent: 45,
        savingsAmount: 269,
        packagingDetails: 'Dual-chamber recyclable pouch with precision nozzles',
        isVerifiedFormat: false,
        compatibilityNote: 'Proposed format: Provides 2 full replenishments for your roller bottle.'
      }
    ]
  },
  {
    id: 'detan-spf50-body-lotion',
    name: 'De-Tan SPF 50 Sunscreen Body Lotion',
    category: 'bodycare',
    subtitle: 'Broad spectrum UVA/UVB protection, water-resistant & anti-tanning',
    image: '/assets/aistudio/image_846c1869.png',
    refillPouchImage: '/assets/aistudio/image_846c1869.png',
    description: 'High-performance SPF 50 PA+++ daily body lotion that protects against tanning and sun damage with Niacinamide, Licorice Extract, and UV filters without leaving a sticky white cast.',
    benefits: [
      'SPF 50 PA+++ broad-spectrum sun and UV ray shielding',
      'Helps prevent and reverse visible sun tan and hyperpigmentation',
      'Ultra-lightweight, fast-absorbing lotion with zero white cast',
      'Water and sweat resistant for up to 80 minutes'
    ],
    directions: 'Apply generously to all exposed body areas 15 minutes before stepping into the sun. Reapply every 3-4 hours or after swimming/sweating.',
    refillInstructions: [
      'Unscrew the pump from your original 300ml De-Tan pump bottle.',
      'Cut along the scissor guide on the authentic Be Bodywise die-cut pouch.',
      'Squeeze the rich lotion smoothly into the bottle neck.',
      'Pump 2-3 times to re-prime the dispenser mechanism.',
      'Hand over the used empty bottle during your next delivery to claim ₹35 store credit.'
    ],
    eligibleBottleType: '300ml SPF Lotion Pump Bottle',
    rewardValuePerEmpty: 35,
    rating: 4.9,
    reviewCount: 4820,
    isBestseller: true,
    refills: [
      {
        id: 'detan-refill-300',
        size: '300 ml',
        format: 'Die-Cut Easy-Pour Pouch',
        price: 279,
        originalPrice: 499,
        originalSize: '300 ml',
        pricePerMl: 0.93,
        originalPricePerMl: 1.66,
        savingsPercent: 44,
        savingsAmount: 220,
        packagingDetails: 'Official Be Bodywise die-cut pouch with top hanging ring and tear notch',
        isVerifiedFormat: true,
        compatibilityNote: 'Direct drop-in refill for 300ml Be Bodywise Sunscreen & Moisturizer pump bottles.'
      }
    ]
  },
  {
    id: 'advanced-hair-growth-serum',
    name: 'Advanced Hair Growth Serum',
    category: 'haircare',
    subtitle: 'Stimulates dormant follicles, enhances scalp microcirculation & boosts density',
    image: '/assets/aistudio/advanced_hair_growth_serum.png',
    originalBottleImage: '/assets/aistudio/image_febcf3f6.png',
    refillPouchImage: '/assets/aistudio/advanced_hair_growth_serum.png',
    description: 'Clinical high-potency formula featuring 3% Redensyl, Procapil, Anagain, and Rosemary extract formulated for direct targeted scalp delivery via precision roller applicator.',
    benefits: [
      'Clinically proven actives to reactivate the hair growth cycle',
      'Targeted roll-on applicator delivers serum straight to follicle roots',
      'Non-greasy, fast-absorbing water-base with zero scalp buildup',
      'Helps reduce excessive daily shedding within 60 days'
    ],
    directions: 'Glide the roll-on applicator directly across targeted thinning scalp sections. Gently massage with fingertips for 2 minutes. Do not wash off. Use once daily.',
    refillInstructions: [
      'Twist or pop out the depleted 40ml roll-on cartridge from your applicator sleeve.',
      'Rinse the roller housing if needed and ensure the outer sleeve is clean.',
      'Unpack the new 40ml roll-on refill cartridge.',
      'Insert and snap the 40ml refill cartridge firmly into the applicator body until it clicks.',
      'Hand over the used empty cartridge/bottle to the delivery courier for ₹25 store credit.'
    ],
    eligibleBottleType: '40ml Hair Serum Roll-on Bottle',
    rewardValuePerEmpty: 25,
    rating: 4.8,
    reviewCount: 3840,
    isBestseller: true,
    refills: [
      {
        id: 'hair-serum-refill-40',
        size: '40 ml',
        format: '40ml (roll on refill)',
        price: 299,
        originalPrice: 599,
        originalSize: '40 ml',
        pricePerMl: 7.48,
        originalPricePerMl: 14.98,
        savingsPercent: 50,
        savingsAmount: 300,
        packagingDetails: 'Precision snap-fit 40ml roll-on refill cartridge with integrated roller ball',
        isVerifiedFormat: true,
        compatibilityNote: 'Engineered specifically for the Be Bodywise 40ml roll-on applicator sleeve.'
      }
    ]
  },
  {
    id: 'ketoconazole-shampoo',
    name: '1% Ketoconazole Anti-Dandruff Shampoo',
    category: 'haircare',
    subtitle: 'Eliminates dandruff fungus, soothes scalp itch & prevents flakes',
    image: '/assets/aistudio/ketoconazole_shampoo_pouch.png',
    originalBottleImage: '/assets/aistudio/image_d21ab557.png',
    refillPouchImage: '/assets/aistudio/ketoconazole_shampoo_pouch.png',
    description: 'Medical-grade antifungal formulation that targets Malassezia yeast directly at the root, relieving chronic scalp itching, flakes, and redness without drying out hair strands.',
    benefits: [
      'Clinically proven 1% Ketoconazole stops stubborn dandruff flakes',
      'Immediate soothing relief from scalp itchiness and inflammation',
      'Gentle sulfate-free foaming agents protect hair length',
      'Safe for colored and chemically treated hair'
    ],
    directions: 'Massage into wet scalp and roots. Leave on for 3 to 5 minutes so actives penetrate, then rinse thoroughly. Use 2-3 times weekly.',
    refillInstructions: [
      'Rinse 200ml flip-top bottle with warm water.',
      'Cut refill pouch top along the guide.',
      'Pour shampoo into bottle and snap flip-cap shut.',
      'Hand over empty bottle to delivery courier for ₹25 store credit.'
    ],
    eligibleBottleType: '200ml Shampoo Flip-Top Bottle',
    rewardValuePerEmpty: 25,
    rating: 4.7,
    reviewCount: 2890,
    refills: [
      {
        id: 'keto-refill-200',
        size: '200 ml',
        format: 'Spout Eco-Pouch',
        price: 249,
        originalPrice: 399,
        originalSize: '200 ml',
        pricePerMl: 1.25,
        originalPricePerMl: 2.00,
        savingsPercent: 38,
        savingsAmount: 150,
        packagingDetails: 'Multi-layer barrier pouch with resealable cap',
        isVerifiedFormat: true,
        compatibilityNote: 'Works with both flip-top and pump versions of 200ml shampoo bottles.'
      }
    ]
  }
];

export const EMPTY_BOTTLE_CATALOGUE: EmptyBottleCategory[] = [
  {
    id: 'bottle-375-pump',
    name: '375ml Body Wash Pump Bottle',
    containerType: 'Rigid HDPE Pump Bottle',
    volume: '375 ml',
    rewardAmount: 40,
    image: '/assets/aistudio/image_d21ab557.png',
    description: 'Large body wash pump bottle (e.g. 1% Salicylic Acid Body Wash).',
    instructions: 'Include both bottle and pump dispenser. Must be rinsed of excess gel.'
  },
  {
    id: 'bottle-300-spf',
    name: '300ml SPF Lotion Pump Bottle',
    containerType: 'Rigid Lotion Bottle with Dispenser',
    volume: '300 ml',
    rewardAmount: 35,
    image: '/assets/aistudio/image_846c1869.png',
    description: 'De-Tan SPF 50 sunscreen or daily moisturizing lotion bottle.',
    instructions: 'Return with pump mechanism attached. Empty and clean.'
  },
  {
    id: 'bottle-200-lotion',
    name: '200ml Shampoo Bottle',
    containerType: 'Standard Cylindrical Bottle',
    volume: '200 ml',
    rewardAmount: 25,
    image: '/assets/aistudio/image_d21ab557.png',
    description: '1% Ketoconazole Anti-Dandruff Shampoo bottles.',
    instructions: 'Return with original flip-cap or pump.'
  },
  {
    id: 'bottle-40-rollon-hair',
    name: '40ml Hair Serum Roll-on Bottle',
    containerType: 'Compact Roll-on Cartridge / Applicator',
    volume: '40 ml',
    rewardAmount: 25,
    image: '/assets/aistudio/advanced_hair_growth_serum.png',
    description: 'Advanced Hair Growth Serum roll-on applicator bottles or cartridges.',
    instructions: 'Return with roller ball housing intact.'
  },
  {
    id: 'bottle-50-rollon',
    name: '50ml Underarm Roll-on Bottle',
    containerType: 'Compact Roller-ball Container',
    volume: '50 ml',
    rewardAmount: 20,
    image: '/assets/aistudio/image_febcf3f6.png',
    description: '4% AHA BHA Underarm Roll-on bottles.',
    instructions: 'Return with roller ball assembly and outer screw cap.'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'BW-94821',
    date: '2026-10-14',
    items: [
      {
        productId: 'salicylic-acid-body-wash',
        refillOptionId: 'saw-refill-375',
        productName: '1% Salicylic Acid Body Wash Refill',
        refillSize: '375 ml',
        refillFormat: 'Spout Eco-Pouch',
        price: 299,
        quantity: 1,
        image: '/assets/aistudio/salicylic_body_wash_pouch.png'
      }
    ],
    subtotal: 299,
    deliveryFee: 49,
    discount: 0,
    creditRedeemed: 0,
    totalPayable: 348,
    deliverySlot: 'Delivered on Oct 16, 2026',
    deliveryAddress: {
      name: 'Riya Garg',
      phone: '+91 98765 43210',
      email: 'riya@example.com',
      address: 'Flat 402, Green Acres Apt, Indiranagar',
      pincode: '560038',
      city: 'Bengaluru'
    },
    returnedEmpties: [
      {
        id: 'bottle-375-pump',
        productName: '1% Salicylic Acid Body Wash 375ml',
        bottleType: '375ml Pump Bottle',
        rewardPerBottle: 40,
        quantity: 1,
        image: '/assets/aistudio/image_d21ab557.png'
      },
      {
        id: 'bottle-50-rollon',
        productName: '4% AHA BHA Underarm Roll-on 50ml',
        bottleType: '50ml Roll-on Bottle',
        rewardPerBottle: 20,
        quantity: 1,
        image: '/assets/aistudio/image_febcf3f6.png'
      }
    ],
    estimatedReward: 60,
    returnStatus: 'Credit Issued',
    statusHistory: [
      {
        status: 'Return Expected',
        timestamp: '14 Oct 2026, 03:15 PM',
        note: 'Customer opted to return 2 empties with refill delivery.'
      },
      {
        status: 'Empties Collected',
        timestamp: '16 Oct 2026, 11:42 AM',
        note: 'Courier partner collected 2 bottles at doorstep during delivery.'
      },
      {
        status: 'Under Verification',
        timestamp: '16 Oct 2026, 04:30 PM',
        note: 'Packages received at central facility; condition check passed.'
      },
      {
        status: 'Credit Issued',
        timestamp: '17 Oct 2026, 09:10 AM',
        note: '₹60 store credit credited to Bodywise Back wallet.'
      }
    ]
  }
];

export const INITIAL_WALLET_TRANSACTIONS: WalletTransaction[] = [
  {
    id: 'tx-101',
    date: '2026-10-17',
    type: 'EARNED',
    amount: 60,
    description: 'Empty bottle return verification (Order #BW-94821: 2 bottles)',
    orderId: 'BW-94821'
  }
];
