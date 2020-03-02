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
    // associations can be defined here
  };
  return User;
};
