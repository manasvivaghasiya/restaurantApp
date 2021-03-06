import { HttpClient } from '@angular/common/http';
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
  allUser: any;
  user!: FormGroup;
  // userData: any;
  editUserInfo: any;
  uploadedImage: any;
  userImage: string | ArrayBuffer | null | undefined;
  roleId: any;


  constructor(private formBuilder: FormBuilder, private HttpClient: HttpClient) {
    this.user = this.formBuilder.group({
      // id:['0',[Validators.required]],
      email: ['', [Validators.required]],
      fullName: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      Password: ['', [Validators.required, Validators.minLength(6)]],
      roleId: ['0'],
      image: ['']
    })
  }

  ngOnInit(): void {
    this.getUser()
  }

  getUser() {
    this.HttpClient.get(`${environment.apiEndPoint}/User/GetAllUsers`).subscribe((res: any) => {
      if (res.isSuccess) {
        this.allUser = res.responseData
        // localStorage.setItem('userInfo', JSON.stringify({
        //   token: res.responsedata.token
        // }));
      }

    })
  }

  deleteUser(id: string) {
    this.HttpClient.delete(`${environment.apiEndPoint}/User/DeleteUser?id=${id}`).subscribe((res: any) => {
      if (res.isSuccess) {
        alert('data delete successfully')
        this.getUser()
      } else {
        alert(res.message)
      }
    })
  }

  updateUser() {
    this.HttpClient.post(`${environment.apiEndPoint}/User/UpdateUser`, {
      ...this.editUserInfo,
      id: this.editUserInfo.id,
      ...this.user.value,
    }).subscribe((res: any) => {
      if (res.isSuccess) {
        this.editUserInfo = null
        alert('data updated successfully')
        this.user.reset()
        this.getUser()
        this.uploadedImage()
      } else {
        alert(res.message)
      }
    })
  }

  addUser() {
    if (this.editUserInfo) {
      this.updateUser()
      return
    }
    this.HttpClient.post(`${environment.apiEndPoint}/User/CreateUser`, this.user.value).subscribe((res: any) => {
      if (res.isSuccess) {
        this.editUserInfo = null
        alert('Data added successfully')
        this.user.reset()
        this.getUser()
        this.uploadedImage()
      } else {
        alert(res.message)
      }
    })
  }

  // -------image---------
  handleFileInput(files: any) {
    let file = files.target.files[0];
    this.uploadedImage = file
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.userImage = reader.result;
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }
  // -----------


  editUser(user: any) {
    this.editUserInfo = user
    this.user.patchValue({
      email: user.email,
      fullName: user.fullName,
      mobileName: user.mobileName,
      Password: user.Password,
      roleId: user.roleId,
      image: user.image
    })
  }

}
