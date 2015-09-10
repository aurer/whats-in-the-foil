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
  this.render('home');
  this.render('newGameButton', {to: 'header'})
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

Router.route('/games/:_id', function(){
  var data = {};
  data.game = Games.findOne({_id: this.params._id});

  if (!data.game) {
    Router.go('/');
  };

  data.owner = data.game.user_id == Meteor.user()._id;
  data.isOpen = data.game.state == 1;
  data.usersGuess = Guesses.findOne({user_id: Meteor.user()._id, game_id: data.game._id});
  data.winners = Guesses.find({game_id: data.game._id, state: 1});

  this.render('gameView', {
  	data: data
 	});
});
