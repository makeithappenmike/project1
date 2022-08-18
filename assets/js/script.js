var modalButtonEl = $('#modal-button');
var citySearchBtn = $('#citySearchBtn');
var citySearchInput = $('#cities-autocomplete');
var city;

// These are used in Marvel.js, Characters.html, and Profile.html
var statusCode;
var characterName;
// var targetClass;
var numComics;
var characterDescription;
var profileImage;
var backButton = $('.backButton');
// console.log("image url", profileImage);

// Get character info from Marvel
function getCharacter(characterName) {
  var characterUrl = "https://gateway.marvel.com/v1/public/characters?hash=5ad57e2950ad170a8c45b38ddb6b3b01&ts=string&name=" + characterName + "&apikey=72b7c45c60389c825df0845f4afd3c85";

  return fetch(characterUrl)
  .then((characterResponse) => {
      return characterResponse.json();
  })
  .then((characterResponse) => {
      // var code = characterResponse.code;
      characterName = characterResponse.data.results[0].name;
      numComics = characterResponse.data.results[0].comics.available;
      characterDescription = characterResponse.data.results[0].description;
      profileImage = characterResponse.data.results[0].thumbnail.path + "." + characterResponse.data.results[0].thumbnail.extension;
      console.log("image url", profileImage);

      // console.log("Code:", statusCode);
      console.log("Name:", characterName);
      // console.log("#Comics:", numComics);
      // console.log("Desc:", characterDescription);
      $(document).ready(function(){
        // $(".thor").css("background-image", "url(" + profileImage + ")");
        // $(".thor").attr("src", profileImage);
        // var passClass = "." + characterName.toLowerCase();
        $("." + characterName.toLowerCase() + "BoxImage").attr("src", profileImage);
        // console.log("test", passClass);
        // console.log($(".profileImage").css("background-image", "url(" + profileImage + ")"));
        $(".profileTitle").html(characterName.toUpperCase());
        $(".characterDescription").html(characterDescription);
        $(".numComics").html(numComics);
      });
  })
  .catch(error => console.log('error', error));
    
};

getCharacter("thor", "thorBoxImage");
getCharacter("groot", "grootBoxImage");
getCharacter("hulk", "hulkBoxImage");

// // Get profile images for all characters
// function getImages() {
// $(".hulk").attr("src", profileImage);
// }; getImages();


function autoFilling() {
    var input = document.getElementById("cities-autocomplete");
    var autocomplete = new google.maps.places.Autocomplete(input);
}


modalButtonEl.on('click', function() {
  console.log("modal will pop up");

  var target = $(this).data("target");
  $(".modal").addClass("is-active");

} );

$(".model-close").click(function() {
  console.log("closed modal")
 
  $(".modal").removeClass("is-active");
})

citySearchBtn.on('click', function() {
  city = citySearchInput.val();
  console.log(city);
  citySearchInput.val('');
  window.location.replace("./characters.html");
})

backButton.on('click', function() {
  console.log(city);
  window.location.replace("./characters.html");
})

// These need to be passed into functions? All were on characterpage.js ==> consolodating!
var changeCityBtn = $('#changeCity');
console.log("city", city);
changeCityBtn.val(city);

// Handle change city button on character and profile pages
$(".changeCityButton").click(function (event) {
    console.log("click");
});

// Handle click function on character images
$(".characterBox").click(function (event) {
    console.log("click");
});

// Handle redirect to profile on click
$(".characterBox").click(function (event) {
    var characterClicked = event.currentTarget.classList[1];
    console.log(characterClicked);
    window.location.replace("./profile.html");
});

// Get character info from Characters.json
var favThing;
var favMeal;
var hobbies;
var somethingToEat;
var somethingToDo;
var readMore;
// var city = "{CITY}"

function getCharacterInfo() {
    var characterInfoUrl = "assets/json/characters.json";
    // console.log("Getting Characters");

    return fetch(characterInfoUrl)
    .then((characterInfoResponse) => {
        return characterInfoResponse.json();
    })
    .then((characterInfoResponse) => {
        // console.log(characterInfoResponse);
        favThing = characterInfoResponse[3]["Character"];
        favMeal = characterInfoResponse[3]["Food"];
        hobbies = characterInfoResponse[3]["Hobby"];
        somethingToEat = characterInfoResponse[3]["Restaraunts"];
        somethingToDo = characterInfoResponse[3]["Place"];
        readMore = characterInfoResponse[3]["ReadMore"];
        // console.log(somethingToEat.join(', '));

        $(".city").html(city);
        $(".favThing").html(favThing);
        $(".favMeal").html(favMeal);
        $(".hobbies").html(hobbies.join(', '));
        $(".toEat").html(somethingToEat.join(', '));
        $(".toDo").html(somethingToDo.join(', '));
        $(".readMore").attr("href", readMore)
        $(".changeCityButton").click(function (event) {
            console.log("click");
        });
        

    })
    .catch(error => console.log('error', error));
      
} getCharacterInfo();

