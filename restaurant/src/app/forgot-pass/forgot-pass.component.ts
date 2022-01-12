import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css']
})
export class ForgotPassComponent implements OnInit {

  user: FormGroup
  returnUrl: any;
  route: any;
  accountService: any;
  ToastrService: any;

  constructor(private formBuilder: FormBuilder) { 
    this.user = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
   })

    this.returnUrl = 
    this.route.snapshot.queryParams['returnUrl'];
  }
  

  get f(){
    return this.user.controls;
  }

  onSubmit(){
    this.accountService.ForgotPassComponent(this.f['email'].value).
    subscribe(
      (data: any) =>{
        if (data.isSuccess){
          localStorage.setItem('userInfo' , JSON.stringify({
            userInfo: data.userInfo,
            token: data.token
          }));
          this.ToastrService.sucess(data.message)
          this.route.navigate([this.returnUrl]);
      }else{
        this.ToastrService.error(data.message)
      }
    },
    );
    }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  }




