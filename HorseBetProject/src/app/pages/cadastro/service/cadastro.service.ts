import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CadastroModel } from '../model/cadastro.model';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  constructor(private db: AngularFireDatabase,
    private storage: AngularFireStorage) { }

  salvar(cadastro: CadastroModel) { 
    return this.db.list('cadastro').push(cadastro);   
  }

  excluir(key: any) {
    return this.db.object('cadastro/'+key).remove();
  }

  carregar(key: any) : Observable<any> {
    return this.db.object('cadastro/'+key).valueChanges();
  }

  alterar(key: any, cadastro: CadastroModel) {
    return this.db.object('cadastro/'+key).update(cadastro);
  }

  listar() {
    return this.db.list('cadastro').snapshotChanges()
    .pipe(
      map(changes => {
        console.log(changes);
        return changes.map(c => ({ key: c.key, 
          ...c.payload.val() as CadastroModel}));
      })
    );
  }}