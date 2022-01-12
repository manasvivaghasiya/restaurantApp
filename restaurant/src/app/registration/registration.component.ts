import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WelcomeComponent } from '../welcome/welcome.component';
import { AccountService } from '../services/account.service';
import { ToastrService } from 'ngx-toastr';
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
  route: any;
  accountService: any;
  toastrService: any;


  constructor(private modalService: NgbModal, private formBuilder: FormBuilder,) {
    this.user = this.formBuilder.group({
      email: ['', [Validators.required]],
      fullName: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required]],
      Password: ['', [Validators.required]],
    })
  

  this.returnUrl =
     this.route.snapshot.queryParams['returnUrl'];
  }

  get f() {
    return this.user.controls;
  }

  onSubmit(){
    this.accountService.registration(this.f['email'].value,this.f['fullName'].value,this.f['mobileNumber'].value).
     subscribe(
       (data: any) => {
         if (data.isSucess) {
           localStorage.setItem('userInfo',JSON.stringify({
             userInfo:data.userInfo,
             token: data.token
          }));
          this.toastrService.success(data.message)
          this.route.navigate([this.returnUrl]);
         }else{
           this.toastrService.error(data.message)
         }
       },
     );
  }
  
  open() {
    const modalRef = this.modalService.open(WelcomeComponent);
    // modalRef.componentInstance.name = 'welcome';
  }
  }

// function NgbdModalContent(NgbdModalContent: any) {
//   throw new Error('Function not implemented.');
// }

