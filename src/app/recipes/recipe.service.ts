import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { map, tap } from "rxjs/operators";

import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingService } from "../shopping-list/shopping.service";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn:'root'
})
export class RecipeService{

    recipeChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [];

    constructor(
        private shoppingService:ShoppingService,
        private http: HttpClient
    ){}
    
    getRecipes(){
        return this.recipes.slice();
    }

    setRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipeChanged.next(this.recipes.slice());
    }

    getRecipe(index: number){
        return this.recipes[index];
    }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
    }

    updateRecipe(index:number, recipe: Recipe){
        this.recipes[index] = recipe;
        this.recipeChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipeChanged.next(this.recipes.slice());
    }

    addIngredientToShoppingList(ingredients:Ingredient[]){
        this.shoppingService.addListOfIngredients(ingredients);
    }

}