import { Router } from '@angular/router';
import { GlobalService } from './../../services/shared.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {


  constructor(public service: GlobalService, private router: Router) {
    if (localStorage.getItem("token")) {
      this.service.isLogin = true
      this.service.AuthMe().subscribe(res => {
        console.log(res.data);
        this.service.UserData = res.data

      })
    }
  }
  ngOnInit(): void {

  }
  doLogout() {

    this.service.isLogin = false
    this.service.logout().subscribe(res => {
      localStorage.removeItem("token")
    })
    this.router.navigate(["/"])

  }



}
