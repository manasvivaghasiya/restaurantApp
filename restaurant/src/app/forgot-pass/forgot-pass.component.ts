import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css']
})
export class ForgotPassComponent implements OnInit {

  user!: FormGroup
  returnUrl: any;
  // accountService: any;
  // ToastrService: any;

  constructor(private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute,
    private toasterService: ToastrService
  ) { }

  ngOnInit(): void {
    this.user = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    this.returnUrl =
      this.route.snapshot.queryParams['returnUrl'];

  }

  get f() {
    return this.user.controls;
  }

  onSubmit() {
    debugger
    this.accountService.forgotPass(this.f['email'].value).
      subscribe(
        (data: any) => {
          if (data.isSuccess) {
            localStorage.setItem('userInfo', JSON.stringify({
              userInfo: data.userInfo,
              token: data.token
            }));
            this.toasterService.success(data.message)
            this.router.navigate([this.returnUrl]);
          } else {
            this.toasterService.error(data.message)
          }
        },
      );
  }


}




