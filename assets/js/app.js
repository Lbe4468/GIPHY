$(function() {
  // create array to store animals
  var topics = ["DINOSAURS", "LIZARDS", "UNICORNS", "DRAGONS", "SHARKS"];
  // call function to create buttons from array items
  createButtons();
  // function to clear input field after submit
  function clearField() {
    $("#animal-input").val("");
  }
  // function to create buttons from array items
  function createButtons() {
    $("#animalButtons").empty();
    // loop for array items
    for (var i = 0; i < topics.length; i++) {
      $("<button>")
        .attr("id", topics[i])
        .attr("animal-data", topics[i])
        .text(topics[i])
        .appendTo("#animalButtons");
    }
  }
  // function to add text from input field to array upon submit click
  $("#addAnimal").on("click", function(event) {
    event.preventDefault();
    var animalInput = $("#animal-input")
      .val()
      .trim();
    topics.push(animalInput);
    console.log(topics);
    clearField();
    createButtons();
  });
  // function and ajax call to pull gif results upon button click and assign designated attributes to results and add images to HTML
  $(document).on("click", "button", function() {
    $("#animals").empty();
    var animals = $(this).attr("animal-data");
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      animals +
      "&api_key=dc6zaTOxFJmzC&limit=100";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      var results = response.data;
      for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div class='col-sm'>");
        var rating = results[i].rating;
        var p = $("<p class='container'>").text("Rating: " + rating);
        var animalImage = $("<img>");
        animalImage.attr("src", results[i].images.fixed_height_still.url);
        animalImage.attr(
          "data-still",
          results[i].images.fixed_height_still.url
        );
        animalImage.attr("data-animate", results[i].images.fixed_height.url);
        animalImage.attr("data-state", "still");
        animalImage.attr("class", "gif");
        gifDiv.prepend(p);
        gifDiv.prepend(animalImage);
        $("#animals").prepend(gifDiv);
      }
    });
  });
  // function that changes gif from still to animated version upon click
  $("#animals").on("click", ".gif", function() {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("data-state", "animate");
      $(this).attr("src", $(this).attr("data-animate"));
    } else if (state === "animate") {
      $(this).attr("data-state", "still");
      $(this).attr("src", $(this).attr("data-still"));
    }
  });
});
