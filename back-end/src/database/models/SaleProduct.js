const saleProductSchema = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define('SaleProduct', {
    saleId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
      references: {
        model: 'sales',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE', 
    },
    productId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
      references: {
        model: 'products',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE', 
    },
    quantity: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'salesProducts',
  });

  SaleProduct.associate = (models) => {
    models.Product.belongsToMany(models.Sale, {
      as: 'sales',
      through: SaleProduct,
      foreignKey: 'productId',
      otherKey: 'saleId'
    });
    models.Sale.belongsToMany(models.Product, {
      as: 'products',
      through: SaleProduct,
      foreignKey: 'saleId',
      otherKey: 'productId'
    });
  }

  return SaleProduct;
}

module.exports = saleProductSchema;
