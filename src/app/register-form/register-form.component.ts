import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component ({
    selector: 'my-form',
    templateUrl: './register-form.component.html'
})

export class RegisterformComponent {

    title = 'Registeration Form';    

    profileForm = new FormGroup ({
        name: new FormGroup({
            firstName: new FormControl('', Validators.required),
            middleName: new FormControl('', Validators.required),
            lastName: new FormControl('', Validators.required)
        }),
        contact: new FormGroup({
            email: new FormControl('', {
                validators: [
                    Validators.required,
                    Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
                ]
             }),
            phone: new FormControl('', {
                validators: [
                    Validators.required,
                    Validators.pattern('^[0-9]{10,14}$')
                ]
            }),
            wPhone: new FormControl('', {
                validators: [
                    Validators.required,
                    Validators.pattern('^[0-9]{10,14}$')
                ]
            })
        }),
        location: new FormGroup({
            address: new FormControl('', Validators.required),
            country: new FormControl('', Validators.required),
            state: new FormControl('', Validators.required),
            city: new FormControl('', Validators.required),
            zip: new FormControl('', {
                validators: [
                    Validators.required,
                    Validators.pattern('^[0-9]{6}$')
                ]
            })
        }),
        key: new FormGroup({
            password: new FormControl('', Validators.required),
            cPassword: new FormControl('', Validators.required)
        }, { updateOn: 'change' })
    });

    nameFields = this.profileForm.controls.name;
    contactFields = this.profileForm.controls.contact;
    addressFields = this.profileForm.controls.location;
    passwordFields = this.profileForm.controls.key;
    
    onSubmit() {
        console.log(this.profileForm.value);
    }

    resetForm() {
        this.profileForm.reset(''); 
    }
}