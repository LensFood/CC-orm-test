module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false
          },
          brand: {
            type: DataTypes.STRING,
            allowNull: false
          },
          description: {
            type: DataTypes.TEXT,
          },
          createdAt: {
            allowNull: false,
            type: DataTypes.DATE
          },
          updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
          }
    }, {
        tableName: 'products'
    });

    return Product; 
};
