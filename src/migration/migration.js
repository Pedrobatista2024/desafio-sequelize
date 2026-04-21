const database = require('../config/database.js')
const users = require('../models/users.js')
const produtcs = require('../models/produtcs.js')
const request = require('../models/request.js')
const associations = require('../models/associations.js')

database.sync({ force: false });

console.log('Migracao Realizada...');