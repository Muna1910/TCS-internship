import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup,Validators} from '@angular/forms';
import { AppService } from '../app.service';
import {ErrorStateMatcher} from '@angular/material/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  submitted = false;
  hide = true;


  post:any=[]

  loginform!: FormGroup;
  constructor(private fb: FormBuilder, private appservice: AppService, private router:Router) {}

  ngOnInit(): void {
    let passwordregex: RegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/

    this.loginform = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.pattern(passwordregex)]]});
    
      this.appservice.getPost().subscribe(Response => this.post = Response)
    
    }

    matcher = new ErrorStateMatcher();



    // email error message

  getErrorEmailMessage() {
    if (this.loginform.controls['email'].hasError('required')) {
      return 'You must enter a valid email';
    }

    return this.loginform.hasError('email') ? 'Not a valid email' : 'Invalid email';
  }

  // password error message

  getErrorPasswordMessage() {
    if (this.loginform.controls['password'].hasError('required')) {
      return 'Field is required (at least eight characters, one uppercase letter and one number)';
    }

    return this.loginform.hasError('password') ? 'Not a valid password' : 'Invalid password';
  }

  onSubmit()
  {
    console.log(this.loginform.value)
    this.appservice.postLoginInfo(this.loginform.value).subscribe(Response => {console.log(Response)
      this.submitted = true
      this.router.navigate(['employee'])
      })    
  }


  onReset() {
    this.submitted = false;
    this.loginform.reset();
}


}