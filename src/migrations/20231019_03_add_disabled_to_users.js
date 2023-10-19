export const up = async ({ context: { sequelize, DataTypes } }) => {
  await sequelize.queryInterface.addColumn('users', 'disabled', {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
}

export const down = async ({ context: { sequelize } }) => {
  await sequelize.queryInterface.removeColumn('users', 'disabled')
}
