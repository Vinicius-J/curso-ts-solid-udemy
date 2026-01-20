import type { CartItem } from './interfaces/cart-item';

export class Product implements CartItem {
  public name;
  public price;

  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }
}
