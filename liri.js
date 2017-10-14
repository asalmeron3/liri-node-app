//Obtains the keys for Twitter and Spotify. These keys are being stores in the file "key.js"

	var allKeys = require("./keys.js");

//We now have the keys. 


//Obtain the user's inputs. The first 2 inputs are resevered for "node" & "liri.js" so, we will splice at index 2.

	var theCommands = (process.argv).splice(2);

	// Run the "CheckTheInput" function with the string-command to know what to do.
	// Since we have spliced the arguments, the command should be in the first position
	checkTheInput(theCommands[0].toLowerCase());

// The magic should have now Happened.


// Now for all the functions...


//------------------Check for the User's Command----------

	// This function determines what the user has entered (or not entered),
	// and executes the appropriate api-function

	function checkTheInput(userInput){
		// Make 5 conditions for knowing which api-request to run. A seperate
		// function will be made for each type of request.

		if(userInput=="my-tweets"){
			twitterBot();
		}
		else if(userInput=="spotify-this-song"){
			spotifyBot();
		}
		else if(userInput=="movie-this"){
			omdbBot();
		}
		else if(userInput=="do-what-it-says"){
			txtBot();
		}
		// If no command was typed in OR if that command did not match the above formats
		// Let the user know via the console AND also log it in the log.txt file
		else {
			userInput = "Invalid command was entered";
			var theUserArgument = "No Action taken";
			userHistory(userInput,theUserArgument);
			console.log("Please enter one of the following commands:  \n 'my-tweets' \n '" +
				"spotify-this-song' \n 'movie-this OR' \n 'do-what-it-says'");
		};	

	}// End of checkTheInput()
// End of Checking user's input/command/request


//----------------------The Twitter Request Function------------------//

	// The function twitterBot() should run when the user has typed "my-tweets"

	function twitterBot(){
		//Based on the twitter node package, we have to set up an object that 
		//contains the user's twitter-username. The property should be "screen_name"
		// and the value should be the username as a string

		var twitter_Username = {screen_name: 'arturosroro'};

		// Before getting the tweets, we have to define a variable that stores
		// the required node package (twitter). This package should also take in the
		// user's twitter-account-keys as a parameter. The parameter is an object and
		// it is obtained by indexing "allKeys" (our imported object of keys)
		var client = require("twitter")(allKeys.twitter);

		// Use the twitter-node-package w/ parameters (stored in "client") to get
		//the user's statuses/timeline. Use the get method to pass the parameters:
		// "statuses/user_timeline", the object that has the username, and callback function
		client.get('statuses/user_timeline', twitter_Username, function(error, tweets_Data, response) {
		  
		  // If no error occurs, loop through the data received and console the text from
		  // the user's last 20 tweets
			if (!error) {

			  	for(i = 0; i <20; i++){
			  		console.log("___________________");
			  		console.log(tweets_Data[i].text);
			  	} //end of twitterBot's for loop

				// Once the tweets have been obtained, run the userHistory function to 
				// log the transaction/command
				userHistory("my-tweets","User's last 20 tweets");
			} 

			else{
			  	console.log(error);
			  	userHistory("my-tweets","An error occured and the tweets could not be obtained");
			}
		});// end of twitterBot's client.get
	}// end of twitterBot()
// End of making the Twitter Request Function


//--------------The Spotify Request Function-----------------------//

	// The function spotifyBot() should run when the user has typed "spotify-this-song"
	
	function spotifyBot(){
		// splice theCommands so that you remove "spotify-this-song" and you are only left 
		// with an array of the song's name. After splicing, join the array into one string.
		// Join with a space in between each element. The result is the song name as one string
		var theSong = theCommands.splice(1).join(" ");

		// If the lenght of the string is 0, then no song was typed/requested so theSong should
		// default to be "The Sign" by Ace of Base
		if (theSong.length ==0){
			theSong = "The Sign Ace of Base";
		}

		// Define a variable that will call the required node package "node-spotify-api"
		var requiredNoation = require('node-spotify-api');
	 	
	 	// Define a variable that will construct a new object (based on the required package)
	 	// The spotify-keys object should be passed as a parameter
		var theSpotifyRequest = new requiredNoation(allKeys.spotify);

		//Use the constructed node-package object to search for the spotify song. The search 
		//method shoud take in an object with the type of search, what is being queried, and
		// the number of results you would like (limit to 1 result)
		theSpotifyRequest.search({type: "track", query: theSong, limit:1})

			//once the request has been completed, use the "then" method to get the data
			.then(function(spotify_Data) {

			 	// Index your data to get the information about the song we searched for
			  	var trackInfo = spotify_Data.tracks.items[0];

			  	console.log("The Artist(s) name: "+ trackInfo.artists[0].name);
			  	console.log("The song name is : "+ trackInfo.name);
			  	console.log("The song is from the '"+ trackInfo.album.name + "' album");

			  	// Check IF there is a link to sample this song. Console the appropriate message
			  	if (trackInfo.preview_url != null){
			  		console.log("A sample of the song can be found here: "+ trackInfo.preview_url);
			  	}
			  	else{
			  		console.log("No sample-link was available for this song :( ");

			  	}

			  	//use the userHistory function to log the command and the name of the song
			  	userHistory("spotify-this-song",theSong);
			})

			// use the "catch" method to catch/display any errors
			.catch(function(theErrorMsg){
			  	console.log(theErrorMsg);
			  	//use the userHistory function to log the command and AN error message
			  	userHistory("spotify-this-song","An error occured and no song was queried");
			})
		// End of theSpotifyRequest  
	}//End of the spotifyBot()
