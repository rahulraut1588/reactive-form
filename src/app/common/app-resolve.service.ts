import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';


@Injectable()

export class AppResolver implements Resolve<any> {

    constructor(public afs: AngularFirestore,private http:HttpClient) { }
    resolve(route: ActivatedRouteSnapshot, rState: RouterStateSnapshot): Observable<any> {
        //return this.afs.collection('users').doc(route.params.myId).snapshotChanges().pipe(first());
        return this.http.get('http://demo8153322.mockable.io/test');
    }
}