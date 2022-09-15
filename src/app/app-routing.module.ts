import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { CheckLoginGuard } from './shared/guards/check-login.guard';



const routes: Routes = [    
  
  {
    path: '',
    loadChildren:() =>
    import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'login',
    loadChildren: () => 
    import('./login/login.module').then((m) => m.LoginModule),
    canActivate: [CheckLoginGuard],
  },
  {
    path: 'register',
    loadChildren:() =>
    import('./register/register.module').then((m) => m.RegisterModule),
  }
  /*
  { path: "", loadChildren:() =>import('./home/home.module').then((m) => m.HomeModule) },
  { path: "", component: AppComponent, pathMatch: "full" },
  { path: "login", component: LoginComponent, pathMatch: "full" },
  { path: "register", component: RegisterComponent, pathMatch: "full" }
*/
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
