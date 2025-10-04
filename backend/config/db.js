const {Sequelize} = require("sequelize");

const sequelize = new Sequelize("nutrition", "root", "Omarkhalil123", {
    host: "recipe.render.com",
    dialect: "postgres",
    port: 5432
})

module.exports = sequelize;