//End of composing the spotify api request function


//------------------The OMDB request Function ------------------------
	
	// The function omdbBot() should run when the user has typed "movie-this"
	function omdbBot(){

		// splice theCommands so that you remove "movie-this" and you are only left 
		// with an array of the movie's name. After splicing, join the array into one string.
		// Join with a plus sign "+" in between each element. The result is one 
		// appropriately-syntaxed string for omdb to query
		var theMovie = theCommands.splice(1).join("+");

		// If the lenght of the string is 0, then no movie was typed/requested so 
		// theMovie should default to be "Mr.Nobody", which is an OK movie. Too lovey-dovey tho
		if (theMovie.length ==0){
			theMovie = "Mr.Nobody";
		}
		
		// Define a variable that will contain a string-value of the omdb-api URL. The
		// URL should contain theMovie, the api key, and should request the short plot
		var queryUrl = "http://www.omdbapi.com/?t=" + theMovie + "&y=&plot=short&apikey=40e9cece";

		// Define a variable that will call the required node package "request" to query omdb
		var omdbRequest = require("request");

		// Use your node package "request"; it should take in the URL to search the api
		// and should take in a callback function
		omdbRequest(queryUrl,function(errorMesage, response, body){

			// If an error occurs, log it in the history and in the console
			if(errorMesage) {
	        	userHistory("movie-this", "An error occurred and no movie info was obtained");
	        	return console.error(errorMesage);
	    	}
	 		
	 		// If no movie was found, log it in the history and in the console
	    	else if(body.length < 1) {
	    		userHistory("movie-this", theMovie.split("+").join(" ") + "could not be found");
	        	return console.log(theMovie.split("+").join(" ") + "could not be found");
	    	}

	    	// If the movie is found, parse the "body" received from the request.
	    	// "body" is currently a long string and need to be an object in order 
	    	// to index and retrieve the data we need.
	    	else{
	    		var movie_data = JSON.parse(body);
	    		console.log("-----------------------");
	    		console.log("Title of the movie: " + movie_data.Title);
				console.log("The year movie was released: " + movie_data.Released);
				console.log("IMDB Rating: " + movie_data.imdbRating);
				console.log("Rotten Tomatoes Rating: " + movie_data.Ratings[1].Value);
				console.log("Filmed in: " + movie_data.Country);
				console.log("Language: " + movie_data.Language);
				console.log("Plot: " + movie_data.Plot);
				console.log("Actors:  " + movie_data.Actors);

				// Log the command and the movie the user searched. Since we joined the movie
				// name with plus signs "+" for the URL, let's split at all the plus signs and
				// then rejoin the movie name with spaces " "
				userHistory("movie-this", theMovie.split("+").join(" "));

	    	}
	   
	    }); //end of omdbRequest
	}// End of omdbBot() function
// End of composing the omdb api request function

// ------------The Txt Bot for performing a command from a txt file---------------
	
	// The txtBot() function reads a text file to retrieved the commands for requesting
	// the api information/what-nots

	function txtBot(){

		// Define a variable the requires the node-package "fs"
		var fsReading = require("fs");

		// Use your required package to take in the name of the file to read,
		// take in the way the file is written ("utf8"), and a callback function
		fsReading.readFile("random.txt","utf8",function(error,fileData){

			// If you get an error, log in the log.txt file and in console
			if(error){
				console.log(error);
				userHistory("do-what-it-says", "An error occurred when reading the text file");
			}
			else{

				// replace "theCommands" with the data from the text file. The data will be
				// retrieved as ONE comma-separated string; split at the comma to make it
				// into an array.
				theCommands  = fileData.split(",");

				// Index the array of commands to run the function checkTheInput
				checkTheInput(theCommands[0]);

				// Log the entered commands into the log.txt file. This will be slightly
				// different to let the user see/know that the random.txt file had its own
				// commands to run
				userHistory("do-what-it-says", "in the ranomd.txt file -->");
			}

		}) // end of reading the txt file
	} // End of txtBot() function
// End of composing the logging function


// ------------- Logging the User's History/Commands -------------
	
	// userHistory takes in two variables to log into the log.txt file

	function userHistory(whatTheUserDid,whatUserSearchedFor){

		// Define a variable the requires the node-package "fs"
		var fsAppending = require("fs");

		// Define a variable that formats one string to log. The string should include
		// the two inputs that were given to this function
		var theLog = " \n\ "+ whatTheUserDid + " : "+ whatUserSearchedFor + ",";

		// Use your required package to append the string to log.txt file
		fsAppending.appendFile("log.txt", theLog, function(anotherError){

			// Log an error in the console, if one were to occur
			if (anotherError){
				console.log(anotherError);
			}
		})// End of appending to the text file
	}
// End of composing the text-logging function