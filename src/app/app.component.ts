import { Component } from '@angular/core';
import {AuthtenticationService} from "./shared/authtentication.service";

@Component({
    selector: 'bs-root',
    templateUrl: './app.component.html',
    styles: []
})
export class AppComponent {

    constructor(public authService:AuthtenticationService){}

    isLoggedIn(){
        return this.authService.isLoggedIn();
    }

    //TODO implement for searcher
    isLoggedInAsSearcher(){
        return this.authService.isLoggedIn();
    }

    getLoginLabel(){
        if(this.isLoggedIn()){
            return "Abmelden";
        }else{
            return "Anmelden";
        }
    }

    showResponsiveMenu(){
        var x = document.getElementById("topNav");
        if (x.className === "navbar-nav topnav") {
            x.className += " responsive";
        } else {
            x.className = "navbar-nav";
            x.className += " topnav";
        }
    }
}
