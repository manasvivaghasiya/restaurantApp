import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   user!: FormGroup
  returnUrl !: string 
  // submitted: boolean;
  // loading: boolean;
  ToastrService: any;
 
  constructor(private formBuilder: FormBuilder,
    private accountService:AccountService,
    private route: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService) {
      if (this.accountService.isLoggedIn()) {
        this.router.navigate(['/app/dashboard']);
      }
   }

  ngOnInit(): void {
    this.user = this.formBuilder.group({
      email: ['',[Validators.required]],
       password: ['',[Validators.required]],
    });

    this.returnUrl = 
    this. route.snapshot.queryParams['returnUrl'] || 'app/dashboard';

  }

  get f(){
    return this.user.controls;
  }

  onSubmit(){
    // this.submitted = true;
   
    // if(this.user.invalid){
    //   return;
    // }
     
    // this.loading = true;
    console.log(this.f);
    this.accountService
    .login(this.f.email.value, this.f.password.value).
    subscribe(
      (data: any)=> {
        if (data.isSuccess){
          localStorage.setItem('userInfo',JSON.stringify({
            userInfo: data.userInfo,
            token: data.token
          }));
          this.toastrService.success(data.message)
          this.router.navigate([this.returnUrl]);
          } else{
            // this.loading = false;
            // this.submitted = false;
            this.toastrService.error(data.message)
          }
      },
      // (error)=> {
      //   this.loading = false;
      // }
    );
    
  }
}




 

