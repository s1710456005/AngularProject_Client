import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Shoppinglist, Status, User} from "../shared/shoppinglist";
import {ShoppinglistService} from "../shared/shoppinglist.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthtenticationService} from "../shared/authtentication.service";


@Component({
  selector: 'div.bs-shoppinglist-overview-vol-item',
  templateUrl: './shoppinglist-overview-vol-item.component.html',
  styles: []
})
export class ShoppinglistOverviewVolItemComponent implements OnInit {

    @Input() shoppinglist: Shoppinglist;

    constructor(private sl: ShoppinglistService, private router: Router, private route: ActivatedRoute,private authService: AuthtenticationService) { }

    ngOnInit(){}

    /**
     * set list in progress by volunteer
     * @param shoppinglist
     */
    setListInProgress(shoppinglist: Shoppinglist){
        shoppinglist.status = new Status(2,'inprogress');
        shoppinglist.volunteer= new User(this.authService.getCurrentUserId(), '','','','','','',true);
        //navigate to the update form including all existing attribute/objects of the shoppinglist
        this.sl.update(shoppinglist).subscribe(res => {

        });
    }


    /**
     * set list to finished
     * @param shoppinglist
     */
    setListToDone(shoppinglist: Shoppinglist){
        shoppinglist.status = new Status(3,'done');
        //navigate to the update form including all existing attribute/objects of the shoppinglist
        this.sl.update(shoppinglist).subscribe(res => {

        });
    }
}