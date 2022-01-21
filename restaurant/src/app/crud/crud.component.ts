import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Data } from '@angular/router';
import { threadId } from 'worker_threads';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {
  user!:FormGroup;
  allUser: any;
  dataSaved: any;
 userIdUpdate:null | undefined;
  updateData: any;
  data:any;
  dataIdUpdate: null | undefined;

  constructor(private formBuilder:FormBuilder,
    private accountService:AccountService) { }

  ngOnInit(): void {
    this.user=this.formBuilder.group({
      email:['',[Validators.required]],
      fullname:['',[Validators.required]],
      mobileNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    })
    this.loadAllUser();
  }
  loadAllUser(){
    this.allUser =this.accountService.getAllUser();
  }
 onSubmit(){
   this.dataSaved = false;
   const crud = this.user.value;
  }
  loadDataToEdit(userId:string){
    this.accountService.getUserById(userId).subscribe(this.data => {
         this.dataSaved = false,
          thisuserIdUpdate = this.user.userId,
          this.user.controls['email'].setValue(this.data.email),
          this.user.controls['fullName'].setValue(this.data.fullName),
          this.user.control['mobileNumber'].setValue(this.data.mobileNumber)
    });
  }
createData(data: Data){
  if (this.userIdUpdate == null){
    threadId.accountService.createData(data).subscribe(
      () =>{
        this.dataSaved=true;
        this.loadAllUser();
        this.userIdUpdate=null;

      }
    );
  }else{
    data['userId'] = this.updateData(data).subscribe(()=>{
      this.dataSaved = true;
      this.loadDataToEdit();
      this.dataIdUpdate = null;
    });
  }
}
deleteData(userId:string){
  if(confirm("are you sure you want to delete this ?")){
    this.accountService.deleteDataById(userId).subscribe(() =>{
      this.dataSaved=true;
      this.userIdUpdate=null;
    });
  }
}

}
