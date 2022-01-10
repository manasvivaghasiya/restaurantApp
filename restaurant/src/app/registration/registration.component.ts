import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WelcomeComponent } from '../welcome/welcome.component';

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

  constructor(private modalService: NgbModal, private formBuilder: FormBuilder) {
    this.user = this.formBuilder.group({
      fristName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      contectNo: ['', [Validators.required]],
    })
  }

  open() {
    const modalRef = this.modalService.open(WelcomeComponent);
    // modalRef.componentInstance.name = 'welcome';
  }
}
// function NgbdModalContent(NgbdModalContent: any) {
//   throw new Error('Function not implemented.');
// }

