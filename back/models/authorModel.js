const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("./index");

const Author = sequelize.define('Author', {
  // Model attributes are defined here
  Author_Name_Urdu: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Author Name Urdu cannot be empty."
      },
      len: {
        args: [1, 255], // Allow 1 to 255 characters
        msg: "Author Name Urdu must be between 1 and 255 characters."
      }
    }
  },
  Author_Name_English: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Author Name English cannot be empty."
      },
      len: {
        args: [1, 255], // Allow 1 to 255 characters
        msg: "Author Name English must be between 1 and 255 characters."
      }
    }
  },

}, {
  // Other model options go here
  tableName: 'tbl_Author'
});

// `sequelize.define` also returns the model
// console.log(Book === sequelize.models.Book); // true


module.exports = Author