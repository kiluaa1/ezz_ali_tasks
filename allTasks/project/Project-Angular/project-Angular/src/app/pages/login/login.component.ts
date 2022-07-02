import { GlobalService } from 'src/app/shared/services/shared.service'
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
    password: new FormControl("", [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)])
  })
  get email() { return this.loginForm.get('email') }
  get password() { return this.loginForm.get('password') }
  get loginData() { return this.loginForm.controls }
  isSubmitted = false
  errorMsg: any = null
  constructor(private services: GlobalService, private router: Router) {
    // if (localStorage.getItem('token')) this.router.navigate([""])
  }
  ngOnInit(): void {
  }
  handleSubmit() {
    this.isSubmitted = true
    console.log(this.loginForm)
    if (this.loginForm.valid) {
      this.services.login(this.loginForm.value).subscribe((res: any) => {
        console.log(res)
        if (res.error) { this.errorMsg = res.message }
        if (res.error == "Unauthorized") this.errorMsg = "incorrect password"
        if (res.data.token) {
          localStorage.setItem("token", res.data.token)
          this.services.isLogin = true
          this.router.navigate(["/products"])
          this.services.UserData = res.data.user
          console.log(res)
        }
      }, (error: any) => {
        console.log(error)
      }, () => {
      })
    }
  }
}

