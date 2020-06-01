import { Component, OnInit, Input } from '@angular/core';
import {Shoppinglist} from "../shared/shoppinglist";
import {ShoppinglistService} from "../shared/shoppinglist.service";
import {AuthtenticationService} from "../shared/authtentication.service";

@Component({
  selector: 'div.bs-shoppinglist-overview-open',
  templateUrl: './shoppinglist-overview-open.component.html',
  styles: []
})
export class ShoppinglistOverviewOpenComponent implements OnInit {

    shoppinglists: Shoppinglist[];
    constructor(private bs: ShoppinglistService, public authService: AuthtenticationService) {
    }


    /*
    does the initialization once the component has been loaded
     */
    ngOnInit() {
        this.bs.getAll().subscribe(res => this.shoppinglists = res);
        console.log("this.shoppinglists");
        console.log(this.shoppinglists);
    }

}
