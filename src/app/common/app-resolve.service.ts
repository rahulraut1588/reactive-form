import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from  "@angular/fire/auth";

import { map } from 'rxjs/operators';

@Injectable()

export class AppResolver implements Resolve<any> {

    usersCollection: AngularFirestoreCollection<any>;
    users: any;
    userDoc: AngularFirestoreDocument<any>;

    constructor(
        public afs: AngularFirestore, 
        private http: HttpClient, 
        public afAuth: AngularFireAuth
    ) { 
        this.usersCollection = this.afs.collection('users');
    }

    resolve(route: ActivatedRouteSnapshot, rState: RouterStateSnapshot): Observable<any> {
        return this.http.get('http://demo8153322.mockable.io/test');
    }
}