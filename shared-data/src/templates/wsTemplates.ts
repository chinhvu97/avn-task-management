// ============================================
// WS TEMPLATES (Work Standard Event Tasks)
// ============================================
// Extracted from ai-hq-task-assignment/src/data/mockData.ts

import { TaskTemplate } from '../types';

export const wsTemplates: TaskTemplate[] = [
  {
    id: 101,
    code: 'WS-001',
    title: 'Holiday Decoration Setup - Christmas',
    type: 'WS',
    category: 'Seasonal Events',
    event: 'Christmas',
    estimatedMinutes: 240,
    description: 'Set up Christmas decorations including main entrance display, tree, ornaments, and lighting according to seasonal guidelines.',
    sampleImages: [
      'https://images.unsplash.com/photo-1512389142860-9c449e58a543',
      'https://images.unsplash.com/photo-1543589077-47d81606c1bf'
    ],
    requiresHQApproval: true,
    priority: 'High',
    recurrence: 'event-based',
    isActive: false,
    order: 1,
  },
  {
    id: 102,
    code: 'WS-002',
    title: 'New Year Sale Display',
    type: 'WS',
    category: 'Promotions',
    event: 'New Year',
    estimatedMinutes: 180,
    description: 'Create promotional display for New Year sale. Include pricing signage and featured products.',
    sampleImages: [
      'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da'
    ],
    requiresHQApproval: false,
    priority: 'High',
    recurrence: 'event-based',
    isActive: true,
    order: 2,
  },
  {
    id: 103,
    code: 'WS-003',
    title: 'Valentine Display Setup',
    type: 'WS',
    category: 'Seasonal Events',
    event: 'Valentine\'s Day',
    estimatedMinutes: 150,
    description: 'Set up Valentine themed display with chocolates, flowers, and gift items.',
    sampleImages: [
      'https://images.unsplash.com/photo-1518199266791-5375a83190b7'
    ],
    requiresHQApproval: false,
    priority: 'Medium',
    recurrence: 'event-based',
    isActive: true,
    order: 3,
  },
  {
    id: 104,
    code: 'WS-004',
    title: 'Fire Safety Inspection',
    type: 'WS',
    category: 'Safety & Compliance',
    event: 'Safety Inspection',
    estimatedMinutes: 120,
    description: 'Complete monthly fire safety inspection. Document all fire extinguishers, exits, and alarms.',
    sampleImages: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64'
    ],
    requiresHQApproval: true,
    priority: 'High',
    recurrence: 'event-based',
    isActive: true,
    order: 4,
  },
  {
    id: 105,
    code: 'WS-005',
    title: 'Store Renovation - Entrance Area',
    type: 'WS',
    category: 'Special Projects',
    event: 'Store Renovation',
    estimatedMinutes: 480,
    description: 'Coordinate and document store entrance renovation project.',
    sampleImages: [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8'
    ],
    requiresHQApproval: true,
    priority: 'High',
    recurrence: 'event-based',
    isActive: true,
    order: 5,
  },
  {
    id: 106,
    code: 'WS-006',
    title: 'Lunar New Year Display Setup',
    type: 'WS',
    category: 'Seasonal Events',
    event: 'Lunar New Year',
    estimatedMinutes: 300,
    description: 'Set up Lunar New Year decorations and promotional displays with traditional red and gold theme.',
    sampleImages: [
      'https://images.unsplash.com/photo-1519677100203-a0e668c92439'
    ],
    requiresHQApproval: true,
    priority: 'High',
    recurrence: 'event-based',
    isActive: true,
    order: 6,
  },
  {
    id: 107,
    code: 'WS-007',
    title: 'Women\'s Day Display Setup',
    type: 'WS',
    category: 'Seasonal Events',
    event: 'Women\'s Day',
    estimatedMinutes: 180,
    description: 'Create Women\'s Day promotional display featuring beauty, fashion, and gift items.',
    sampleImages: [
      'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2'
    ],
    requiresHQApproval: false,
    priority: 'Medium',
    recurrence: 'event-based',
    isActive: true,
    order: 7,
  },
  {
    id: 108,
    code: 'WS-008',
    title: 'Back to School Display',
    type: 'WS',
    category: 'Seasonal Events',
    event: 'Back to School',
    estimatedMinutes: 240,
    description: 'Set up back to school display with stationery, uniforms, and school supplies.',
    sampleImages: [
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b'
    ],
    requiresHQApproval: false,
    priority: 'Medium',
    recurrence: 'event-based',
    isActive: true,
    order: 8,
  },
  {
    id: 109,
    code: 'WS-009',
    title: 'Summer Sale Promotion Setup',
    type: 'WS',
    category: 'Promotions',
    event: 'Summer Sale',
    estimatedMinutes: 210,
    description: 'Create summer sale promotional display with seasonal products and clearance items.',
    sampleImages: [
      'https://images.unsplash.com/photo-1441986380878-c4248f5b8b5b'
    ],
    requiresHQApproval: false,
    priority: 'High',
    recurrence: 'event-based',
    isActive: true,
    order: 9,
  },
  {
    id: 110,
    code: 'WS-010',
    title: 'Mid-Autumn Festival Display',
    type: 'WS',
    category: 'Seasonal Events',
    event: 'Mid-Autumn Festival',
    estimatedMinutes: 180,
    description: 'Set up Mid-Autumn Festival display with mooncakes, lanterns, and traditional gifts.',
    sampleImages: [
      'https://images.unsplash.com/photo-1601666370460-a2ee1f6e0a82'
    ],
    requiresHQApproval: false,
    priority: 'Medium',
    recurrence: 'event-based',
    isActive: true,
    order: 10,
  },
];
