module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',  
    },
    sellerId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    totalPrice: {
      type: DataTypes.DECIMAL(9,2),
    },
    deliveryAddress: {
      type: DataTypes.STRING,
    },
    deliveryNumber: {
      type: DataTypes.STRING,
    },
    saleDate: {
      type: DataTypes.DATE,
    },
    status: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'sales',
    underscored: true,
    timestamp: false,
  });

  Sale.associate = (models) => {
    Sale.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
    Sale.belongsTo(models.User, {
      foreignKey: 'sellerId',
      as: 'seller',
    });
    Sale.hasMany(models.SaleProduct, {
      foreignKey: 'saleId',
      as: 'saleId',
    });
  };

  return Sale;
}
