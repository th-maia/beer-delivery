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
    url_image: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    timestamps: false,
    underscored: true,
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
