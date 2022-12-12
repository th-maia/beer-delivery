const routesCheck = (type) => {
  switch (type) {
  case 'customer': {
    return '/customer/products';
  }
  case 'seller': {
    return '/seller/orders';
  }
  case 'administrator': {
    return '/admin/manage';
  }
  default:
    return '/customer/products';
  }
};

export default routesCheck;
