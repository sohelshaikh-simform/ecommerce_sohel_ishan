const Product = require('../model/product');

// GET ALL PRODUCTS
exports.getallproducts = async (req, res) => {
  // const { page = 1, limit = 10 } = req.query;

  // let startValue;
  // let endValue;

  // if (page > 0) {
  //   startValue = page * limit - limit; // 0,10,20,30
  //   endValue = page * limit;
  // } else {
  //   startValue = 0;
  //   endValue = 10;
  // }

  // db.query(
  //   `SELECT p.id, p.title, p.image, p.price, p.short_desc, p.quantity,
  //       c.title as category FROM products p JOIN categories c ON
  //           c.id = p.cat_id LIMIT ${startValue}, ${limit}`,
  //   (err, results) => {
  //     if (err) console.log(err);
  //     else res.json(results);
  //   }
  // );
  try {
    const products = await Product.find();
    res.status(200).json(products)
  } catch (err) {
    res.status(500).json({ response: false, error: err.message })
  }
};

// GET SINGLE PRODUCT BY ID
exports.getproductbyid = async (req, res) => {
  // db.query(
  //   `SELECT p.id, p.title, p.image, p.images, p.description, p.price, p.quantity, p.short_desc,
  //       c.title as category FROM products p JOIN categories c ON
  //           c.id = p.cat_id WHERE p.id = ${productId}`,
  //   (err, results) => {
  //     if (err) console.log(err);
  //     else res.json(results[0]);
  //   }
  // );
  try {
    const product = await Product.findById(req.params.id)
    res.status(200).send(product)
  } catch (err) {
    res.status(500).json({ response: false, error: err.message })
  }

};


exports.addProduct = async (req, res) => {
  try {
      const product = await Product.create(req.body)
      res.status(200).json({ response: true, product: product })
  } catch (err) {
      res.status(500).json({ response: false, error: err.message })
  }
}

exports.updateProduct = async (req, res) => {
  try {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
      res.status(200).json({ response: true, product: product })
  } catch (err) {
      res.status(500).json({ response: false, error: err.message })
  }
}

exports.deleteProduct = async (req, res) => {
  try {
      const product = await Product.findByIdAndDelete(req.params.id)
      res.status(200).json({ response: true, product: product })
  } catch (err) {
      res.status(500).json({ response: false, error: err.message })
  }
}
