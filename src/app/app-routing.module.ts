import { NgModule } from '@angular/core' ;
import {Routes, RouterModule} from '@angular/router' ;
import { HomeComponent } from './home/home.component' ;
import {ShoppinglistsOverviewComponent} from "./shoppinglists-overview/shoppinglists-overview.component";
import {ShoppinglistDetailsComponent} from "./shoppinglist-details/shoppinglist-details.component";
import {ShoppinglistFormComponent} from "./shoppinglist-form/shoppinglist-form.component";
import {LoginComponent} from "./login/login.component";
import {ShoppinglistOverviewOpenComponent} from "./shoppinglist-overview-open/shoppinglist-overview-open.component";

const routes : Routes = [
    { path : '' , redirectTo : 'home' , pathMatch : 'full' },
    { path : 'home' , component : HomeComponent },
    { path : 'shoppinglists' , component : ShoppinglistsOverviewComponent },
    { path : 'openShoppinglists' , component : ShoppinglistOverviewOpenComponent },
    { path : 'shoppinglists/:id' , component : ShoppinglistDetailsComponent },
    { path : 'createList' , component : ShoppinglistFormComponent },
    { path : 'editList/:id' , component : ShoppinglistFormComponent },
    { path : 'login' , component : LoginComponent },
];

//forRoot.. methode to generate new module with the routing
@NgModule({
    imports : [RouterModule.forRoot(routes)],
    exports : [RouterModule],
    providers : []
})

export class AppRoutingModule { }