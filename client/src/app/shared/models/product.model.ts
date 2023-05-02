export interface Products {
  count: number;
  products: Product[];
}

export interface Product {
  title: String;
  // category: String;
  image: String,
  description: String;
  price: Number;
  quantity: Number;
  short_desc: String,
  cart_id: String
}
