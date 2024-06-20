import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApostaService } from '../lista/services/aposta.service';
import { Observable } from 'rxjs/internal/Observable';
import { Aposta } from '../lista/model/aposta.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Bet } from './model/bet.model';
import { BetService } from './service/bet.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-bet',
  templateUrl: './bet.component.html',
  styleUrls: ['./bet.component.css']
})
export class BetComponent {
  betName: string | null = null;
  apostas$!: Observable<Aposta[]>;
  randomNumbers: any[];
  formBet: FormGroup;
  user: any;
  corridaAtual: any;

  constructor(private route: ActivatedRoute, 
    private apostaService: ApostaService,
    private betService: BetService,
    private fb: FormBuilder,
    private authService: AuthService) {

    this.randomNumbers = [];

    this.formBet = this.fb.group({
      nomeCorrida: ['', Validators.required],
      emailParticipante: ['', Validators.required],
      valorAposta: ['', Validators.required],
      nomeCavalo: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.betName = params['name'];
      this.carregarApostas();
      this.getCorridaAtual();
    });
    this.getUserSession();
  }

  carregarApostas(): void {
    this.apostas$ = this.apostaService.getApostas();
    this.randomNumbers = [];
  }

  carregarCavalos() {
    if (this.corridaAtual) {
      let randomHorse: any = [];
      while (randomHorse.length < this.corridaAtual.numeroCavalos) {
        const randomNumber = Math.floor(Math.random() * this.corridaAtual.numeroCavalos) + 1;
        if (!randomHorse.includes(randomNumber)) {
          randomHorse.push(randomNumber);
        }
      }
  
      this.randomNumbers = randomHorse;
  
      return randomHorse;
    }
  }

  cadastrarBet(): void {
    if (this.formBet.valid) {
      const novaAposta: Bet = this.formBet.value;
      this.betService.insertBet(novaAposta).then(() => {
        this.formBet.reset(); 
        this.carregarApostas(); 
      });
    }
  }

  getCorridaAtual() {
    if (this.apostas$) {
      this.apostas$.subscribe(apostas => {
        const corridaAtual = apostas.find(aposta => aposta.nome === this.betName);
        if (corridaAtual) {
          this.formBet.patchValue({
            nomeCorrida: corridaAtual.nome
          });
          this.corridaAtual = corridaAtual;
          this.carregarCavalos();
        }
      });
    }
  }

  getUserSession() {
    this.authService.user$.subscribe(user => {
      this.user = user;
      if (user && user.email) {
        this.formBet.patchValue({
          emailParticipante: user.email
        });
      }
    });
  }
  
}
