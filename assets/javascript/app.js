
//array of initial GIF topics
var topics = [
    "philadelphia eagles",
    "new york jets",
    "super bowl",
    "dallas cowboys",
    "nfl",
    "tom brady",
    "dallas sucks",
    "football fail",
    "eagles fans",
    "fumble"
]


function showButtons()
{
    $("#fbButtonsView").empty();
    $("#gifClick").hide();
    //create button for each element in topics array
    for (var i = 0; i < topics.length; i++)
    {
        var but =  $("<button>"); //create string with <button>
        but.addClass("gif"); //adding class of GIF to button
        but.attr("data-name", topics[i]); //adding data attribute
        but.text(topics[i]); //add button text
        $("#fbButtonsView").append(but); //add new button to div
    }
}


$("#add-gifs").on("click", function(event) {
 
    event.preventDefault();

    //grab type fron input box, trim off any outer spaces
    var gifType = $("#form-input").val().trim();
    
    // //replace spaces with + in search term
    // gifType.replace(" ", "+");

    //clear out input box
    $("#form-input").val("");

    if (gifType.length > 0){
       //add new gif type to our array
        topics.push(gifType);

        //call fucntion to display all buttons
        showButtons(); 
    }
  

});


function displayGifs()
{
    //cleart previous gifs displayed
    $("#footballGifs").empty();

    $("#gifClick").show();

    // Grabbing and storing the data-animal property value from the button
    var searchQuery = $(this).attr("data-name");
    //replace spaces with + in search term
    searchQuery.replace(" ", "+");

    // Constructing a queryURL using the animal name

      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchQuery + "&api_key=dc6zaTOxFJmzC&limit=10";

      console.log(queryURL);

    // Performing an AJAX request with the queryURL
    $.ajax({
        url: queryURL,
        method: "GET"
      })
      // After data comes back from the request
      .done(function(response) {
    
    
        // storing the data from the AJAX request in the results variable
        var results = response.data;

        // Looping through each result item
        for (var i = 0; i < results.length; i++) {

          // Creating and storing a div tag
          var gifDiv = $("<div>");

          // Creating a paragraph tag with the result item's rating
          var p = $("<p>").text("Rating: " + results[i].rating);

          // Creating and storing an image tag
          var gifImage = $("<img>")

          // Setting the attributes of the gif before displaying
          gifImage.attr("src", results[i].images.original_still.url);
          gifImage.attr("data-still", results[i].images.original_still.url);
          gifImage.attr("data-animate", results[i].images.original.url);
          gifImage.attr("data-state", "still");
          gifImage.attr("class", "gifAdded");
        
          // Appending the paragraph and image tag to the animalDiv
          gifDiv.append(p);
          gifDiv.append(gifImage);

          // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
          $("#footballGifs").prepend(gifDiv);
        }
      

      $(".gifAdded").on("click", function(event) {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }

        });
    });

  };

 


  //call function to show intitial buttons on page load
  showButtons();
  // Adding click event listen listener to all buttons
  $(document).on("click", ".gif", displayGifs); 

