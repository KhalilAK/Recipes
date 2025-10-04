const {DataTypes} = require("sequelize");
const sequelize = require("../config/db");


const RecipeItem = sequelize.define("recipe_item", {
    /*
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        instructions TEXT NOT NULL
    */
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false, unique: true},
    instructions: {type: DataTypes.TEXT, allowNull: false}

}, {tableName:"recipe_item", timestamps:false});

const Ingredient = sequelize.define("ingredient", {
    /*
    ingredient_id INT AUTO_INCREMENT PRIMARY KEY,
    recipe_id INT  NOT NULL REFERENCES recipe_item(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    quantity VARCHAR(50)
    */
    ingredient_id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    recipe_id: {type: DataTypes.INTEGER, allowNull:false, references: {model: 'recipe_item', key: 'id'}},
    name: {type: DataTypes.STRING, allowNull: false},
    quantity: {type: DataTypes.STRING(50), allowNull: true},



}, {tableName:"ingredient", timestamps:false})


RecipeItem.hasMany(Ingredient, {
    foreignKey: 'recipe_id',
    onDelete: 'CASCADE'
});

Ingredient.belongsTo(RecipeItem, {
    foreignKey: 'recipe_id'
})


/*const foodItem = sequelize.define("food_item", {
    /*
    id INT AUTO_INCREMENT PRIMARY KEY,
    sugar_g DECIMAL(10,2) NOT NULL,
    fiber_g DECIMAL(10,2) NOT NULL,
    serving_size_g DECIMAL(10,2) NOT NULL,
    sodium_mg DECIMAL(10,2) NOT NULL,
    name VARCHAR(255) NOT NULL,
    potassium_mg DECIMAL(10,2) NOT NULL,
    fat_saturated_g DECIMAL(10,2) NOT NULL,
    fat_total_g DECIMAL(10,2) NOT NULL,
    calories DECIMAL(10,2) NOT NULL,
    cholesterol_mg DECIMAL(10,2) NOT NULL,
    protein_g DECIMAL(10,2) NOT NULL,
    carbohydrates_total_g DECIMAL(10,2) NOT NULL

    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    sugar_g: {type: DataTypes.DECIMAL(10,2), allowNull: false},
    fiber_g: {type: DataTypes.DECIMAL(10,2), allowNull: false},
    serving_size_g: {type: DataTypes.DECIMAL(10,2), allowNull: false},
    sodium_mg: {type: DataTypes.DECIMAL(10,2), allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
    potassium_mg: {type: DataTypes.DECIMAL(10,2), allowNull: false},
    fat_saturated_g: {type: DataTypes.DECIMAL(10,2), allowNull: false},
    fat_total_g: {type: DataTypes.DECIMAL(10,2), allowNull: false},
    calories: {type: DataTypes.DECIMAL(10,2), allowNull: false},
    cholesterol_mg: {type: DataTypes.DECIMAL(10,2), allowNull: false},
    protein_g: {type: DataTypes.DECIMAL(10,2), allowNull: false},
    carbohydrates_total_g: {type: DataTypes.DECIMAL(10,2), allowNull: false}
}, {tableName:"food_item", timestamps:true});*/

module.exports = {RecipeItem, Ingredient};
