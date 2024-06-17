import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApostaService } from '../lista/services/aposta.service';
import { Observable } from 'rxjs/internal/Observable';
import { Aposta } from '../lista/model/aposta.model';
import { Cavalo } from '../model/cavalo.model';
import { map, filter, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-bet',
  templateUrl: './bet.component.html',
  styleUrls: ['./bet.component.css']
})
export class BetComponent {
  betName: string | null = null;
  apostas$!: Observable<Aposta[]>;
  randomNumbers: any[];

  constructor(private route: ActivatedRoute, private apostaService: ApostaService) {
    this.randomNumbers = []
   }

  ngOnInit(): void {
    this.carregarApostas();
    this.route.params.subscribe(params => {
      this.betName = params['name'];
    });
  }
  carregarApostas(): void {
    this.apostas$ = this.apostaService.getApostas();
    this.randomNumbers = [];
  }

  carregarCavalos(aposta: Aposta) {
    let randomHorse: any = [];
    while (randomHorse.length < aposta.numeroCavalos) {
      const randomNumber = Math.floor(Math.random() * aposta.numeroCavalos) + 1;
      if (!randomHorse.includes(randomNumber)) {
        randomHorse.push(randomNumber);
      }
    }
    return randomHorse;
  }
  
}
