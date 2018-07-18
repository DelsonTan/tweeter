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
    var button = document.querySelector("input[value=Tweet]");
    button.addEventListener("click", function (event) {
      event.preventDefault();
      if ($(".new-tweet textarea").val().length = 0) {
        alert("There is nothing to tweet!")
      } else if ($(".new-tweet textarea").val().length > 140) {
        alert("Your tweet is too long!");
      } else {
        $.ajax({
          method: "POST",
          url: "/tweets",
          data: $("form").serialize()
        })
          .done(function () {
            $(".new-tweet textarea").val("");
            loadTweets();
            console.log("request sent");
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