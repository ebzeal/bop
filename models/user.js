export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      firstName: {
        type: DataTypes.STRING,
      },
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      access: DataTypes.STRING,
    },
    {}
  );
  User.associate = (models) => {
    const { Article } = models;

    User.hasMany(Article, {
      as: 'articles',
      foreignKey: 'userId',
    });
  };
  return User;
};
