const express = require("express");
const request = require("request");
const router  = express.Router();
const spoonacularKey = process.env.SPOONACULAR_KEY;
const walmartKey     = process.env.WALMART_KEY;
const giphyKey       = process.env.GIPHY_KEY;
const spoonURL   = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com";
const walmartURL = "http://api.walmartlabs.com/v1";
const giphyURL   = "http://api.giphy.com/v1";

// Set up the routes...

router.get("/api/recipe/:id", function(req, res){

    let options = {
      url: spoonURL + "/recipes/informationBulk?ids="+req.params.id+"&includeNutrition=false",
      headers: {
        "X-Mashape-Key": spoonacularKey
      }
    };

    request(options, function (error, response, body) {

        if(error){
            console.log(error);
            res.send({});
        } else{
            if(body === ""){
                console.log("Response missing.");
                res.send({});
            } else{
                res.send(JSON.parse(body));
            }
        }
    });

});

router.get("/api/recipes/search", function(req, res){

    let number = "0";
    if(req.query.number){
        number = req.query.number;
    }
    let queries = "";
    if(req.query.query){
        queries += "&query="+req.query.query;
    };
    if(req.query.cuisine){
        queries += "&cuisine="+req.query.cuisine;
    }
    if(req.query.type){
        queries += "&type="+req.query.type;
    }

    let options = {
      url: spoonURL + "/recipes/search?number="+number+queries,
      headers: {
        "X-Mashape-Key": spoonacularKey
      }
    };

    request(options, function (error, response, body) {

        if(error){
            console.log(error);
            res.send({});
        } else{
            if(body === ""){
                console.log("Response missing.");
                res.send({});
            } else{
                res.send(JSON.parse(body));
            }
        }
    });

});

router.get("/api/product/search/:ingredient", function(req, res){

    let searchQueryURL = walmartURL + "/search?" +
                           "apiKey=" + walmartKey +
                           "&categoryId=976759" +
                           "&query=" + req.params.ingredient; 

    let options = {
      url: searchQueryURL,
      headers: {
        "X-Requested-With": "XMLHttpRequest"
      }
    };

    request(options, function (error, response, body) {

        if(error){
            console.log(error);
            res.send({});
        } else{
            if(body === ""){
                console.log("Response missing.");
                res.send({});
            } else{
                res.send(JSON.parse(body));
            }
        }

    });
});

router.get("/api/giphy/trending", function(req, res){

    let queryURL =  giphyURL + "/gifs/trending?" +
                           "apiKey=" + giphyKey;

    let queries = "";

    if(req.query.limit){
        queries += "&limit="+req.query.limit;
    };
    if(req.query.offset){
        queries += "&offset="+req.query.offset;
    }

    let options = {
      url: queryURL + queries
    };

    request(options, function (error, response, body) {

        if(error){
            console.log(error);
            res.send({});
        } else{
            if(body === ""){
                console.log("Response missing.");
                res.send({});
            } else{
                res.send(JSON.parse(body));
            }
        }

    });
});

router.get("/api/giphy/search", function(req, res){

    let queryURL =  giphyURL + "/gifs/search?" +
                           "apiKey=" + giphyKey;

    let queries = "&q=";

    if(req.query.q){
        queries += req.query.q;
    }    
    if(req.query.limit){
        queries += "&limit="+req.query.limit;
    };

    let options = {
      url: queryURL + queries
    };

    request(options, function (error, response, body) {

        if(error){
            console.log(error);
            res.send({});
        } else{
            if(body === ""){
                console.log("Response missing.");
                res.send({});
            } else{
                res.send(JSON.parse(body));
            }
        }

    });
});

module.exports = router;
