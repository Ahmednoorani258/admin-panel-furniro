export const query = `*[_type == "order"]{
  _id,
  orderStatus,
  paymentMethod,
  deliveryAddress,
  orderDate,
  totalAmount,
  "customer": customer->{
    _id,
    name,
    email,
    phoneNumber,
    address,
    city,
    zipCode,
    country,
    companyName
  },
  "products": products[]{
    quantity,
    "product": product->{
      _id,
      name
    }
  }
}`;
