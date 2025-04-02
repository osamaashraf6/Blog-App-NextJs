const globalService = {
  // baseUrl
  baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}`,
  //   Routes
  routes: {
    addresses: "/api/v1/addresses",
    archives: "/api/v1/archives",
    auth: "/api/v1/auth",
    comments: "/api/v1/comments",
    likes: "/api/v1/likes",
    posts: "/api/v1/posts",
    saveds: "/api/v1/saveds",
    users: "/api/v1/users",
  },
  //   domainImgs
  userImg: `${process.env.NEXT_PUBLIC_BASE_URL}/users/`,
  postImg: `${process.env.NEXT_PUBLIC_BASE_URL}/posts/`,
  //   ApiKey
  APiKey: "secret123",
};

export default globalService;
console.log(globalService.baseUrl);
