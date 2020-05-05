import {Component,OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingService } from '../shopping.service';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('f') form: NgForm;
  editIngredientSub: Subscription;
  editMode: boolean;
  id: number;
  editItem: Ingredient;

  constructor(private shoppingService:ShoppingService) { }

  ngOnInit() {
    this.editIngredientSub = this.shoppingService.editIngredient
                    .subscribe((index:number) => {
                                    this.id = index;
                                    this.editMode = true;
                                    this.editItem = this.shoppingService.getIngredient(this.id);
                                    this.form.setValue({
                                      name:this.editItem.name,
                                      amount:this.editItem.amount
                                    });
                              });
  }
  
  addItem(form: NgForm){
    const value = form.value;
    const  ingredient = new Ingredient(value.name,value.amount);
    if(this.editMode){
      this.shoppingService.updateIngredient(this.id, ingredient);
    }
    else{
      this.shoppingService.onAddItem(ingredient);
    }
    this.editMode = false;
    form.reset();
  }

  onDelete(){
    this.shoppingService.deleteIngredient(this.id);
    this.onClear();
  }

  onClear(){
    this.form.reset();
    this.editMode = false;
  }
}
