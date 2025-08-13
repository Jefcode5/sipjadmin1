module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Kuliner', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nama: { type: DataTypes.STRING(150), allowNull: false },
    jenis_makanan: { type: DataTypes.STRING(100), allowNull: true },
    lokasi: { type: DataTypes.STRING(255), allowNull: true },
    deskripsi: { type: DataTypes.TEXT, allowNull: true },
    image: { type: DataTypes.STRING(255), allowNull: true },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    tableName: 'kuliner',
    timestamps: false
  });
};
