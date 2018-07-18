$(document).ready(function () {
  var data = [
    {
      "user": {
        "name": "Newton",
        "avatars": {
          "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
          "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
          "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": {
          "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 1461113796368
    }
  ];

  function createTweetElement(obj) {
    var $article = $("<article>");
    $article.addClass("tweet");

    var $header = $("<header>");

    var $h2 = $("<h2>");
    $h2.text(obj.user.name);
    $header.append($h2);

    var $avatar = $("<img>");
    $avatar.addClass("avatar");
    $avatar.attr("src", obj.user.avatars.small);
    $header.append($avatar);

    var $handle = $("<span>");
    $handle.addClass("handle");
    $handle.text(obj.user.handle);
    $header.append($handle);

    $article.append($header);

    var $content = $("<p>");
    $content.text(obj.content.text);

    $article.append($content);

    var $footer = $("<footer>");

    var $timestamp = $("<span>").addClass("timestamp");
    $timestamp.text(moment(obj.created_at).fromNow());
    $footer.append($timestamp);

    var $icons = $("<span>").addClass("icons");
    var $flag = $("<i>").addClass("fas fa-flag");
    $icons.append($flag);
    var $retweet = $("<i>").addClass("fas fa-retweet");
    $icons.append($retweet);
    var $heart = $("<i>").addClass("fas fa-heart");
    $icons.append($heart);

    $footer.append($icons);

    $article.append($footer);

    return $article;
  }

  function renderTweets(tweets) {
    for (var index in tweets) {
      var renderedTweet = createTweetElement(tweets[index]);
      $("main .tweets").append(renderedTweet);
    }
  }

  renderTweets(data);
})
// <article class="tweets">
//   <header>
//     <h2>Bill Fields</h2>
//     <img class="avatar" src="https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png">
//     <span class="handle">@MrFields</span>
//   </header>

//   <p>Little tweet here</p>

//   <footer>
//     <span class="timestamp">10 days ago</span>
//     <span class="icons"><i class="fas fa-flag"></i><i class="fas fa-retweet"></i><i class="fas fa-heart"></i></span>
//   </footer>
// </article>