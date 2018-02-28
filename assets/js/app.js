var topics = ["dinosaurs", "lizards", "unicorns", "dragons", "sharks"];

function clearField() {
  $("#animal-input").val("");
}

function createButtons() {
  for (var i = 0; i < topics.length; i++) {
    $("<button>")
      .attr("id", topics[i])
      .attr("animal-data", topics[i])
      .text(topics[i])
      .appendTo("#animalButtons");
  }

  $("#addAnimal").on("click", function() {
    event.preventDefault();

    var animalInput = $("#animal-input").val();
    topics.push(animalInput);

    $("<button>")
      .attr("id", topics[i])
      .attr("animal-data", topics[i])
      .text(topics[i])
      .appendTo("#animalButtons");
    console.log(animalInput);
    console.log(topics);

    clearField();
  });
}
createButtons();

$("button").on("click", function() {
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
      var gifDiv = $("<div class='item'>");

      var rating = results[i].rating;

      var p = $("<p>").text("Rating: " + rating);

      var animalImage = $("<img>");
			animalImage.attr("src", results[i].images.fixed_height.url);
			animalImage.attr("data-state", "animate");

      gifDiv.prepend(p);
      gifDiv.prepend(animalImage);

      $("#animals").prepend(gifDiv);
    }
  });
});

$(".item").on("click", function() {
  var state = $(this).attr("data-state");
  if (state === "still") {
    $(this).attr("data-state", "animate");
    $(this).attr("src", $(this).attr("data-animate"));
  } else if (state === "animate") {
    $(this).attr("data-state", "still");
    $(this).attr("src", $(this).attr("data-still"));
  }
});
