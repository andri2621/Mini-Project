import models from "./IndexModel";

const users = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    user_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_name: {
      type: DataTypes.STRING(55),
      allowNull: false
    },
    user_email: {
      type: DataTypes.STRING(55),
      allowNull: false
    },
    user_password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    user_device_info: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    user_salt: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'users',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "users_pkey",
        unique: true,
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });

  users.associate = models => {
    users.hasOne(models.account, {foreignKey: 'acco_user_id', onDelete:'CASCADE'})
  }

  return users;

};

export default users;