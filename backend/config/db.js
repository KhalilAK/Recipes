const {Sequelize} = require("sequelize");

const sequelize = new Sequelize("nutrition_wlp9", "nutrition_wlp9_user", "rZekd487WjmqTP2PpLs6OPHbq2DsPHoB", {
    host: "dpg-d3gf231r0fns73bimta0-a",
    dialect: "postgres",
    port: 5432
})

module.exports = sequelize;
