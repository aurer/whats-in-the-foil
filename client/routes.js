Router.onBeforeAction(function () {
  if (!Meteor.userId()) {
    this.layout('loginLayout');
    this.render('login',{
    	data: function() {
    		return {title: 'Login'};
    	}
    });
  } else {
    this.next();
  }
});

Router.configure({
  layoutTemplate: 'appLayout'
});

Router.route('/', function(){
  Meteor.subscribe('games');

  this.render('gameList', {
    data: function(){
      return {
        activeGames: function () {
          return Games.find({state: 0});
        },
        inactiveGames: function () {
          return Games.find({state: 1});
        }
      }
    }
  });
  this.render('newGameButton', {to: 'header'});
});

Router.route('/games', function(){
	this.redirect('/');
});

Router.route('/games/new', function(){
	var cake = randomCake();
  this.render('gameNew', {
  	data: {
  		placeholder: cake
  	}
  });
});

Router.route('/games/:id', function(route){
  Meteor.subscribe('game', this.params.id);
  Meteor.subscribe('users');
  Meteor.subscribe('guesses');

  this.render('gameView', {
    data: function(){
      var game = Games.findOne(this.params.id);
      if (game) {
        game.isOwner = game.owner._id == Meteor.userId();
        game.guesses = Guesses.find({ game_id: game._id, "user._id": {$ne: Meteor.userId()} } );
        game.yourGuess = Guesses.findOne({ game_id: game._id, "user._id": Meteor.userId() });
        game.winners = Guesses.find({ game_id: game._id, state: 1 });
        return game;
      }
    }
  });
});
