export type Condition = 'Excellent' | 'Good' | 'Fair'

export interface Laptop {
  id: number
  brand: string
  model: string
  processor: string
  ram: string
  storage: string
  display: string
  price: number
  condition: Condition
  gradient: string
}

// ── Repair ──────────────────────────────────────────────────────────────────

export interface RepairItem {
  name: string
  priceRange: string
  turnaround: string
}

export interface RepairCategory {
  id: number
  title: string
  description: string
  gradient: string
  iconType: 'circuit' | 'wrench' | 'code' | 'sparkle'
  items: RepairItem[]
}

// ── Accessories ─────────────────────────────────────────────────────────────

export type AccessoryCategory =
  | 'Memory'
  | 'Storage'
  | 'Battery'
  | 'Display'
  | 'Input'
  | 'Cooling'
  | 'Peripherals'

export type StockCondition = 'New' | 'Used'

export interface Accessory {
  id: number
  name: string
  category: AccessoryCategory
  condition: StockCondition
  price: number
  note: string
  gradient: string
}
