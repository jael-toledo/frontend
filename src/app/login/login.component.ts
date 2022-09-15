import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '@app/pages/auth/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  private suscripcion:Subscription = new Subscription()
  
  loginForm : FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    pass:  new FormControl(null, [Validators.required]),
  })
  /*
  email: string = "";
  password: string = "";*/
  

  //constructor() {}
  constructor(private authSvc: AuthService,
    private fb: FormBuilder,
    private router:Router)
    { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe()
  }

  login():void {
    const formValue = this.loginForm.value
    this.suscripcion.add(
      this.authSvc.login(formValue).subscribe( res => {
        if (res){
          this.router.navigate(['home'])
        }
      })
    )
  }
}
