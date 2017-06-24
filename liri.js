//Client keys
var keys = require('./keys.js');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var inquirer = require('inquirer');
var request = require('request');
var fs = require('fs');
var input = process.argv[2];
var searchTerm = process.argv[3]

//Functions that grab data based on user input
var  lookup = {
	//Grabs last 20 tweets from test account
	mytweets: function (){
		// console.log("my tweets");
		var client = new Twitter(keys.twitterKeys);
		var params = {screen_name: 'bshafieitest'};
		client.get('statuses/user_timeline', params, function(error, tweets, response) {
  			if (!error) {
				for (var i=0; i<tweets.length; i++){
					console.log("\n--------------------\n");
					console.log(tweets[i].created_at);
					console.log(tweets[i].text);
					console.log("\n--------------------\n");
				}
 			}
		});
	},
	
	spotifyThisSong: function (){
		var spotify = new Spotify(keys.spotifyKeys);
		spotify.search({ type: 'track', query: searchTerm, limit: 1 }, function(err, data) {
  			if (err) {
    			return console.log('Error occurred: ' + err);
  			} 
			var artist = data.tracks.items[0].album.artists[0].name;
			var songName = data.tracks.items[0].name;
			var link = data.tracks.items[0].external_urls.spotify;
			var album = data.tracks.items[0].album.name;
			console.log("Song: " + songName);
			console.log("By: " + artist);
			console.log("URL: " + link);
			console.log("Album: " + album);
		});
	},

	movieThis: function (){
		
	},

	doWhatItSays: function (){
		
	},
	
}
//Processing user input
switch (process.argv[2]) {
		case "my-tweets":
			lookup.mytweets();
			break;
		case "spotify-this-song":
			lookup.spotifyThisSong();
			break;
		// case "movie-this":
		// 	var movieName = process.argv[3];
		// 	lookup.movieThis(movieName);
		// 	break;
		// case "do-what-it-says":
		// 	lookup.doWhatItSays();
		// 	break;	
		// default:
		// console.log("Choose a valid option");
		// 	break;
	}