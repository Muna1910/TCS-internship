import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [ 

{

  path: 'register',

 component: RegistrationComponent,

},

{

  path: 'login',

 component: LoginComponent,

},

{

  path: 'employee',

 component: EmployeeComponent,

},

{
  path: '',

 component: HomeComponent,

}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
