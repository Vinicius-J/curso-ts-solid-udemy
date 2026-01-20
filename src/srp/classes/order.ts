import type { OrderStatus } from './interfaces/order-status';
import type { Messaging } from '../services/messaging';
import type { Persistency } from '../services/persistency';
import type { ShoppingCart } from './shopping-cart';

export class Order {
  private _orderStatus: OrderStatus = 'open';
  private readonly cart;
  private readonly messaging;
  private readonly persistency;

  constructor(
    cart: ShoppingCart,
    messaging: Messaging,
    persistency: Persistency,
  ) {
    this.cart = cart;
    this.messaging = messaging;
    this.persistency = persistency;
  }

  get orderStatus(): OrderStatus {
    return this._orderStatus;
  }

  checkout(): void {
    if (this.cart.isEmpty()) {
      console.log('Seu carrinho está vazio');
      return;
    }

    this._orderStatus = 'closed';
    this.messaging.sendMessage(
      `Seu pedido com total de ${this.cart.total()} foi recebido.`,
    );
    this.persistency.saveOrder();
    this.cart.clear();
  }
}
