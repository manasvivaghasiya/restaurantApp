import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  // logout() {
  //   throw new Error('Method not implemented.');
  // }
  // isLoggedIn() {
  //   throw new Error('Method not implemented.');
  // }
  // ForgotPassComponent(value: any) {
  //   throw new Error('Method not implemented.');
  // }

  constructor(private httpClient: HttpClient) { }
  isLoggedIn(){
    return localStorage.getItem('userInfo');
  }
 login(email:string, password:string){
   return this.httpClient.post(`${environment.apiEndPoint}/LoginAuthenticate`,{
     email:email,
     password:password
   })
 }

registration(email:string,fullName:string, mobileNumber:any,password:number,roleId:any){
    return this.httpClient.post(`${environment.apiEndPoint}/CreateUser`,{
      email:email,
      fullName: fullName,
      mobileNumber: mobileNumber,
      password: password,
      roleId: roleId
    })
}

forgotPass(email:string){
  return this.httpClient.post(`${environment.apiEndPoint}/SendResetPasswordRequest?email=${email}`,null)
}

}
