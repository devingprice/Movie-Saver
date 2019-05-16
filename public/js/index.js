/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
console.log("Loaded index.js");

function requestList(listname, cb) {
  console.log("ran request list");
  $.ajax({
    method: "get",
    url: "/api/" + listname
  })
    .then(function (data) {
      console.log(data);
      cb(data);
    })
    .catch(function (err) {
      console.log(err);
    });
}

function addToList(listname, id, cb) {
  console.log("ran add list");
  $.ajax({
    method: "post",
    url: "/api/" + listname,
    data: {
      id
    }
  }).then(function (data) {
    cb(data);
  });
}

function deleteFromList(listname, id, cb) {
  console.log("ran delete on list");
  $.ajax({
    method: "delete",
    url: "/api/" + listname + "/" + id
  }).then(function (data) {
    cb(data);
  });
}

$(".wishlist-button").on("click", function(event) {
  console.log("clicked wishlist");
  var title = $(this).attr("data-title");
  var id = $(this).attr("data-id");
  var poster = $(this).attr("data-poster");

  var hasRed = $(this).hasClass("red");

  if(hasRed){
    deleteFromList("wishList", id, function (data) {
      $(this).removeClass("red");
      $(this).text("Add to Wishlist");
    });
  } else {
    addToList("wishList", id, function(data){
      $(this).addClass("red", true);
      $(this).text("Remove from Wishlist!");
    });
  }
});

$(".watchedlist-button").on("click", function (event) {
  console.log("clicked wishlist");
  var title = $(this).attr("data-title");
  var id = $(this).attr("data-id");
  var poster = $(this).attr("data-poster");

  var hasRed = $(this).hasClass("red");

  if (hasRed) {
    deleteFromList("watchedList", id, function (data) {
      $(this).removeClass("red");
      $(this).text("Add to Watched List");
    });
  } else {
    addToList("watchedList", id, function (data) {
      $(this).addClass("red", true);
      $(this).text("Remove from Watched List!");
    });
  }
});