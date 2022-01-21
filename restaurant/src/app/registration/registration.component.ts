import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WelcomeComponent } from '../welcome/welcome.component';
import { AccountService } from '../services/account.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
// @Component({
//   selector: 'ngbd-modal-content',
//   templateUrl:  

// })
// export class NgbdModalContent {
// @Input() name: any;

// constructor(public activeModal: NgbActiveModal) {}
// }



// ---
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  user: FormGroup;
  returnUrl: any;
  // accountService: any;




  constructor(private formBuilder: FormBuilder,
    private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService) {
    this.user = this.formBuilder.group({
      email: ['', [Validators.required]],
      fullName: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      Password: ['', [Validators.required, Validators.minLength(6)]],
    })

  }

  get f() {
    return this.user.controls;
  }

  onSubmit() {
    // debugger
    const roleId = 2
    this.accountService.registration(this.f['email'].value, this.f['fullName'].value, this.f['mobileNumber'].value, this.f['Password'].value, roleId).
      subscribe(
        (data: any) => {
          if (data.isSucess) {
            localStorage.setItem('userInfo', JSON.stringify({
              userInfo: data.userInfo,
              token: data.token
            }));
            this.toastrService.success(data.message)
            this.router.navigate([this.returnUrl]);
          } else {
            this.toastrService.error(data.message)
          }
        },
      );
  }

  // open() {
  //   const modalRef = this.modalService.open(WelcomeComponent);
  //   // modalRef.componentInstance.name = 'welcome';
  // }
}

// function NgbdModalContent(NgbdModalContent: any) {
//   throw new Error('Function not implemented.');
// }

