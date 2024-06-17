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

  constructor(private route: ActivatedRoute, private apostaService: ApostaService) { }

  ngOnInit(): void {
    this.carregarApostas();
    this.route.params.subscribe(params => {
      this.betName = params['name'];
    });
  }
  carregarApostas(): void {
    this.apostas$ = this.apostaService.getApostas();
    this.apostas$.forEach(aposta => console.log(aposta));
  }
}

