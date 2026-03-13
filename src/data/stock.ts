import type { StockMap } from '../types/admin'

// productId -> size -> quantity
export const initialStock: StockMap = {
  1: { XS: 12, S: 18, M: 25, L: 20, XL: 10 },
  2: { S: 8,  M: 14, L: 11, XL: 6  },
  3: { XS: 15, S: 20, M: 18, L: 9  },
  4: { S: 7,  M: 13, L: 10, XL: 5, XXL: 3 },
  5: { XS: 10, S: 16, M: 22, L: 17, XL: 8 },
  6: { XS: 5,  S: 9,  M: 12, L: 7  },
  7: { S: 6,  M: 11, L: 9,  XL: 4  },
  8: { XS: 14, S: 19, M: 28, L: 23, XL: 12, XXL: 6 },
}
