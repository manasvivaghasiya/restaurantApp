// import { state } from '@angular/animations';
// import { Injectable } from '@angular/core';
// import {
//     Router,
//     CanActivate,
//     ActivatedRouteSnapshot,
//     RouterStateSnapshot,
//   } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
//   import { AccountService } from '../services/account.service';
  
//   @Injectable({ providedIn: 'root' })
//   export class AuthGuard implements CanActivate {
 


//     constructor(private router: Router, private accountService: AccountService, private toastrService: ToastrService) {}
  
//     canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//       const user = this.accountService.isLoggedIn();
//       if (user) {
//         // authorised so return true
//         return true;
//       }
  
//       // not logged in so redirect to login page with the return url
//       this.router.navigate(['/login'], {
//         queryParams: { returnUrl: state.url },
//       });
//       return false;
      
//     }  

//     this.router.navigate(['/registration'],{
//       queryParams: { returnUrl: state.url},
//   });

//   this.router.navigate(['/forgot-pass'],{
//     queryParams: { returnUrl: state.url},
// });
