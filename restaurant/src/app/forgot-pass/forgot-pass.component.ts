import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css']
})
export class ForgotPassComponent implements OnInit {

  user: FormGroup

  constructor(private formBuilder: FormBuilder) { 
    this.user = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
   })
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  }




