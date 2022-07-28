import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm,Form, FormBuilder, FormGroup,Validators} from '@angular/forms';
import { AppService } from '../app.service';
import {ErrorStateMatcher} from '@angular/material/core';
import { Router } from '@angular/router';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}




@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {

  form!: FormGroup;
  submitted = false;
  hide = true;


  post:any=[]

  //Dependency injection applied
  constructor(private fb: FormBuilder, private appservice: AppService, private router: Router) {}


  ngOnInit(): void {

    let passwordregex: RegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/

    this.form = this.fb.group({
      name: ['', Validators.required],
      mobile:['', [Validators.required,Validators.pattern("^[0-9]*$"),Validators.minLength(10), Validators.maxLength(10)]],
      email: ['',[Validators.required,Validators.email]],

      password: ['',[Validators.required, Validators.pattern(passwordregex)]],
    },
    );
    
  
    this.appservice.getPost().subscribe(Response => this.post = Response)
 
  }


  matcher = new MyErrorStateMatcher();


  //mobile error message

  getErrorMobileMessage() {
    if (this.form.controls['mobile'].hasError('required')) {
      return 'You must enter a valid telephone number';
    }

    return this.form.hasError('mobile') ? 'Not a valid email' : 'Invalid telephone number';
  }


  // email error message

  getErrorEmailMessage() {
    if (this.form.controls['email'].hasError('required')) {
      return 'You must enter a valid email';
    }

    return this.form.hasError('email') ? 'Not a valid email' : 'Invalid email';
  }

  // password error message

  getErrorPasswordMessage() {
    if (this.form.controls['password'].hasError('required')) {
      return 'Field is required (at least eight characters, one uppercase letter and one number)';
    }

    return this.form.hasError('password') ? 'Not a valid password' : 'Invalid password';
  }


  onSubmit()
  {
    console.log(this.form.value)
    this.appservice.postRegisterInfo(this.form.value).subscribe(Response => {console.log(Response)
    this.submitted = true
    this.router.navigate(['login'])
    })
  }


  onReset() {
    this.submitted = false;
    this.form.reset();
}


}
