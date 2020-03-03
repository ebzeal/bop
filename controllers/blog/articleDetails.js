const articleDetails = (body, user) => {
  const { title, tweets, content } = body;
  const { userId } = user;

  const tweetsArray = Object.values(tweets);

  const slug = title.split(' ').join('-');

  return {
    title,
    slug,
    tweets: tweetsArray,
    content,
    userId,
  };
};

export default articleDetails;
