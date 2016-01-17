/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var ajax = require('ajax');
var UI = require('ui');

var main = new UI.Card({
  title: 'Hockey Games',
  body: 'Loading Games...',
  bodyColor: '#3F51B5',
  titleColr: '#1A237E'
});

main.show();

var URL = 'http://www.nicetimeonice.com/api/seasons/20152016/games';
var games = [];

// Download data
ajax({url: URL, type: 'json'},
  function(json) {    
    for (i = 0; i < json.length; i++) {
      // Add to only show games today and later
      games.push({title: json[i].homeTeam + ' @',
                  subtitle: json[i].awayTeam + '',
                  date: json[i].date })
      if (i == 19) {
        i = json.length;
      }
    }
    
    var hockerGamesList = new UI.Menu({
      sections: [{
        title: 'Hockey Games',
        items: games
      }]
    });
    
    hockerGamesList.on('select', function(event) {
      // Show a card with clicked item details
      var detailCard = new UI.Card({
        title: games[event.itemIndex].title,
        body: games[event.itemIndex].subtitle + '\n' + games[event.itemIndex].date,
        bodyColor: '#3F51B5' ,
        titleColor: '#1A237E'
      });

      // Show the new Card
      detailCard.show();
    });
    
    // Show the list of hockey games
    hockerGamesList.show();
    main.hide();
  },
  function(error) {
    console.log('Ajax failed: ' + error);
  }
);
