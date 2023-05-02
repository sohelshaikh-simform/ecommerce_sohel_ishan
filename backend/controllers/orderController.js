const Product = require('../model/product');
const OrderDetail = require('../model/orderdetails');

exports.create_order = async (req, res, next) => {
  const { userId, cart } = req.body;

  try {
    let products = [];

    for(p of cart.products){
      const product = await Product.findById(p.id);
      let updatedQuantity = (product.quantity - p.quantity);
      
      if (updatedQuantity >= 0) {
        const x = { p_id: p.id, ordered_quantity: p.quantity };
        products.push(x);
        await Product.findByIdAndUpdate(p.id, { quantity: updatedQuantity }, { runValidators: true });
      }
    };
  
    const newOrder = await OrderDetail.create({
      user_id: userId,
      products: products
    });

    console.log(newOrder)
    res.status(201).json({
      message: `Order was successfully placed with order id ${newOrder._id}`,
      orderId: newOrder._id,
      products: cart.products
    });

  } catch (err) {
    res.status(500).json({
      data: err,
      message: "New order failed while adding order details"
    });
  }
};

exports.get_order = async (req, res, next) => {
  const { orderId, userId } = req.query;
  try {
    // if (!orderId) throw { message: "order Id was not provided", statusCode: 400 };
    if (!userId) throw { message: "userId was not provided", statusCode: 400 };

    const order = await OrderDetail.find({user_id: userId }).populate('products.p_id');
    // console.log(order[0].products[0]);
    if (!order.length) {
      res.status(400).json({ message: "order was not found" });
    }
    else {
      res.status(200).json({
        message: `Order was found`,
        data: order
      });
    }

  }
  catch (err) {
    res.status(400).json({ message: err.message });
  }
};
