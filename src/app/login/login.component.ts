import {Component, OnInit} from '@angular/core' ;
import {FormBuilder, FormGroup, Validators} from '@angular/forms' ;
import {Router} from '@angular/router' ;
import {AuthtenticationService} from "../shared/authtentication.service" ;

//ist das body ergebnis genau wie im postman
interface Response {
    response: string;
    result: {
        token: string;
    };
}

@Component({
    selector: 'bs-login',
    templateUrl: './login.component.html',
    styles: []
})
export class LoginComponent implements OnInit {
    //Name der Formgroup dass wir im HTML angeben
    loginForm: FormGroup;

    constructor(private fb: FormBuilder, private router: Router,
                private authService: AuthtenticationService) {
    }

    ngOnInit(): void {
        //erste variable sagt, ob ich etwas reinschreiben möchte
        // zweite man kann beliebige Validatoren eingeben sowie das format
        this.loginForm = this.fb.group({
            username: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
        });
    }

    /**
     * login to app, if success the token is saved to the local storage
     */
    login() {
        const val = this.loginForm.value;
        if (val.username && val.password) {
            this.authService.login(val.username, val.password).subscribe(res => {
                //es ist typescript und wir brauchen response damit das richtig funktioniert
                //siehe postman ergebnis mit result und response
                const resObj = res as Response;
                if (resObj.response === "success") {
                    //authService ist der selbsterstellte service
                    //localstorage speichert die id des derzeit eingeloggten user
                    this.authService.setLocalStorage(resObj.result.token);
                    this.router.navigateByUrl('/');
                }
            });
        }
    }

    /**
     * check if user is logged in to show appropriate view of the login
     */
    isLoggedIn() {
        return this.authService.isLoggedIn();
    }

    /**
     * check if user is logged in as searcher
     */
    isLoggedInAsSearcher(){
        //TODO implement searcher login
        return this.authService.isLoggedIn();
    }


    /**
     * logout from the app
     */
    logout() {
        this.authService.logout();
    }
}