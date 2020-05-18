import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ShoppinglistsOverviewComponent } from './shoppinglists-overview/shoppinglists-overview.component';
import { ShoppinglistsOverviewItemComponent } from './shoppinglists-overview-item/shoppinglists-overview-item.component';
import { ShoppinglistDetailsComponent } from './shoppinglist-details/shoppinglist-details.component';
import {ShoppinglistService} from "./shared/shoppinglist.service";
import { HomeComponent } from './home/home.component';
import {AppRoutingModule} from "./app-routing.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { ShoppinglistFormComponent } from './shoppinglist-form/shoppinglist-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import { LoginComponent } from './login/login.component';
import {AuthtenticationService} from "./shared/authtentication.service";
import {TokenInterceptorService} from "./shared/token-interceptor.service";
import {JwtInterceptorService} from "./shared/jwt-interceptor.service";
import { ShoppinglistOverviewVolItemComponent } from './shoppinglist-overview-vol-item/shoppinglist-overview-vol-item.component';
import { ShoppinglistOverviewOpenComponent } from './shoppinglist-overview-open/shoppinglist-overview-open.component';

@NgModule({
    declarations: [
        AppComponent,
        ShoppinglistsOverviewComponent,
        ShoppinglistsOverviewItemComponent,
        ShoppinglistDetailsComponent,
        HomeComponent,
        ShoppinglistFormComponent,
        LoginComponent,
        ShoppinglistOverviewVolItemComponent,
        ShoppinglistOverviewOpenComponent
    ],
    imports: [
        BrowserModule, AppRoutingModule, HttpClientModule, ReactiveFormsModule
    ],
    providers: [ShoppinglistService, AuthtenticationService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptorService,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptorService,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
