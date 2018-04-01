import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApplicationService } from '../../../services/application.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;

  constructor(private router : Router,
              private authService : AuthService,
              private applicationService : ApplicationService) { }

  ngOnInit() {
     this.loginForm = new FormGroup({
         'username' : new FormControl(null, Validators.required),
         'password' : new FormControl(null, Validators.required),
     });
  }

  loginWithEmailAndPassword(){
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;
      this.authService.
           loginWithEmailAndPassword({username : username, password : password}).
           subscribe(()=>{
               this.router.navigate(['movies-list'])
           },(error)=>{
              this.loginForm.controls['password'].setValue('');
              this.applicationService.handleHttpError({
                  error : error,
                  redirectToLoginOn401 : true,
                  message : 'Some Error!'
              });
           });
  }

}
