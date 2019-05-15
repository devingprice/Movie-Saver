/* eslint-disable no-unused-vars */
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

function addToList(listname, id, cb) {
  console.log("ran add list");
  $.ajax({
    method: "post",
    url: "/api/" + listname,
    data: {
      id
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