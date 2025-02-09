const orderQuery = `*[_type == "customer"]{
  _id,
  name,
  email,
  phoneNumber,
  address,
  city,
  zipCode,
  companyName,
  country,
  "orders": orders[]->{
    _id,
    orderStatus,
    paymentMethod,
    deliveryAddress,
    orderDate,
    totalAmount,
    "products": products[]{
      quantity,
      "product": product->{
        _id,
        name
      }
    }
  }
}
`