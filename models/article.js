export default (sequelize, DataTypes) => {
  const Article = sequelize.define(
    'Article',
    {
      title: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      slug: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
      content: DataTypes.TEXT,
      tweets: DataTypes.ARRAY(DataTypes.STRING(280)),
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {}
  );
  Article.associate = (models) => {
    const { User } = models;

    Article.belongsTo(User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      as: 'author',
    });
  };
  return Article;
};
