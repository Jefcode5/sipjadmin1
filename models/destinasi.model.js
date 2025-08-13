module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Destinasi', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nama: { type: DataTypes.STRING(150), allowNull: false },
    lokasi: { type: DataTypes.STRING(255), allowNull: true },
    deskripsi: { type: DataTypes.TEXT, allowNull: true },
    image: { type: DataTypes.STRING(255), allowNull: true },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    tableName: 'destinasi',
    timestamps: false
  });
};
