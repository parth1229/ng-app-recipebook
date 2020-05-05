import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  recipesChangedSub:Subscription;

  constructor(private recipeService:RecipeService, 
    private router: Router,
    private route:ActivatedRoute) { }

  ngOnInit() {
    this.recipesChangedSub = this.recipeService.recipeChanged
                                  .subscribe(
                                    (recipes: Recipe[]) => {
                                      this.recipes = recipes;
                                    }
                                  )
    this.recipes = this.recipeService.getRecipes();
  }

  newRecipe(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }
  
  ngOnDestroy(){
    this.recipesChangedSub.unsubscribe();
  }
}
