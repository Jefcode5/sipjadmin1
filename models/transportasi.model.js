module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Transportasi', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nama: { type: DataTypes.STRING(150), allowNull: false },
    jenis: { type: DataTypes.STRING(100), allowNull: true },
    rute: { type: DataTypes.STRING(255), allowNull: true },
    deskripsi: { type: DataTypes.TEXT, allowNull: true },
    image: { type: DataTypes.STRING(255), allowNull: true },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    tableName: 'transportasi',
    timestamps: false
  });
};
