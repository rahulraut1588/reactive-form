import { Injectable } from '@angular/core';

import { Router } from  "@angular/router";
import * as firebase from 'firebase/app';
import { AngularFireAuth } from  "@angular/fire/auth";
import { User } from  'firebase';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from  "@angular/fire/database";
import { query } from '@angular/core/src/render3';

@Injectable({
    providedIn:  'root'
})

export class AuthService {

    user: User;
    loggedIn: boolean;

    constructor(public  afAuth:  AngularFireAuth, public  router: Router, public toastr: ToastrService, public db: AngularFireDatabase) { }

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

    // findLessonById(url:string):Observable<User> {
        // return this.db.list('users', query: { equalTo: url } ).pipe(
        // filter(results => results && results.length > 0),
        // map(results => Lesson.fromJson(results[0])),
        // tap(console.log),);

        // this.db.list('users');
        // this.db.database.ref('users')
    // }
}  