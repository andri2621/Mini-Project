const province = (sequelize, DataTypes) => {
  const province = sequelize.define('province', {
    prov_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    prov_name: {
      type: DataTypes.STRING(55),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'province',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "province_pkey",
        unique: true,
        fields: [
          { name: "prov_id" },
        ]
      },
    ]
  });
  province.associate = models => {
   
    province.hasMany(models.city,{foreignKey:'city_prov_id', onDelete: 'CASCADE' })
  }

  return province;

};

export default province;