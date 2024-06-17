import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Aposta } from './model/aposta.model';
import { ApostaService } from './services/aposta.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {
  apostas$!: Observable<Aposta[]>;
  form: FormGroup;
  numberOfApostas!: number;
  user: any;
  constructor(private apostaService: ApostaService, private fb: FormBuilder, private authService: AuthService) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      numeroCavalos: [0, [Validators.required, Validators.min(1)]],
      estadoCorrida: ['', Validators.required],
      cidadeCorrida: ['', Validators.required],
      localCorrida: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
    });
    this.carregarApostas();
  }

  carregarApostas(): void {
    this.apostas$ = this.apostaService.getApostas();
    this.getIndexOfApostas();
  }

  cadastrarAposta(): void {
    if (this.form.valid) {
      const novaAposta: Aposta = this.form.value;
      this.apostaService.cadastrarAposta(novaAposta).then(() => {
        this.form.reset(); 
        this.carregarApostas(); 
      });
    }
  }

  getIndexOfApostas() {
    this.apostas$.subscribe(apostas => {
      this.numberOfApostas = apostas.length;
    });
  }

}
