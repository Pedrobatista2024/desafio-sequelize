const users = require("./users");
const produtcs = require("./produtcs");
const request = require("./request");


users.hasMany(request, {
  foreignKey: "id_users", 
  as: "requests",          
});


request.belongsTo(users, {
  foreignKey: "id_users",
  as: "users",        
});


produtcs.hasMany(request, {
  foreignKey: "id_produtcs",
  as: "requests",
});


request.belongsTo(produtcs, {
  foreignKey: "id_produtcs",
  as: "produtcs",
});

module.exports = {
  users,
  produtcs,
  request,
};