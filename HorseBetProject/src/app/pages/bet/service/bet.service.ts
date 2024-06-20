import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Bet } from '../model/bet.model';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class BetService {

  constructor(private db: AngularFireDatabase,
    private storage: AngularFireStorage) { }

  insertBet(cadastro: Bet) { 
    return this.db.list('bet').push(cadastro);   
  }

  getApostas(): Observable<Bet[]>{
    return this.db.list('bet').snapshotChanges()
    .pipe(
      map(changes =>
        changes.map(c => ({
          id: c.payload.key, ...c.payload.val() as Bet }))
        ))
  }
}