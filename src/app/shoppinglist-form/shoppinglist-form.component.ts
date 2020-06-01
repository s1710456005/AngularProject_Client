import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators, ValidatorFn} from "@angular/forms";
import {ShoppinglistFactory} from "../shared/shoppinglist-factory";
import {Shoppinglist, Message} from "../shared/shoppinglist";
import {Shoppingitem, Unit} from "../shared/shoppingitem";
import {ShoppinglistService} from "../shared/shoppinglist.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ShoppinglistFormErrorMessages} from "./shoppinglist-form-error-messages";
import {AuthtenticationService} from "../shared/authtentication.service";

@Component({
    selector: 'bs-shoppinglist-form',
    templateUrl: './shoppinglist-form.component.html',
    styles: []
})
export class ShoppinglistFormComponent implements OnInit {
    shoppinglistForm: FormGroup;
    shoppinglist= ShoppinglistFactory.empty();
    aUnits: Unit[];
    unit: Unit;
    errors: { [key: string]: string } = {};

    isUpdatingShoppinglist = false;
    shoppingitems: FormArray;
    //TODO implement bills to upload
    bills: FormArray;

    constructor(private fb: FormBuilder, private sl: ShoppinglistService,
                private route: ActivatedRoute, private router: Router,
                private authService: AuthtenticationService) {
    }

    /**
     * check if user is in update or creation modus, initialization of the shoppinglist
     */
    ngOnInit(): void {
        //get the id of route, check if update modus or creation modus
        const idOfList = this.route.snapshot.params['id'];
        this.sl.getAllUnits().subscribe(res => this.aUnits = res);
        if (idOfList) {
            this.isUpdatingShoppinglist = true;
            this.sl.getSingle(idOfList).subscribe(shoppinglist => {
                this.shoppinglist = shoppinglist;
                //need initialization of shoppinglist due to callback
                this.initShoppinglist();
            });
        }
        this.initShoppinglist();
    }

    /**
     * initialization of the shoppinglist
     */
    initShoppinglist() {
        this.buildShoppingitemsArray();
        this.buildMessagesArray();
        //build of the modell und form
        //mapping the formbuilder with the formControlname (shoppinglistForm) of the template
        this.shoppinglistForm = this.fb.group({
            id: this.shoppinglist.id,
            title: [this.shoppinglist.title, Validators.required],
            deadline: [this.shoppinglist.deadline, Validators.required],
            shoppingitems: this.shoppingitems,
            messagetext: this.shoppinglist.messages[0].messagetext,
            //bills: this.bills
        });
        this.shoppinglistForm.statusChanges.subscribe(()=> this.updateErrorMessages());
    }

    /**
     * builds a new array for the shoppingitems
     */
    buildShoppingitemsArray(){
        //if new shoppinglist had no shoppingitems in creation mode
        if(this.shoppinglist.shoppingitems.length == 0){
            this.shoppinglist.shoppingitems.push(new Shoppingitem(0, '',0,null,0));
        }
        this.shoppingitems = this.fb.array(
            this.shoppinglist.shoppingitems.map(
                t => this.fb.group({
                    id: this.fb.control(t.id),
                    //quantity: this.fb.control(t.quantity),
                    quantity: this.fb.control(t.quantity, [Validators.required, Validators.pattern("^[0-9]*$")]),
                    //title: this.fb.control(t.title),
                    title: this.fb.control(t.title, Validators.required),
                    unit: this.fb.control(t.unit),
                    price: this.fb.control(t.price),
                })
            )
        );
    }

    /**
     * create an array for the messages to be able to write the messagetext of the form into the list
     */
    buildMessagesArray(){
        this.shoppinglist.messages = [];
        this.shoppinglist.messages.push(new Message(0, null, null, '', null));
    }

    /**
     * add a new shoppingitem to the formarray control
     */
    addShoppinglistitemControl(){
        this.shoppingitems.push(this.fb.group({quantity:null,title:null,unit:null,price:null}));
    }

    /**
     * remove a added shoppingitem from the formarray control
     */
    removeShoppinglistitemControl(index: number){
        this.shoppingitems.removeAt(index);
    }

    /**
     * save changes to database through submit
     */
    submitForm() {
        // filter empty values
        this.shoppinglistForm.value.shoppingitems = this.shoppinglistForm.value.shoppingitems.filter(shoppingitem => shoppingitem.title);
        const shoppinglist:Shoppinglist=ShoppinglistFactory.fromObject(this.shoppinglistForm.value);
        shoppinglist.shoppingitems = this.shoppinglistForm.value.shoppingitems;

        //prepare the message info
        this.shoppinglist.messages[0].messagetext = this.shoppinglistForm.value.messagetext;
        if(this.shoppinglist.messages[0].messagetext !==''){
            shoppinglist.messages = this.shoppinglist.messages;
            shoppinglist.messages[0].user_id=this.authService.getCurrentUserId();
        }

        //TODO upload bills should be possible
        shoppinglist.bills = this.shoppinglist.bills;
        shoppinglist.user_id = this.authService.getCurrentUserId();

        if (this.isUpdatingShoppinglist) {
            //navigate to the update form including all existing attribute/objects of the shoppinglist
            this.sl.update(shoppinglist).subscribe(res => {
                this.router.navigate(['../../shoppinglists', shoppinglist.id], { relativeTo: this.route });
            });
        } else {
            console.log("die shoppinglist zum erstellen");
            console.log(shoppinglist);
            //navigate to an empty form
            this.sl.create(shoppinglist).subscribe(res => {
                this.shoppinglist = ShoppinglistFactory.empty();
                this.shoppinglistForm.reset(ShoppinglistFactory.empty());
                this.router.navigate(['../shoppinglists'], { relativeTo: this.route });
            });
        }
    }

    /**
     * change event on form select option - get new value for unit
     * @param e
     */
    changeUnitOfItem(e) {
        this.shoppingitems = this.fb.array(
            this.shoppinglist.shoppingitems.map(
                t => this.fb.group({
                    unit: this.fb.control(e.target.value),
                })
            )
        );
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
