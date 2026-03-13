import type { Order } from '../types/admin'

export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    customer: { name: 'Aung Kyaw', email: 'aung@example.com', address: '12 Pyay Rd, Yangon' },
    items: [
      { productId: 1, productName: 'Classic Cotton Crew Tee', size: 'M', color: '#1a1a1a', qty: 2, price: 29 },
      { productId: 7, productName: 'Heavyweight Pullover', size: 'L', color: '#2d2d2d', qty: 1, price: 75 },
    ],
    total: 133,
    status: 'delivered',
    createdAt: '2026-03-01T09:14:00Z',
  },
  {
    id: 'ORD-002',
    customer: { name: 'Su Myat', email: 'sumyat@example.com', address: '88 Strand Rd, Mandalay' },
    items: [
      { productId: 3, productName: 'Relaxed Fit Crop Top', size: 'S', color: '#ffffff', qty: 1, price: 35 },
    ],
    total: 35,
    status: 'shipped',
    createdAt: '2026-03-04T11:30:00Z',
  },
  {
    id: 'ORD-003',
    customer: { name: 'Ko Zin', email: 'kozin@example.com', address: '5 Bogyoke St, Yangon' },
    items: [
      { productId: 2, productName: 'Oversized Graphic Hoodie', size: 'L', color: '#2d2d2d', qty: 1, price: 69 },
      { productId: 5, productName: 'Vintage Wash Tee', size: 'M', color: '#8fbc8f', qty: 2, price: 34 },
    ],
    total: 137,
    status: 'processing',
    createdAt: '2026-03-07T14:22:00Z',
  },
  {
    id: 'ORD-004',
    customer: { name: 'Ma Thin', email: 'mathin@example.com', address: '22 University Ave, Yangon' },
    items: [
      { productId: 6, productName: 'Ribbed Knit Long Sleeve', size: 'XS', color: '#f5f0eb', qty: 1, price: 45 },
    ],
    total: 45,
    status: 'pending',
    createdAt: '2026-03-09T08:05:00Z',
  },
  {
    id: 'ORD-005',
    customer: { name: 'Htet Aung', email: 'htet@example.com', address: '3 Inya Rd, Yangon' },
    items: [
      { productId: 8, productName: 'Slim Fit V-Neck Tee', size: 'M', color: '#1a1a1a', qty: 3, price: 25 },
    ],
    total: 75,
    status: 'pending',
    createdAt: '2026-03-10T16:45:00Z',
  },
  {
    id: 'ORD-006',
    customer: { name: 'Nwe Nwe', email: 'nwe@example.com', address: '9 Kaba Aye Pagoda Rd, Yangon' },
    items: [
      { productId: 4, productName: 'Essential Zip-Up Hoodie', size: 'L', color: '#1a1a1a', qty: 1, price: 59 },
      { productId: 1, productName: 'Classic Cotton Crew Tee', size: 'L', color: '#c9a87c', qty: 1, price: 29 },
    ],
    total: 88,
    status: 'delivered',
    createdAt: '2026-02-28T10:00:00Z',
  },
  {
    id: 'ORD-007',
    customer: { name: 'Kyaw Zin Oo', email: 'kyawzin@example.com', address: '41 Pansodan St, Yangon' },
    items: [
      { productId: 2, productName: 'Oversized Graphic Hoodie', size: 'XL', color: '#4a5568', qty: 2, price: 69 },
    ],
    total: 138,
    status: 'cancelled',
    createdAt: '2026-03-02T13:00:00Z',
  },
  {
    id: 'ORD-008',
    customer: { name: 'Aye Mya', email: 'ayemya@example.com', address: '7 Signal Pagoda Rd, Yangon' },
    items: [
      { productId: 3, productName: 'Relaxed Fit Crop Top', size: 'M', color: '#f5c6d0', qty: 1, price: 35 },
      { productId: 6, productName: 'Ribbed Knit Long Sleeve', size: 'S', color: '#1a1a1a', qty: 1, price: 45 },
    ],
    total: 80,
    status: 'shipped',
    createdAt: '2026-03-11T09:30:00Z',
  },
]
