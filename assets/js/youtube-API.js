


$("#add-V").on("click", function(e){
  e.preventDefault();
  var video = $("#v-input").val();

  var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + 
  video + "&type=video&key=AIzaSyDUCh8h4KhjDpzDmGOSdJOLxtDdzR8Swhs";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response){
    console.log(response)
    
    var results = response.items;
    
    for (var i = 0; i < results.length; i++){
      var resultDiv = $("#vresults");
      var titles = results[i].snippet.title;
      var videoIds = results[i].id.videoId;
      var videoURL = "https://www.youtube.com/watch?v=" + videoIds;
      var p = $("<p>").text("Video ID: " + videoIds);
      var q = $("<p>").text(results[i].snippet.title);
      var width = "400px";
      var height = "300px";
      
      resultDiv.append(q);
      resultDiv.append("<a href='" + videoURL + "'class='button button-highlight button-pill button-large'>'" + "YouTube Video "+ "'</a>");
      
      };
      
      
      $(".button-pill").on("click", function(e){
        e.preventDefault();
        window.open(videoURL, '_blank');
      });
    });
    


  });



  var config = {
    apiKey: "AIzaSyAbgpedcMjLL0k9gD1GnA6LEiM8TUaR_TA",
    authDomain: "group-pro-40318.firebaseapp.com",
    databaseURL: "https://group-pro-40318.firebaseio.com",
    projectId: "group-pro-40318",
    storageBucket: "group-pro-40318.appspot.com",
    messagingSenderId: "837788682027"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var support = 0;
  var unsupport = 0;
  var buttonClicked = 0;

  $("#support").on("click", function(e){
    e.preventDefault();
    support++;
    database.ref().update({
      supportNum: support
    })
  })

  $("#unsupport").on("click", function(event){
    event.preventDefault();
    unsupport++;
    database.ref().update({
      unsupportNum: unsupport
    })
  })

  database.ref().on("value", function(snapshot) {
    console.log(snapshot.val());
    $("#supportNum").text("We have received: " + snapshot.val().supportNum + " supports!!!!");
    support = snapshot.val().supportNum;
    unsupport = snapshot.val().unsupportNum;
  }, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
