const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("./index");

const User = sequelize.define('User', {
    // Model attributes are defined here
    User_ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    User_Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    User_Password_Hash: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "User password cannot be empty."
            }
        }
    },
    User_Image_Path: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 0,
        validate: {
            notEmpty: {
                msg: "User Image cannot be empty."
            }
        }
    },
    Is_Admin: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            isInt: {
                msg: "Must be selected"
            },
        }
    },
    Is_Verified: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            isInt: {
                msg: "Must be selected"
            },
        }
    },

}, {
    // Other model options go here
    tableName: 'tbl_Users'
});

// `sequelize.define` also returns the model
// console.log(User === sequelize.models.User); // true

module.exports = User