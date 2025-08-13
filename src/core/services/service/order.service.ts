import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order } from '../../model/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient) {}

  getAllOrders(): Observable<Order[]> {
    return this.http.get<any[]>('/api/order/getAllOrders').pipe(
      map(orders =>
        orders.map(order => ({
          id: order.id,
          orderNumber: order.orderNumber,
          status: order.status ?? 'Unknown',
          amount: Number(order.amount) || 0,  // 字符串 → 数字
          creationDate: new Date(order.creationDate), // 字符串 → Date
          user: order.user
        }))
      )
    );
  }

  getOrderById(orderNumber: string): Observable<Order> {
    return this.http.get<Order>(`api/order/${orderNumber}`);
  }
}