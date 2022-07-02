import { NgForm } from '@angular/forms';
import { GlobalService } from './../../shared/services/shared.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  model: any = {}
  constructor(private services: GlobalService) { }
  ngOnInit(): void {
  }
  handleRegister(form: NgForm) {
    console.log(form);
    if (form.valid) {
      this.services.register(this.model).subscribe(res => {
        console.log(res);
      })
    }
  }
}
