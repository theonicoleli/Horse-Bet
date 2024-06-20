import { Component } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { CadastroModel } from './model/cadastro.model';
import { CadastroService } from './service/cadastro.service';;
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Console } from 'node:console';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {

  showSuccessMessages = false;
  showErrorMessages = false;
  errorMessage: string = '';

  formGroup = new FormGroup({
  nome:  new FormControl('', [Validators.required]),
  email: new FormControl('', [Validators.required, Validators.email]),
  senha: new FormControl('', [Validators.required]),
  })
  formGroupLogin = new FormGroup({
    emaillogin: new FormControl('', [Validators.required]),
    senhalogin: new FormControl('', [Validators.required]),
    })


  constructor(private CadastroService: CadastroService,
    private router: Router,
    public afAuth: AngularFireAuth
  ) { }

  salvar(): void{
   
    var cadastro = new CadastroModel();
    cadastro.nome = this.formGroup.controls.nome.value?.toString() ?? '';
    cadastro.email = this.formGroup.controls.email.value?.toString() ?? '';
    cadastro.senha = this.formGroup.controls.senha.value?.toString() ?? '';

    if (!cadastro.email || !cadastro.senha) {
      this.showErrorMessages = true;
      this.errorMessage = 'Email e senha são obrigatórios.';
      return;
    }
    this.afAuth
        .createUserWithEmailAndPassword(cadastro.email, cadastro.senha)
        .then(userCredential => {
          console.log('Usuário criado com sucesso:', userCredential.user);
        })

  }

  realizarLogin()  {
    var login = new CadastroModel();
      login.email = this.formGroupLogin.controls.emaillogin.value?.toString() ?? '';
      login.senha = this.formGroupLogin.controls.senhalogin.value?.toString() ?? '';

    if (!login.email || !login.senha) {
      this.showErrorMessages = true;
      this.errorMessage = 'Email e senha são obrigatórios.';
      return;
    }
    this.afAuth
        .signInWithEmailAndPassword(login.email, login.senha)
        .then(() => {
          alert("Usuário logado com sucesso!")
          this.router.navigate(['/menu']);
        })
        .catch(() => {
          alert("Sua senha ou email não estão corretos.")
        });
  }
}



