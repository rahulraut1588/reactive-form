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
            email: new FormControl('', Validators.required),
            phone: new FormControl('', Validators.required),
            wPhone: new FormControl('')
        }),
        location: new FormGroup({
            address: new FormControl('', Validators.required),
            country: new FormControl('', Validators.required),
            state: new FormControl('', Validators.required),
            city: new FormControl('', Validators.required),
            zip: new FormControl('', Validators.required)
        }),
        key: new FormGroup({
            password: new FormControl('', Validators.required),
            cPassword: new FormControl('', Validators.required)
        })
    });

    onSubmit() {
        // console.log(this.profileForm);
    }
    
    resetForm() {
        this.profileForm.patchValue ({
            name: {
                firstName: "",
                middleName: "",
                lastName: ""
            },
            contact: {
                email: "",
                phone: "",
                wPhone: ""
            },
            location: {
                address: "",
                country: "",
                state: "",
                city: "",
                zip: ""
            },
            key: {
                password: "",
                cPassword: ""
            }
        });
    }
}