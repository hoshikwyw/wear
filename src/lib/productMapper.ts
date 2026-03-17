import type { Product, GarmentType } from '../types/product'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function rowToProduct(row: any): Product {
  return {
    id: row.id,
    name: row.name,
    price: Number(row.price),
    originalPrice: row.original_price != null ? Number(row.original_price) : undefined,
    tag: row.tag ?? undefined,
    colors: row.colors,
    category: row.category,
    description: row.description,
    sizes: row.sizes,
    material: row.material,
    fit: row.fit,
    garmentType: row.garment_type as GarmentType,
    customizable: row.customizable,
  }
}

export function productToRow(p: Omit<Product, 'id'>) {
  return {
    name: p.name,
    price: p.price,
    original_price: p.originalPrice ?? null,
    tag: p.tag ?? null,
    colors: p.colors,
    category: p.category,
    description: p.description,
    sizes: p.sizes,
    material: p.material,
    fit: p.fit,
    garment_type: p.garmentType,
    customizable: p.customizable,
  }
}
