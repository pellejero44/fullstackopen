const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.map((blog) => blog.likes).reduce((sum, item) => sum + item);
};

const favoriteBlog = (blogs) => {
  let favorite = blogs.reduce((max, obj) =>
    max.likes > obj.likes ? max : obj
  );
  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  };
};

const mostBlogs = (blogs) => {
  let blogsCount = blogs.reduce(
    (acc, val) => {
      const position = acc.findIndex((item) => item.author === val.author);
      console.log(position);
      if (position !== -1) {
        acc[position].blogs++;
      } else {
        acc.push({
          blogs: 1,
          author: val.author,
        });
      }

      return acc;
    },
    []
  );

  let favorite = blogsCount.reduce((max, obj) =>
    max.blogs > obj.blogs ? max : obj
  );

  return favorite;
};

const mostLikes = (blogs) => {
  let blogsCount = blogs.reduce(
    (acc, val) => {
      const position = acc.findIndex((item) => item.author === val.author);
      if (position !== -1) {
        acc[position].likes += val.likes;
      } else {
        acc.push({
          likes: val.likes,
          author: val.author,
        });
      }

      return acc;
    },
    []
  );

  let favorite = blogsCount.reduce((max, obj) =>
    max.likes > obj.likes ? max : obj
  );

  return favorite;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
