import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {

  selectedOption : string = "movies_inv";
  loggedUser : string;

  constructor(private authService : AuthService,
              private router : Router) { }

  ngOnInit() {
     this.loggedUser = this.authService.getLoggedUsername();
  }

  navigateToMoviesInventory(){
      this.router.navigate(['movies-list']);
      this.onSelectOption('movies_inv');
  }

  navigateToMoviesRent(){
    this.router.navigate(['rent-list']);
    this.onSelectOption('movies_rent');
  }

  onSelectOption(option : string){
    this.selectedOption = option;
  }

  logout(){
     this.authService.clearLocalStorage();
     this.router.navigate(['authentication/login']);
  }

}
