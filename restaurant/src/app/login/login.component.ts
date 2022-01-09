import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: FormGroup

  constructor(private formBuilder: FormBuilder) {
    this.user = this.formBuilder.group({
       userName: ['',[Validators.required]],
       password: ['',[Validators.required]],
    })
   }

  ngOnInit(): void {
  }

}
