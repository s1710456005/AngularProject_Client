import { Component, OnInit } from '@angular/core';
import {AuthtenticationService} from "../shared/authtentication.service";

@Component({
  selector: 'bs-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  constructor(public authService: AuthtenticationService) { }

  ngOnInit(): void {
  }

}
