import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidarTokenGuard } from './auth/guards/validar-token.guard';

const routes: Routes = [
  
  // Lazy load
  {
    path: 'museo',
    loadChildren: () => import( './publico/publico.module'). then( m => m.PublicoModule ) 
  },
  {
    path: 'manager',
    loadChildren: () => import('./admin-museo/admin-museo.module').then( m => m.AdminMuseoModule),
    canActivate: [ValidarTokenGuard]
  },
  {
    path: 'autenticación',
    loadChildren: () => import( './auth/auth.module'). then( m => m.AuthModule ) 
  },
  {
    path: '**', redirectTo: 'museo/inicio'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
