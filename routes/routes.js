const express = require("express");
const router = express.Router();
const spoonacularKey = process.env.SPOONACULAR_KEY;

// Set up the routes...

router.get("/api/recipe/:id", function(req, res){

    var newHref = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/"+
                    "recipes/informationBulk?ids="+req.params.id+"&includeNutrition=false";

    res.header("X-Mashape-Key", spoonacularKey);
    res.redirect(newHref);

});
//   https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?&number=100&query=pork

// router.get("/api/search/:id", function(req, res){

//     var newHref = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/"+
//                     "recipes/informationBulk?ids="+req.params.id+"&includeNutrition=false";

//     res.redirect(newHref);

// });


module.exports = router;
