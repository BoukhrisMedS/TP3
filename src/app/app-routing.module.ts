import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/guard/auth.guard';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path:'',redirectTo:'signin',pathMatch:'full'},
  {path:'signin',component:SigninComponent},
  {path:'signup',component:SignupComponent},
  {path:'user-profile',canActivate:[AuthGuard], loadChildren:()=>import('./user-profile/user-profile.module').then(mod =>mod.UserProfileModule)}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
