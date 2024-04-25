import type { Products } from '@prisma/client';

export interface ProductWithQuantityType extends Products {
  quantity: number;
}

type CartStoreState = {
  cart: ProductWithQuantityType[];
};

export const useCartStore = defineStore('cartStore', {
  state: (): CartStoreState => ({
    cart: []
  }),
  getters: {
    cartCount(): number {
      return this.cart.length;
    }
  },
  actions: {
    addToCart(product: ProductWithQuantityType) {
      const existingProduct = this.cart.find((p) => p.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
        return;
      } else {
        product.quantity = 1;
        this.cart.push(product);
      }
    },
    removeFromCart(product: ProductWithQuantityType) {
      const existingProduct = this.cart.find((p) => p.id === product.id);
      if (existingProduct) {
        this.cart = this.cart.filter((p) => p.id !== product.id);
      }
    },
    setCart(cart: ProductWithQuantityType[]) {
      this.cart = cart;
    }
  }
});
