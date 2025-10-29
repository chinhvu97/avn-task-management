// ============================================
// STORES MASTER DATA (8 AEON Vietnam Stores)
// ============================================
// Single source of truth for all store information
// Used by both HQ app and Staff app

import { Store } from '../types';

/**
 * Master list of all AEON Vietnam stores
 * Demo/Prototype: 4 stores
 * Target 2030: 300 stores nationwide
 */
export const stores: Store[] = [
  // MAIN DEMO STORE - Full workflow demonstration
  {
    id: 'demo-01',
    name: 'AEON MAXVALU OCEAN PARK HAWAII BUILDING',
    city: 'Ocean Park',
    region: 'North',
  },
  {
    id: 'demo-02',
    name: 'AEON MAXVALU SKY OASIS',
    city: 'Sky Oasis',
    region: 'North',
  },
  {
    id: 'demo-03',
    name: 'AEON MAXVALU ECOPARK RỪNG CỌ',
    city: 'Ecopark',
    region: 'North',
  },
  {
    id: 'demo-04',
    name: 'AEON MAXVALU ECOPARK',
    city: 'Ecopark',
    region: 'North',
  },
];

/**
 * Get stores by region
 */
export function getStoresByRegion(region: string): Store[] {
  return stores.filter(store => store.region === region);
}

/**
 * Get store by ID
 */
export function getStoreById(id: string): Store | undefined {
  return stores.find(store => store.id === id);
}

/**
 * Get store by city
 */
export function getStoresByCity(city: string): Store[] {
  return stores.filter(store => store.city === city);
}

/**
 * Get all unique regions
 */
export function getRegions(): string[] {
  return Array.from(new Set(stores.map(store => store.region)));
}

/**
 * Get all unique cities
 */
export function getCities(): string[] {
  return Array.from(new Set(stores.map(store => store.city)));
}
