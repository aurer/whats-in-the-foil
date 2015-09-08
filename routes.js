Router.onBeforeAction(function () {
  if (!Meteor.userId()) {
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
  layoutTemplate: 'app'
});

Router.route('/', function(){
  this.render('home');
});

Router.route('/games', function(){
	Router.go('/');
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
  data.owner = data.game.user_id == Meteor.user()._id;
  data.isOpen = data.game.state == 1;
  data.usersGuess = Guesses.findOne({user_id: Meteor.user()._id, game_id: data.game._id});
  data.winners = Guesses.find({game_id: data.game._id, state: 1});

  this.render('gameView', {
  	data: data
 	});
});
