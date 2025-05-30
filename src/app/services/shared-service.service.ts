import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  constructor() { }
  private showDetailsSubject = new BehaviorSubject<object | null>(null);
  showDetails$ = this.showDetailsSubject.asObservable();
  private showModalSubject = new BehaviorSubject<boolean | null>(null);
  showModal$ = this.showModalSubject.asObservable();

  showModal(value: boolean) {
    this.showModalSubject.next(value);
  }
  showDetails(object: any) {
    this.showDetailsSubject.next(object);
  }
}
