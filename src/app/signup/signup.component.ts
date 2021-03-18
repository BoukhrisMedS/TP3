import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm : FormGroup;
  constructor(private formBuilder: FormBuilder,private router:Router,private authService:AuthService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.signUpForm=this.formBuilder.group({
      userName: ['',Validators.required],
      email : ['',[Validators.required,Validators.email]],
      password : ['',[Validators.required,Validators.pattern('[0-9a-zA-Z]{6,}')]]
    });
  }
  
  onSubmit(){

    this.authService.CreateNewUser(this.signUpForm.value).then(()=>{console.log('success registration');
  this.router.navigate(['/signin']);
}).catch(err =>{console.log('error registration',err)
})
  }

  get formControls(){
    return this.signUpForm.controls;
  }
}
