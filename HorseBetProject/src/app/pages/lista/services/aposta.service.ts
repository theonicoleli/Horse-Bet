import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Aposta } from '../model/aposta.model';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class ApostaService {

  constructor(private firestore: AngularFirestore,
    private db: AngularFireDatabase,
  ) { }

  getApostas(): Observable<Aposta[]> {
    return this.firestore.collection<Aposta>('apostas').valueChanges({});
  }

  cadastrarAposta(aposta: Aposta) {
    return this.db.list('apostas').push(aposta);   
  }
}
