import { Component, OnInit, OnDestroy } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from './shopping.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  selectedIngredient:Ingredient;
  ingChangedSub: Subscription;

  constructor(private shoppingService:ShoppingService) {
   }

  ngOnInit() {
    this.ingredients = this.shoppingService.getIngredients();
     this.ingChangedSub = this.shoppingService.ingredientsChanged
        .subscribe((ings:Ingredient[]) =>{
          this.ingredients = ings;
        });
  }

  editIngredient(index:number){
    this.shoppingService.editIngredient.next(index);
  }

  ngOnDestroy() {
    this.ingChangedSub.unsubscribe();
  }
}
