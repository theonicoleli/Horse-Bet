import { Component } from '@angular/core';
import { ApostaService } from '../lista/services/aposta.service';
import { Observable } from 'rxjs/internal/Observable';
import { Aposta } from '../lista/model/aposta.model';
import { AuthService } from '../../auth.service';
import { BetService } from '../bet/service/bet.service';
import { Bet } from '../bet/model/bet.model';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css']
})
export class HistoricoComponent {
  apostas$!: Observable<Aposta[]>;
  betUserRaces: Aposta[] = [];
  betUser: Observable<Bet[]> | undefined;
  user: any;

  constructor(
    private apostaService: ApostaService, 
    private authService: AuthService,
    private betService: BetService,
  ){}

  ngOnInit() {
    Promise.all([
      this.authService.user$.subscribe(user => {
        this.user = user;
      }),
      this.carregarCorridas(),
    ]);
  }

  carregarCorridas(): void {
    this.apostas$ = this.apostaService.getApostas();
    this.getBet();
  }

  getBet() {
    this.betUser = this.betService.getApostas();
    this.getBetRaces();
  }

  getBetRaces(): void {
    if (this.apostas$ && this.betUser) {
      this.apostas$.subscribe(apostas => {
        apostas.forEach(aposta => {
          this.betUser!.subscribe(bets => { 
            const bet = bets.find(bet => bet.nomeCorrida === aposta.nome);
            if (bet) {
              aposta.valorAposta = bet.valorAposta;
              aposta.nomeCavalo = bet.nomeCavalo;
              this.betUserRaces.push(aposta);
            }
          });
        });
      });
    }
  }
  
}

