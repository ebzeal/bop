const bookDetails = ({
  nameOfBook, author, numOfPages, datePublished, genre, description, price, pictures
}) => {
  const picturesArray = Object.values(pictures);

  return {
    book: nameOfBook,
    author,
    pages: numOfPages,
    datePublished,
    genre,
    description,
    price,
    pictures: picturesArray,
  };
};

export default bookDetails;
