export const up = async ({ context: { sequelize, DataTypes } }) => {
  await sequelize.queryInterface.createTable('readinglists', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    },
    blog_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'blogs', key: 'id' },
    },
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  })
}

export const down = async ({ context: { sequelize } }) => {
  await sequelize.queryInterface.dropTable('readinglists')
}
