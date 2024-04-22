const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("./index");

const Book = sequelize.define('Book', {
  // Model attributes are defined here
  book_title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Book title cannot be empty."
      },
      len: {
        args: [1, 255], // Allow 1 to 255 characters
        msg: "Book title must be between 1 and 255 characters."
      }
    }
  },
  book_author: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Must be filled"
      },
    }
  },
  book_description: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Book description cannot be empty."
      },
      len: {
        args: [1, 255], // Allow 1 to 255 characters
        msg: "Book title must be between 1 and 255 characters."
      }
    }
  },
  book_Published_Date: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: true,
      isFourDigitNumber(value) {
        if (value.toString() < 1) {
          throw new Error('Published year value must be a valid year.');
        }
        if (value.toString().length !== 4) {
          throw new Error('Published year value must be a four-digit number.');
        }
      }
    }
  },
  book_Language: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Book language cannot be empty."
      },
      len: {
        args: [1, 15], // Allow 1 to 15 characters
        msg: "Book title must be between 1 and 15 characters."
      }
    }
  },
}, {
  // Other model options go here
  tableName: 'tbl_Books'
});

// `sequelize.define` also returns the model
// console.log(Book === sequelize.models.Book); // true


module.exports = Book