import { Component } from '@angular/core';
import { ApostaService } from '../lista/services/aposta.service';
import { Observable } from 'rxjs/internal/Observable';
import { Aposta } from '../lista/model/aposta.model';

@Component({
  selector: 'app-apostas',
  templateUrl: './apostas.component.html',
  styleUrls: ['./apostas.component.css']
})
export class ApostasComponent {
  apostas$!: Observable<Aposta[]>;

  constructor(private apostaService: ApostaService){}

  ngOnInit() {
    this.carregarApostas();
  }

  carregarApostas(): void {
    this.apostas$ = this.apostaService.getApostas();
    this.apostas$.forEach(aposta => console.log(aposta));
  }
}

