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
  user!: FormGroup;
  returnUrl !: string;
  submitted = false;
  loading = false;
  // ToastrService: any;

  constructor(private formBuilder: FormBuilder,
    private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService) {
    if (this.accountService.isLoggedIn()) {
      this.router.navigate(['/app/dashboard']);
    }
  }

  ngOnInit(): void {
    this.user = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    // if (this.accountService.isLoggedIn()) {
    //   this.router.navigate(['/app/dashboard']);
    // }

    this.returnUrl =
      this.route.snapshot.queryParams['returnUrl'] || 'app/dashboard';

  }

  get f() {
    return this.user.controls;
  }


  onSubmit() {
    this.submitted = true;

    if (this.user.invalid) {
      return;
    }

    
    // console.log(this.f);
    this.loading = true;
    this.accountService.login(this.f['email'].value, this.f['password'].value).subscribe(
      (data: any) => {
        if (data.isSuccess) {          
          localStorage.setItem('userInfo', JSON.stringify({
            token: data.responseData.token
          }));
          this.toastrService.success(data.message)
          this.router.navigate([this.returnUrl]);
        } else {
          this.loading = false;
          this.submitted = false
          this.toastrService.error(data.message)
        }
      },
      // (error: any) => {
      //   this.loading = false;
      // }
    );

  }
}






