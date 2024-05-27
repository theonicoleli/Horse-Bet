import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Aposta } from '../model/aposta.model';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApostaService {

  constructor(private firestore: AngularFirestore,
    private db: AngularFireDatabase,
  ) { }

  getApostas(): Observable<Aposta[]>{
    return this.db.list('apostas').snapshotChanges()
    .pipe(
      map(changes =>
        changes.map(c => ({
          id: c.payload.key, ...c.payload.val() as Aposta }))
        ))
  }

  cadastrarAposta(aposta: Aposta) {
    return this.db.list('apostas').push(aposta);   
  }
}
