const { UUIDV4 } = require('sequelize');
const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id:{
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    description:{
      type: DataTypes.TEXT,
      allowNull: false

    },

    image:{
      type: DataTypes.TEXT
    },

    releaseDate: {
      type: DataTypes.DATEONLY
    },

    rating: {
      type: DataTypes.FLOAT
    },

    platform: {
      type:DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    }
  });
};
