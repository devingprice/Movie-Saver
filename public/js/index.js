/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
console.log("Loaded index.js");

function requestList(listname, cb) {
  console.log("ran request list");
  $.ajax({
    method: "get",
    url: "/api/" + listname
  })
    .then(function(data) {
      console.log(data);
      cb(data);
    })
    .catch(function(err) {
      console.log(err);
    });
}

function addToList(listname, data, cb) {
  console.log("ran add list");
  $.ajax({
    method: "post",
    url: "/api/" + listname,
    data: {
      apiId: data.id,
      title: data.title,
      poster: data.poster
    }
  }).then(function(data) {
    cb(data);
  });
}

function deleteFromList(listname, id, cb) {
  console.log("ran delete on list");
  $.ajax({
    method: "delete",
    url: "/api/" + listname + "/" + id
  }).then(function(data) {
    cb(data);
  });
}

$(".wishlist-button").on("click", function(event) {
  var $buttonRef = $(this);
  var title = $(this).attr("data-title");
  var id = $(this).attr("data-id");
  var poster = $(this).attr("data-poster");

  var isInLists = $(this).hasClass("orange lighten-1");

  if (isInLists) {
    deleteFromList("wishList", id, function(data) {
      $buttonRef.removeClass("orange lighten-1");
      $buttonRef.text("Add to Wish List");
    });
  } else {
    addToList("wishList", { id, title, poster }, function(data) {
      $buttonRef.addClass("orange lighten-1", true);
      $buttonRef.text("Remove from Wish List");
    });
  }
});

$(".watchedlist-button").on("click", function(event) {
  var $buttonRef = $(this);
  var title = $(this).attr("data-title");
  var id = $(this).attr("data-id");
  var poster = $(this).attr("data-poster");

  var isInLists = $(this).hasClass("orange lighten-1");

  if (isInLists) {
    deleteFromList("watchedList", id, function(data) {
      $buttonRef.removeClass("orange lighten-1");
      $buttonRef.text("Add to Watched List");
    });
  } else {
    addToList("watchedList", { id, title, poster }, function(data) {
      $buttonRef.addClass("orange lighten-1", true);
      $buttonRef.text("Remove from Watched List");
    });
  }
});

$(document).ready(function() {
  $(".sidenav").sidenav();

  $(".modal").modal();

  // eslint-disable-next-line no-unused-vars
  var swiper = new Swiper(".swiper-container", {
    effect: "coverflow",
    initialSlide: 2,
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true
    },
    pagination: {
      el: ".swiper-pagination"
    }
  });
});
