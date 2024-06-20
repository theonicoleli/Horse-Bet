import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApostaService } from '../lista/services/aposta.service';
import { Observable, Subscription } from 'rxjs';
import { Aposta } from '../lista/model/aposta.model';
import { AuthService } from '../../auth.service';
import { BetService } from '../bet/service/bet.service';
import { Bet } from '../bet/model/bet.model';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css']
})
export class HistoricoComponent implements OnInit, OnDestroy {
  apostas$: Observable<Aposta[]>;
  betUserRaces: Aposta[] = [];
  betUser: Bet[] = [];
  user: any;
  private userSubscription: Subscription;

  constructor(
    private apostaService: ApostaService,
    private authService: AuthService,
    private betService: BetService
  ) {
    this.apostas$ = this.apostaService.getApostas();
    this.userSubscription = new Subscription();
  }

  ngOnInit(): void {
    this.userSubscription = this.authService.user$.pipe(
      tap(user => this.user = user),
      switchMap(user => {
        if (user) {
          return this.loadUserBets(user.email);
        } else {
          return [];
        }
      })
    ).subscribe();
  }

  private loadUserBets(email: string): Observable<Bet[]> {
    return this.betService.getApostas().pipe(
      tap(bets => {
        this.betUser = bets.filter(bet => bet.emailParticipante === email);
        this.getBetRaces();
      })
    );
  }

  getBetRaces(): void {
    if (this.apostas$ && this.betUser) {
      this.apostas$.subscribe(apostas => {
        apostas.forEach(aposta => {
          const bet = this.betUser.find(b => b.nomeCorrida === aposta.nome);
          if (bet) {
            aposta.valorAposta = bet.valorAposta;
            aposta.nomeCavalo = bet.nomeCavalo;
            this.betUserRaces.push(aposta);
          }
        });
      });
    }
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
