import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import {User} from '/Users/Boukhris/Desktop/Master/P3/Angular/Project/TpProject/src/models/user.model'
import { Router } from '@angular/router'; 
import * as firebase from 'firebase/firebase'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private afAuth: AngularFireAuth, private afs :AngularFirestore,private router: Router) {
    this.afAuth.authState.subscribe(user=>{
      if (user){
        localStorage.setItem('user',JSON.stringify(user));
      }
      else{
        localStorage.setItem('user',null)
      }
    })
   }


    CreateNewUser(signUpForm){
      return this.afAuth.createUserWithEmailAndPassword(signUpForm.email,signUpForm.password).then((result) =>{this.SetUserData(result.user,signUpForm.userName);}).catch((error)=>{window.alert(error.message);});
    }

    SetUserData(user, userName?){
      const userRef: AngularFirestoreDocument <any> = this.afs.doc('users/${user.uid}');
      const userData: User={
        id:user.uid,
        email:user.email,
        userName:userName||user.displayName,
      };
      return userRef.set(userData,{merge:true});
    }

    signIn(signInForm){
      return this.afAuth.signInWithEmailAndPassword(signInForm.email,signInForm.password).then((result)=>{
        this.router.navigate(['/user-profile']);
      }).catch((error)=>{
        window.alert(error.message);
      });
    }

    signInWithGoogle(){
      return this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((result)=>{
        this.SetUserData(result.user);
        this.router.navigate(['/user-profile']);
      }).catch((error)=>{
        window.alert(error.message);
      });
    }

    get IsLoggedIn():boolean{
      const user = JSON.parse(localStorage.getItem('user'));
      return (user!=null)?true:false;
    }

    signOut(){
      return this.afAuth.signOut().then(()=>{
        localStorage.removeItem('user');
        this.router.navigate(['signin']);
      })
    }
  
}
