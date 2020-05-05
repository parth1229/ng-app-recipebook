import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { DataStorageService } from '../shared/data-storage.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  providers:[DataStorageService]
})
export class HeaderComponent implements OnInit, OnDestroy{

  isAuthenticated:boolean = false;
  userSub:Subscription;

  ngOnInit(){
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = user ? true : false;
    })
  }

  constructor(private dataService: DataStorageService,private authService: AuthService){}

  onSaveData(){
    this.dataService.saveDataToFB();
  }

  onFetchData(){
    this.dataService.fetchDataFromFB().subscribe();
  }

  onLogout(){
    this.authService.logOut();
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
}
