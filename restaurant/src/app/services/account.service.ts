import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private httpClient: HttpClient) { }
  isLoggedIn(){
    return localStorage.getItem('userInfo');
  }
 login(email:string, password:string){
   return this.httpClient.post(`${environment.apiEndPoint}/account/login`,{
     email:email,
     password:password
   })
 }

}
