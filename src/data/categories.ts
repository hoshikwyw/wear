import type { AdminCategory } from '../types/admin'

export const initialCategories: AdminCategory[] = [
  { id: 1, name: 'T-Shirts',    icon: '👕', active: true  },
  { id: 2, name: 'Hoodies',     icon: '🧥', active: true  },
  { id: 3, name: 'Tops',        icon: '👚', active: true  },
  { id: 4, name: 'Sweatshirts', icon: '🧶', active: true  },
  { id: 5, name: 'Jackets',     icon: '🧥', active: false },
  { id: 6, name: 'Polos',       icon: '👔', active: false },
]
