# Liri-Node-App 

### Description
```
  This node application (liri.js) runs from the command terminal. You must specify 
  one of four commands for the application to run:

    1. "my-tweets"
    2."spotify-this-song"
    3. "movie-this"
    4. "do-what-it-says"

```
- - -
### "my-tweets"
  1. This command will log the user's last 20 tweets in the command terminal. 
  2. The function uses:
      * The "twitter" node package
      * The user's twitter tokens/keys
  3. The command will also be logged into the log.txt file
- - -

### "spotify-this-song"
  1. This command can be used as is, or can be followed by a song's name 
    * If it is NOT followed by a song name, the function will query/console information on "The Sign" by Ace of Base
    * If it IS followed by a song name, the function will query/console information on the song entered
  2. The song information returned is:
    * Artist's Name
    * The Song Name
    * The Album Name
    * A link to sample the song (if available)
  3. The command will also be logged into the log.txt file
- - -

### "movie-this"
  1. This command can be used as is, or can be followed by a movie name 
    * If it is NOT followed by a song name, the function will query/console information on the movie "Mr.Nobody"
    * If it IS followed by a movie name, the function will query/console information on that movie
  2. The song information returned is:
    * The title of the movie
    * The year the movie was realeased
    * The IMDB Rating
    * The Rotten Tomatoes Rating
    * The Countries the movie was filmed in
    * The Language the movie was originally filmed in
    * A short plot of the movie
    * The actors in the movie
  3. The command will also be logged into the log.txt file
- - -

### "do-what-it-says"
  1. This command will read the random.txt file and extract the instructions to perform one of the above commands
  2. The User's and the random.txt file's commands will both be logged into the log.txt file
- - -

### Notes
  * If no command is entered or if entered incorrectly, the user will be told (via the console) to correctly type in an appropritate command.

- - -

### System Requirements

You will need the following:
  * Node_modules
  * twitter (node package)
  * node-spotify-api (node package)

- - -

### Creator: Arturo Salmeron
**Date: October 14, 2017**