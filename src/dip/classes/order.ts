import type { OrderStatus } from './interfaces/order-status';
import type { MessagingProtocol } from './interfaces/messaging-protocol';
import type { PersistencyProtocol } from './interfaces/persistency-protocol';
import type { ShoppingCartProtocol } from './interfaces/shopping-cart-protocol';
import type { CustomerOrder } from './interfaces/custumer-protocol';

export class Order {
  private _orderStatus: OrderStatus = 'open';
  private readonly cart;
  private readonly messaging;
  private readonly persistency;
  private readonly customer;

  constructor(
    cart: ShoppingCartProtocol,
    messaging: MessagingProtocol,
    persistency: PersistencyProtocol,
    customer: CustomerOrder,
  ) {
    this.cart = cart;
    this.messaging = messaging;
    this.persistency = persistency;
    this.customer = customer;
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
      `Seu pedido com total de ${this.cart.totalWithDiscount()} foi recebido.`,
    );
    this.persistency.saveOrder();
    this.cart.clear();
    console.log(
      'O cliente é,',
      this.customer.getName(),
      this.customer.getIDN(),
    );
  }
}
