import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import {Message, Shoppinglist} from "../shared/shoppinglist";
import {ShoppinglistService} from "../shared/shoppinglist.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ShoppinglistFactory} from "../shared/shoppinglist-factory";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ShoppinglistFormErrorMessages} from "../shoppinglist-form/shoppinglist-form-error-messages";
import {AuthtenticationService} from "../shared/authtentication.service";

@Component({
    selector: 'bs-shoppinglist-details',
    templateUrl: './shoppinglist-details.component.html',
    styles: []
})
export class ShoppinglistDetailsComponent implements OnInit {
    shoppinglist: Shoppinglist = ShoppinglistFactory.empty();
    shoppinglistForm: FormGroup;
    shoppinglistFormAmount: FormGroup;
    errors: { [key: string]: string } = {};
    constructor(
        private fb: FormBuilder,
        private sl: ShoppinglistService,
        private router: Router,
        private route: ActivatedRoute,
        public authService: AuthtenticationService
    ) {
    }

    ngOnInit() {
        const params = this.route.snapshot.params;
        //parse to number to check for id in service function
        this.sl.getSingle(params['id'])
            .subscribe(s => {
                this.shoppinglist = s;
                this.initShoppinglist();
            });
        this.initShoppinglist();
    }

    /**
     * builds a new array for the shoppingitems
     */
    initShoppinglist() {
        //build of the modell und form
        //mapping the formbuilder with the formControlname (shoppinglistForm) of the template
        this.shoppinglistForm = this.fb.group({
            id: this.shoppinglist.id,
            messagetext: ['',Validators.required],
            //bills: this.bills
        });
        this.shoppinglistFormAmount = this.fb.group({
            id: this.shoppinglist.id,
            total_amount: [this.shoppinglist.total_amount,Validators.required],
        });
        this.shoppinglistForm.statusChanges.subscribe(()=> this.updateErrorMessages());
    }

    /**
     * save changes to database through submit
     */
    submitForm() {
        // filter empty values
        const shoppinglist:Shoppinglist=ShoppinglistFactory.fromObject(this.shoppinglistForm.value);

        //eintrag hinzufügen
        //TODO userid for auth.
        this.shoppinglist.messages.push(new Message(this.shoppinglist.messages.length+1, this.authService.getCurrentUserId(),null, this.shoppinglistForm.value.messagetext, null));
        shoppinglist.messages = this.shoppinglist.messages;

        //navigate to the update form including all existing attribute/objects of the shoppinglist
        this.sl.update(shoppinglist).subscribe(res => {
            //initialize again once the update ist done to get the updated message data
            this.ngOnInit();
        });
    }

    /**
     * submit to save total amount on inprogress or done lists
     */
    submitFormAmount() {
        // filter empty values
        const shoppinglist:Shoppinglist=ShoppinglistFactory.fromObject(this.shoppinglistFormAmount.value);

        this.shoppinglist.total_amount = this.shoppinglistFormAmount.value.total_amount;
        shoppinglist.total_amount = this.shoppinglist.total_amount;
        //navigate to the update form including all existing attribute/objects of the shoppinglist
        this.sl.update(shoppinglist).subscribe(res => {
            //initialize again once the update ist done to get the updated message data
            this.ngOnInit();
        });
    }

    /**
     * remove shoppinglist by clickevent
     */
    removeShoppinglist() {
        if (confirm('Möchtest du die Einkaufsliste wirklich löschen?')) {
            //usage of save-navigation operator to avoid any issues while deleting the list
            this.sl.remove(this.shoppinglist.id)
                .subscribe(res => this.router.navigate(['../'], {relativeTo: this.route}));
        }
    }

    /**
     * errormessages are updated for the shoppinglist form
     */
    updateErrorMessages() {
        this.errors = {};
        for (const message of ShoppinglistFormErrorMessages) {
            const control = this.shoppinglistForm.get(message.forControl);
            if (control &&
                control.dirty &&
                control.invalid &&
                control.errors[message.forValidator] &&
                !this.errors[message.forControl]) {
                this.errors[message.forControl] = message.text;
            }
        }
    }
}
