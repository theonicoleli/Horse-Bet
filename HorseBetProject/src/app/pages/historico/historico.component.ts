import { Component } from '@angular/core';
import { ApostaService } from '../lista/services/aposta.service';
import { Observable } from 'rxjs/internal/Observable';
import { Aposta } from '../lista/model/aposta.model';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css']
})
export class HistoricoComponent {
  apostas$!: Observable<Aposta[]>;
  user: any;

  constructor(private apostaService: ApostaService, private authService: AuthService){}

  ngOnInit() {
    Promise.all([
      this.authService.user$.subscribe(user => {
        this.user = user;
      }),
      this.carregarApostas()
    ]);
  }

  carregarApostas(): void {
    this.apostas$ = this.apostaService.getApostas();
    this.apostas$.forEach(aposta => console.log(aposta));
  }
}

