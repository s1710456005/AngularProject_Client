import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Shoppinglist} from "../shared/shoppinglist";

@Component({
  selector: 'a.bs-shoppinglists-overview-item',
  templateUrl: './shoppinglists-overview-item.component.html',
  styles: []
})

export class ShoppinglistsOverviewItemComponent implements OnInit {
  @Input() shoppinglist: Shoppinglist;
  //used for event on detail view
  //@Output() showDetailsEvent = new EventEmitter<Shoppinglist>();

  constructor() { }

  ngOnInit(){}

  /*
  show List-Details page by Event
  */
  /*
  showShoppinglistDetails (shoppinglist: Shoppinglist){
    this.showDetailsEvent.emit(shoppinglist);
  }
  */

}
