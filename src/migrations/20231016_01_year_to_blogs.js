export const up = async ({ context: { sequelize, DataTypes } }) => {
  await sequelize.queryInterface.addColumn('blogs', 'year', {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 1991,
      max: new Date().getFullYear(),
    },
  })
}

export const down = async ({ context: { sequelize } }) => {
  await sequelize.queryInterface.removeColumn('blogs', 'year')
}
