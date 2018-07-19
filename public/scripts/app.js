

$(document).ready(function () {

  function createTweetElement(obj) {
    var $article = $("<article>");
    $article.addClass("tweet");

    var $header = $("<header>");
    $("<h2>").text(obj.user.name).appendTo($header);
    $("<img>").addClass("avatar").attr("src", obj.user.avatars.small).appendTo($header);
    $("<span>").addClass("handle").text(obj.user.handle).appendTo($header);
    $article.append($header);

    var $content = $("<p>").text(obj.content.text);
    $article.append($content);

    var $footer = $("<footer>");
    $("<span>").addClass("timestamp").text(moment(obj.created_at).fromNow()).appendTo($footer);
    $("<span>").addClass("icons");
    $("<i>").addClass("fas fa-flag").appendTo(".icons");
    $("<i>").addClass("fas fa-retweet").appendTo(".icons");
    $("<i>").addClass("fas fa-heart").appendTo(".icons");
    $(".icons").appendTo($footer);
    $article.append($footer);

    return $article;
  }

  function renderTweets(tweets) {
    for (var index in tweets) {
      var renderedTweet = createTweetElement(tweets[index]);
      $("main .tweets").prepend(renderedTweet);
    }
  }

  function setupEventListeners() {
    var composeButton = document.querySelector("#compose-button")
    composeButton.addEventListener("click", function(event) {
      event.preventDefault();
      $(".new-tweet").slideToggle();
      $(".new-tweet textarea").focus();
    })

    var tweetButton = document.querySelector("input[value=Croak]");
    tweetButton.addEventListener("click", function (event) {
      event.preventDefault();
      $(".new-tweet .errors").text("").slideUp();
      if ($(".new-tweet textarea").val().length === 0) {
        $(".new-tweet .errors").text("Error: there is nothing to tweet!").slideDown();
      } else if ($(".new-tweet textarea").val().length > 140) {
        $(".new-tweet .errors").text("Error: your tweet is too long!").slideDown();
      } else {
        $.ajax({
          method: "POST",
          url: "/tweets",
          data: $("form").serialize()
        })
          .done(function () {
            $(".new-tweet textarea").val("");
            loadTweets();
          });
      }
    })
  }

  setupEventListeners();

  function loadTweets() {
    $.ajax('/tweets', { method: 'GET' })
      .then(function (data) {
        renderTweets(data);
      })
  }

  loadTweets();
})