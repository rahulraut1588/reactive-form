import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Component ({
    selector: 'my-user-list',
    templateUrl: './user-list.component.html'
})


export class UserlistComponent {   

    userData=[];
    users: any;
    userDoc: AngularFirestoreDocument;

    constructor(public afs: AngularFirestore) {
        this.users = afs.collection('users').snapshotChanges();
        var i = 0;
        afs.collection('users').snapshotChanges().subscribe( res => {
            res.map ( changes => {
                this.userData[i] = changes.payload.doc.data();
                this.userData[i].id = changes.payload.doc.id;
                i++;
            });
        });
    }

    deleteUser (user) {
        this.afs.collection("users").doc(user.id).delete().then(function() {
            alert("Document successfully deleted!");
        }).catch(function(error) {
            alert("Error removing document: " + error);
        });
    }

}