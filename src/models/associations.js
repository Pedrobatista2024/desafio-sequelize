const users = require("./users");
const products = require("./products");
const request = require("./request");


users.hasMany(request, {
  foreignKey: "id_users", 
  as: "requests",          
});


request.belongsTo(users, {
  foreignKey: "id_users",
  as: "users",        
});


products.hasMany(request, {
  foreignKey: "id_products",
  as: "requests",
});


request.belongsTo(products, {
  foreignKey: "id_products",
  as: "products",
});

module.exports = {
  users,
  products,
  request,
};