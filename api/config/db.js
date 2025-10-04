const {Sequelize} = require("sequelize");

const sequelize = new Sequelize("nutrition", "root", "Omarkhalil123", {
    host: "localhost",
    dialect: "mysql",
})

module.exports = sequelize;
