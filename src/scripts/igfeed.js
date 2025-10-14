const igAnimation = function () {
  let igPosts = document.querySelectorAll(".instafeed figure");
  igPosts.forEach(
    (item) => (item.style.animationDelay = `${Math.random() * 0.5 + 0.2}s`)
  );

  const igScroll = function () {
    igPosts.forEach((item) => {
      if (inViewPort(item)) {
        item.classList.add("appear");
      }
    }),
      window.requestAnimationFrame(igScroll);
  };
  window.requestAnimationFrame(igScroll);
};

const sburl =
  "https://ig.instant-tokens.com/users/a8fa12d0-d91f-4918-9436-9375b4f8c64f/instagram/31130242669957852/token?userSecret=vj1k5eu3u7nkak6a5u2hg";

const sbTokenSuccess = function (parsedData) {
  sbToken = parsedData.Token;
  var sbInstaFeed = new Instafeed({
    accessToken: sbToken,
    limit: 9,
    template:
      '<figure><a href="{{link}}" class="{{type}}"><img src="{{image}}" alt="AM Coral Gables Instagram Post" loading="lazy" width="250" height="250" /><figcaption>{{caption}}</figcaption></a></figure>',
    target: "sbInstaFeed",
  });
  sbInstaFeed.run();
  setTimeout(igAnimation, 1000);
};

const sbTokenError = function (error) {
  console.log(error);
};

const handleErrors = function (response) {
  if (!response.ok) {
    throw response.status + ": " + response.statusText;
  }
  return response.json();
};

const getSbToken = function (sburl, succeed, fail) {
  fetch(sburl)
    .then((response) => handleErrors(response))
    .then((data) => succeed(data))
    .catch((error) => fail(error));
};

getSbToken(sburl, sbTokenSuccess, sbTokenError);
