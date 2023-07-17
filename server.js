const express = require("express");
const app = express();
const port = 4000;
const {query} = require('./database');
const {recipe} = require('./models')


app.get("/", (req, res) => {
  res.send("Welcome to the Recipe Management System API!");
});

app.use(express.json()) 

app.use((req, res, next) => {
    console.log(`Request: ${req.method} ${req.originalUrl}`);
    res.on("finish", () => {
      // the 'finish' event will be emitted when the response is handed over to the OS
      console.log(`Response Status: ${res.statusCode}`);
    });
    next();
  });

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

//get all recipes
app.get("/recipes", async(req, res)=>{
    try{
        const allRecipes = await recipe.findAll();
        res.status(200).json(allRecipes);
    }catch(error){
        console.error(error);
    res.status(500).json({message: "Something went wrong"});
    }
});

//get recipe by id
app.get("/recipes/:id", async(req, res)=>{
    const recipeId = parseInt(req.params.id,10);
  
    try {
      const Recipe = await recipe.findOne({where:{id:recipeId}});
      //check to see if the book is even there
      if(Recipe){
        res.status(200).json(Recipe);
      } else {
        res.status(404).json({message: "recipe not found"});
      }
  
    } catch (error) {
      console.error(error);
      res.status(500).json({message: "Something went wrong"});
    }
  
  });


//create recipe
app.post("/recipes", async(req, res) =>{
    try {
        const newRecipe = await recipe.create(req.body);
        res.status(201).json(newRecipe);
    } catch (error) {
      if(error.name === 'SequelizeValidationError'){
        return res.status(422).json({errors:error.errors.map(e=>e.message)});
      }
        res.status(500).send({message: error.message});
    }
  });

//update recipe
app.patch("/recipes/:id", async(req, res)=>{
    const recipeId = parseInt(req.params.id, 10);
    
    try{
        const[numberOfAffectedRows, affectedRows] = await recipe.update(req.body, {where:{id:recipeId},returning:true});
  
        if(numberOfAffectedRows > 0){
          res.status(200).json(affectedRows[0]);
        }else{
          res.status(404).json({message: "Book not found"});
        }
  
    }catch(error){
      if(error.name === 'SequelizeValidationError'){
        return res.status(422).json({errors:error.errors.map(e=>e.message)});
      }
      console.log(error);
      res.status(500).json({message: error.message});
    }
  
  });

//delete recipe

app.delete("/recipes/:id", async(req, res)=>{
    const recipeId = parseInt(req.params.id, 10);
  
    try{
      const deleteRecipe = await recipe.destroy({where: {id:recipeId}});
  
        if(deleteRecipe> 0){
          res.status(200).send({message: "Recipe deleted successfully"});
        }else{
          res.status(404).send({message: "Recipe not found"});
        }
  
    }catch(error){
      console.log(error);
      res.status(500).json({message: "Something went wrong"});
    }
  
  });
