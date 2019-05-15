// Wishlist

$(".wishlist-button").on("click", function (event) {
  console.log("working")
  var title = $(this).attr("data-title");
  var imdbID = $(this).attr("data-id");
  var poster = $(this).attr("data-poster")
  var $this = $(this);

  if (($this).hasClass("red")) {
    $.ajax({
      url: "/api/wishList/" + imdbID,
      type: "delete",
      success: function (data) {
        $this.removeClass("red")
        $this.text("Add to Wishlist")
      }
    });
  } else {
    console.log(poster)
    $.post(
      "/api/wishList",
      {
        title: title,
        imdbID: imdbID,
        poster_path: poster
      },
      function(data, status) {
        $this.addClass("red", true)
        $this.text("Remove from Wishlist!")
      }
    );
  }
});




// Watchlist

$(".watchedlist-button").on("click", function (event) {
  console.log("watchedlist-working");
  var title = $(this).attr("data-title");
  var imdbID = $(this).attr("data-id");
  var poster = $(this).attr("data-poster");
  var $this = $(this);

  if (($this).hasClass("red")) {
    $.ajax({
      url: "/api/watchedList/" + imdbID,
      type: "delete",
      success: function (data) {
        $this.removeClass("red");
        $this.text("Add to Watchedlist");
      }
    });
  } else {
    $.post("/api/watchedList", {
      title: title,
      imdbID: imdbID,
      poster_path: poster
    }, function (data, status) {
      $this.addClass("red", true)
      $this.text("Remove from Watchedlist!")
    });
  }
});


// Tre