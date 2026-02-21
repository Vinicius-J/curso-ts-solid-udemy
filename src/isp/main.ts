/*
Interface segregation principle (Princípio da segregação de Interface) -
os clientes não devem ser forçados a depender de types, interfaces ou membros
abstratos que não utilizam
*/

import { Messaging } from './services/messaging';
import { Order } from './classes/order';
import { Persistency } from './services/persistency';
import { Product } from './classes/product';
import { ShoppingCart } from './classes/shopping-cart';
import { NoPercentDiscount } from './classes/discount';
import {
  EnterpriseCustomer,
  IndividualCustomer,
} from './classes/interfaces/custumer';

// const fiftyPercentDiscont = new FiftyPercentDiscount();
// const tenPercentDiscont = new TenPercentDiscount();
const noPercentDiscont = new NoPercentDiscount();
const shoppingCart = new ShoppingCart(noPercentDiscont);
const messaging = new Messaging();
const persistency = new Persistency();
// const individualCustomer = new IndividualCustomer(
//   'Vinícius',
//   'Joaquim',
//   '111.111.111-11',
// );
const enterpriseCustomer = new EnterpriseCustomer('Empresa', '2222222222');
const order = new Order(
  shoppingCart,
  messaging,
  persistency,
  enterpriseCustomer,
);

shoppingCart.addItem(new Product('Camiseta', 49.9));
shoppingCart.addItem(new Product('Caderno', 9.9123));
shoppingCart.addItem(new Product('Lápis', 1.59));

console.log(shoppingCart.items);
console.log(shoppingCart.total());
console.log(shoppingCart.totalWithDiscount());
order.checkout();
console.log(order.orderStatus);
