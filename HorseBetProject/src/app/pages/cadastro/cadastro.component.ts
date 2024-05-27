import { Component } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { CadastroModel } from './model/cadastro.model';
import { CadastroService } from './service/cadastro.service';
import { Router } from 'express';
import { ActivatedRoute } from '@angular/router';
import { Console } from 'node:console';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {

  showSuccessMessages = false;
  showErrorMessages = false;

  formGroup = new FormGroup({
  nome:  new FormControl('', [Validators.required]),
  email: new FormControl('', [Validators.required]),
  senha: new FormControl('', [Validators.required]),
  })
  constructor(private CadastroService: CadastroService
  ) { }

  salvar(): void{
   
    var cadastro = new CadastroModel();
    cadastro.nome = this.formGroup.controls.nome.value?.toString();
    cadastro.email = this.formGroup.controls.email.value?.toString();
    cadastro.senha = this.formGroup.controls.senha.value?.toString();
  

    this.CadastroService.salvar(cadastro).then(result => {
      this.showSuccessMessages = true;
      console.log(result);
  });

}
}
