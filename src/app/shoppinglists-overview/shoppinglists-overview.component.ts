import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Shoppinglist, Shoppingitem, Status, Unit, User, Bill, Message} from "../shared/shoppinglist";
import {ShoppinglistService} from "../shared/shoppinglist.service";
import {AuthtenticationService} from "../shared/authtentication.service";


@Component({
    selector: 'bs-shoppinglists-overview',
    templateUrl: './shoppinglists-overview.component.html',
    styles: []
})
export class ShoppinglistsOverviewComponent implements OnInit {

    shoppinglists: Shoppinglist[];
    hasListOpenItems: false;
    hasListInProgressItems: false;
    hasListDoneItems: false;

    constructor(private bs: ShoppinglistService, public authService: AuthtenticationService) {
    }


    /*
    does the initialization once the component has been loaded
     */
    ngOnInit() {
        this.bs.getAll().subscribe(res => this.shoppinglists = res);
        this.checkStatusItems();
    }




    /**
     * filters the shoppinglists into several lists to easily view it in the template
     * @param statusFilter
     */
    checkStatusItems() {
        this.shoppinglists?.forEach(function (shoppinglist) {
            console.log("hallo1");
            if(shoppinglist.user.id == this.authService.getCurrentUserId() ||
                this.authService.isCurrentUserVolunteer()&&shoppinglist?.volunteer.id == this.authService.getCurrentUserId()){
                console.log("hallo");
                switch (shoppinglist.status.id) {
                    case 1:
                        this.hasListOpenItems = true;
                        break;
                    case 2:
                        this.hasListInProgressItems = true;
                        break;
                    case 3:
                        this.hasListDoneItems = true;
                        break;
                    default:
                        break;
                }
            }
        })
    }



}
