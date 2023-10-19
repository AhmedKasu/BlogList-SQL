export const up = async ({ context: { sequelize, DataTypes } }) => {
  await sequelize.queryInterface.createTable('sessions', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    },
  })
}

export const down = async ({ context: { sequelize } }) => {
  await sequelize.queryInterface.dropTable('sessions')
}
