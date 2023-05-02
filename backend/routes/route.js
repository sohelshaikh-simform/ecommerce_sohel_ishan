const express  = require('express');

const registerController = require('../controllers/signup');
const loginController = require('../controllers/login');
const orderController = require('../controllers/orderController');
const productController = require('../controllers/products');
const userController = require('../controllers/user');
const auth = require('../middlewares/checkJWT');

const router = express.Router();

router.route("/api/v1/auth/signup").post(registerController.register);

router.route("/api/v1/auth/login").post(loginController.login);

router.route("/api/v1/users").get(userController.get_all_users);
router.route("/api/v1/users/:id").put(userController.update_user);

router.route("/api/v1/products").get(productController.getallproducts); 
router.route("/api/v1/products/:id").get(productController.getproductbyid);

router.route("/api/v1/products").post(productController.addProduct); 


router.route("/api/v1/orders/").get(orderController.get_order);
router.route("/api/v1/orders/create").post(orderController.create_order);

module.exports = router;