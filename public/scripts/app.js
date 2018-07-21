$(document).ready(function () {

  function createTweetElement(obj) {
    var $article = $("<article>").addClass("tweet").attr("id", obj._id);

    var $header = $("<header>");
    $("<h2>").text(obj.user.name).appendTo($header);
    $("<img>").addClass("avatar").attr("src", obj.user.avatars.small).appendTo($header);
    $("<span>").addClass("handle").text(obj.user.handle).appendTo($header);
    $article.append($header);

    var $content = $("<p>").text(obj.content.text).appendTo($article);

    var $footer = $("<footer>");
    $("<span>").addClass("timestamp").text(moment(obj.created_at).fromNow()).appendTo($footer);
    var $icons = $("<span>").addClass("icons");
    $("<i>").addClass("fas fa-trash-alt").addClass("delete").appendTo($icons);
    $("<i>").addClass("fas fa-flag").appendTo($icons);
    $("<i>").addClass("fas fa-retweet").appendTo($icons);
    $("<i>").addClass("fas fa-heart").appendTo($icons);
    $footer.append($icons);
    $article.append($footer);

    return $article;
  }

  function renderTweets(tweets) {
    for (var index in tweets) {
      var renderedTweet = createTweetElement(tweets[index]);
      $("main .tweets").prepend(renderedTweet);
    }
  }

  function setUpLoginListener() {
    event.preventDefault();
    let emailField = $("#login textarea[name=email]");
    let passwordField = $("#login textarea[name=password]");
    if (emailField.val().length === 0 || passwordField.val().length === 0) {
      console.log("Login fields are empty");
    } else {
      console.log("Login attempt successful but no AJAX request yet");
      $.ajax({
        method: "POST",
        url: "/users/login",
        data: {
          email: emailField.val(),
          password: passwordField.val()
        }
      })
      .done(function () {
        console.log("AJAX request sent.");
        });
    }
  }

  function setUpComposeListener() {
    $(".new-tweet").slideToggle();
    $(".new-tweet textarea").focus();
  }

  function setUpTweetListener() {
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
          $(".tweets").empty();
          loadTweets();
        });
    }
  }

  function setupDeleteListener() {
    $.ajax({
      method: "DELETE",
      url: `/tweets/${$('id')}`,
      data: {
        id: $(this).closest(".tweet").attr('id')
      }
    })
    .done(function () {
      $(".tweets").empty();
      loadTweets();
    })
  }

  function setupEventListeners() {
    var composeButton = $("#compose-button");
    composeButton.on("click", setUpComposeListener);

    var tweetButton = $("input[value=Croak]");
    tweetButton.on("click", setUpTweetListener);

    var loginButton = $("#login-button");
    loginButton.on("click", setUpLoginListener);
    // Delete button listener is setup on the tweets container
    // to listen for clicks on any delete button
    $(".tweets").on("click", ".delete", setupDeleteListener)
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
