import { Injectable } from '@angular/core';

import { Router } from  "@angular/router";
import * as firebase from 'firebase/app';
import { AngularFireAuth } from  "@angular/fire/auth";
import { User } from  'firebase';
import { ToastrService } from 'ngx-toastr';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Injectable({
    providedIn:  'root'
})

export class AuthService {

    user: User;
    loggedIn: boolean;

    constructor( public afAuth: AngularFireAuth, public  router: Router, public toastr: ToastrService, public afs: AngularFirestore) { }

    checkLoggedIn() {
        if( localStorage.firebaseUserId ) {
            this.router.navigate(['']);
            this.toastr.success('', 'Login Successfull' );
        } else {
            this.router.navigate(['/login']);
            this.toastr.error('', 'Login Unsuccessfull');
        }
    }

    doNormalLogin(value){
        return new Promise<any>((resolve, reject) => {
            firebase.auth().signInWithEmailAndPassword(value.email, value.password)
                .then( res => resolve(res) )
                .catch( err => reject(err) );
        });
    }

    doNormalLogout () {
        return new Promise<any>((resolve, reject) => {
            firebase.auth().signOut()
                .then(res => resolve(res) )
                .catch( err=> reject(err) );
        });
    }

    getUser ( userId ): Observable<any> {
        return this.afs.collection('users').doc(userId).valueChanges();
    }

}  