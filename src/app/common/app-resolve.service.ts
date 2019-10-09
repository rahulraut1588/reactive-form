import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()

export class AppResolver implements Resolve<any> {

    constructor ( public afs: AngularFirestore ) { }

    resolve(route: ActivatedRouteSnapshot, rState: RouterStateSnapshot): Observable<any> {
        return this.afs.collection('users').doc(route.params['myId']).get();
    }
}