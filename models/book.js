export default (sequelize, DataTypes) => {
  const Book = sequelize.define(
    'Book',
    {
      book: DataTypes.STRING,
      author: DataTypes.STRING,
      pages: DataTypes.INTEGER,
      datePublished: DataTypes.DATEONLY,
      genre: DataTypes.STRING,
      description: DataTypes.TEXT,
      price: DataTypes.FLOAT,
      pictures: DataTypes.ARRAY(DataTypes.TEXT),
    },
    {}
  );
  Book.associate = (models) => {
    // associations can be defined here
  };
  return Book;
};
