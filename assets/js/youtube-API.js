


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
      
      
        var resultDiv = $("#vresults");
        var titles = results[0].snippet.title;
        var videoIds = results[0].id.videoId;
        var videoURL = "https://www.youtube.com/watch?v=" + videoIds;
        var p = $("<p>").text("Video ID: " + videoIds);
        var q = $("<p>").text(titles);
  
        
        
        resultDiv.append("<a href='" + videoURL + "'class='button button-highlight button-pill button-tiny'>'" + "YouTube Video "+ "'</a>");
        

        
        
        $(".button-pill").on("click", function(e){
          e.preventDefault();
          href = videoURL;
          window.open(videoURL, videoIds, '_blank');
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
