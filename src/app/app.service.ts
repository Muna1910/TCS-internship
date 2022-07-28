import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private  http:HttpClient) { }

  getPost(){

    return this.http.get('https://jsonplaceholder.typicode.com/posts')
     
  }


  postRegisterInfo(formvalue: any)
  {
    return this.http.post('http://localhost:8080/cred/Register', formvalue)
  }

  postLoginInfo(formvalue: any)
  {
    return this.http.post('http://localhost:8080/cred/Login', formvalue)

  }



}
