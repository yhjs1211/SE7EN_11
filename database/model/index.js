// Models
const Log = require('./log.js');
const Product = require('./product.js');
const Review = require('./review.js');
const Store = require('./store.js');
const User = require('./user.js');
const Cart = require('./cart.js');
const CartProduct = require('./cartProduct.js');

// User
User.hasOne(Store);
User.hasOne(Cart);
User.hasMany(Log);
User.hasMany(Review);

// Product
Product.hasMany(Review);
Product.belongsTo(Store);
Product.belongsToMany(Cart,{through:CartProduct, as:'ProductList'});
Product.belongsToMany(Log,{through:'LogProduct', as:'PurchaseDescription'});

// Cart
Cart.belongsToMany(Product,{through:CartProduct});

// Log
Log.belongsToMany(Product,{through:'LogProduct'});

// Review
Review.belongsTo(User);
Review.belongsTo(Product);
// Store
Store.hasMany(Product);

module.exports = [Log, Product, Review, Store, User, Cart, CartProduct];