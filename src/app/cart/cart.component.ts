import { Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  cookies: any[] = [
    {
      name: 'Chocolate Chip Cookie!',
      price: 800,
      unit: 'kg',
      src: '/assets/chips.jpg',
      description: 'Delicious Chocolate Chip Cookies!',
      qty: 0,
    },
    {
      name: 'Mixed Cookies!',
      price: 1000,
      unit: 'kg',
      src: '/assets/mix-cookies.jpg',
      description: 'Mixed Cookies with all flavours!',
      qty: 0,
    },
    {
      name: 'Hide N Seek Cookie!',
      price: 1200,
      unit: 'kg',
      src: '/assets/hidenseek.jpg',
      description: 'Choco filled Hide n Seek Cookies!',
      qty: 0,
    },
  ];
  qty: number = 0;
  operation(operator: string, cookie: any) {
    switch (operator) {
      case '+':
        cookie.qty++;
        break;
      case '-':
        if (cookie.qty > 0) {
          cookie.qty--;
        }
        break;
      default:
        cookie.qty = 0;
    }
  }

  cart: any[] = [];
  total: number = 0;
  toCart(cookie: any) {
    const cartIndex = this.cart.findIndex((item) => item.name == cookie.name);
    if (cookie.qty == 0) {
      alert('Please select at least one cookie');
    } else {
      if (cartIndex == -1) {
        this.cart.push({ ...cookie });
      } else {
        this.cart[cartIndex].qty++;
      }
      this.total += cookie.qty * cookie.price;
    }
  }

  removeFromCart(cookie: any) {
    const cartIndex = this.cart.findIndex((item) => item.name == cookie.name);
    if (cartIndex !== -1) {
      this.cart.splice(cartIndex, 1);
      const cookieIndex = this.cookies.findIndex(
        (item) => item.name === cookie.name
      );
      if (cookieIndex !== -1) {
        this.cookies[cookieIndex].qty = 0;
      }
    }
    this.total -= cookie.qty * cookie.price;
  }

  emptyCart() {
    if (confirm('Are you sure you want to empty your cart?')) {
      this.cart = [];
      this.total = 0;
      for (let cookie of this.cookies) {
        cookie.qty = 0;
      }
    }
  }
}
