import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private Router: Router, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.getQuestions()
   
  }
   logout(){
     localStorage.clear();
     this.Router.navigate(['login']);
   }
   getQuestions() {
    this.httpClient.get(`${environment.apiEndPoint}/questions/get`).subscribe((res: any) => {
      console.log(res.data)
    })
  }

  }
