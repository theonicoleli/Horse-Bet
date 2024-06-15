import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { ListaComponent } from './pages/lista/lista.component';
import { MenuComponent } from './pages/menu/menu.component';
import { ApostasComponent } from './pages/apostas/apostas.component';
import { BetComponent } from './pages/bet/bet.component';

const routes: Routes = [
  { path: '', redirectTo: '/menu', pathMatch: 'full' },
  { path: 'menu', component: MenuComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'lista', component: ListaComponent },
  { path: 'aposta', component: ApostasComponent },
  { path: 'bet/:name', component: BetComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
