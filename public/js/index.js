// Wishlist

$(".wishlist-button").on("click", function (event) {
  console.log("working")
  var title = $(this).attr("data-title");
  var id = $(this).attr("data-id");
  var poster = $(this).attr("data-poster")
  var $this = $(this);

  if (($this).hasClass("red")) {
    $.ajax({
      url: "/api/wishList/" + id,
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
        id: id,
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
  var id = $(this).attr("data-id");
  var poster = $(this).attr("data-poster");
  var $this = $(this);

  if (($this).hasClass("red")) {
    $.ajax({
      url: "/api/watchedList/" + id,
      type: "delete",
      success: function (data) {
        $this.removeClass("red");
        $this.text("Add to Watchedlist");
      }
    });
  } else {
    $.post("/api/watchedList", {
      title: title,
      id: id,
      poster_path: poster
    }, function (data, status) {
      $this.addClass("red", true)
      $this.text("Remove from Watchedlist!")
    });
  }
});


// Tre
$(document).ready(function() {
  $(".sidenav").sidenav();
});

$(document).ready(function() {
  $(".modal").modal();
});
