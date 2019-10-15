import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AutosService } from '../../services/autos.service';
import { User } from '../../interfaces/user';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  isLoggedIn = false

  constructor(public autosService: AutosService, private router: Router) { }

  ngOnInit() {
  }

  onLogin(form):void {
    console.log('Login', form.value);
    this.autosService.login(form.value).subscribe(res => {
      this.isLoggedIn = true
      //this.router.navigateByUrl('home/autos');
    });
  }

}
