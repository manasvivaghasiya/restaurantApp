import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {
  user!: FormGroup;
  http: any;
  userData: any;


  constructor(private formBuilder: FormBuilder) {
    this.user = this.formBuilder.group({
      email: ['', [Validators.required]],
      fullName: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]
    })
  }

  ngOnInit(): void {
    this.getUser()
  }
  getUser() {
    this.http.get(`${environment.apiEndPoint}/api/user/get`).subscribe((res:any) =>{
      this.userData = res.data
    } )
  }
deleteUser(id:number){
  this.http.delete(`${environment.apiEndPoint}/api/user/delete?id=${id}`).subscribe((res: any) =>{
    if (res.isSuccess){
      alert('data delete successfully')
      this.getUser()
    }else{
      alert(res.message)
    }
  })
}

}
