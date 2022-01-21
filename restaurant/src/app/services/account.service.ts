import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  deleteDataById(userId: string) {
    throw new Error('Method not implemented.');
  }

  url='https://iris-api.mycodelibraries.com/api/User';
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

// -----crud--------- 
// crud(email:string,fullName:string,mobileNumber:any){
//   return this.httpClient.post(`${environment.apiEndPoint}`)
// }

 getAllUser(): Observable<Data[]>{
   return this.httpClient.get<Data[]>
   (this.url +'/GetAllUsers ');
 }
// getDataById(dataId:string): Observable<Data>{
//   return this.httpClient.get<Data>
//   (this.url + '')
// }
// createData(data: Data): Observable<Data>{
//   const httpClientOptions = {headers: new httpClientHeader({})
// };

// return this.httpClient.post<data>(this.url + '/CreateUser',data,httpClientOptions);
// }


}
