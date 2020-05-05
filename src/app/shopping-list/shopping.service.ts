import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

export class ShoppingService{
    
    ingredientsChanged = new Subject<Ingredient[]>();
    editIngredient = new Subject<number>();
    ingredientAdded = new Subject<Ingredient>();

    private ingredients: Ingredient[] = [];

    getIngredients(){
        return this.ingredients.slice();
    }

    getIngredient(index:number){
        return this.ingredients[index];
    }

    onAddItem(ingredient:Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    updateIngredient(index:number, ingredient:Ingredient){
        this.ingredients[index]= ingredient;
        return this.ingredientsChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index:number){
        this.ingredients.splice(index,1);
        return this.ingredientsChanged.next(this.ingredients.slice());
    }

    addListOfIngredients(ingredients:Ingredient[]){
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
    
}