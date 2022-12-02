const productsSchema = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    urlImage: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'url_image',
    }
  }, {
    timestamps: false,
    undescored: true,
    tableName: 'products',
  });

  Product.associate = (models) => {
    Product.hasMany(models.SaleProduct, {
    foreignKey: 'productId',
    as: 'productId',
    })
  }

  return Product;
}

module.exports = productsSchema;
