Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});

Template.gameNew.events({
  'submit .form--gameNew': function(e) {
    e.preventDefault();
    var input = e.target.treat;
    var title = input.value;

    var game = Games.insert({
    	title: title,
    	user_id: Meteor.user()._id,
    	state: 1,
    	created: new Date()
    });

    input.value = '';
    Router.go('/games/' + game);
  }
})

Template.gameView.events({
  'submit .form--guess': function(e) {
    e.preventDefault();
    var input = e.target.guess;
    var guess = input.value;
    var game = Games.findOne({_id: Router.current().params._id});

    Guesses.insert({
    	game_id: game._id,
    	guess: guess,
    	user_id: Meteor.user()._id,
    	user_name: Meteor.user().username,
    	state: 0,
    	created: new Date()
    });

    input.value = '';
  },

  'click .end-game': function(){
  	var guesses = $('.mark-correct');
  	if (guesses.length < 1) {
  		alert('Mark at least one person the winner');
  	} else {
  		guesses.each(function(){
        var state = this.checked ? 1 : 0;
        Guesses.update({_id: this.value}, {$set: {state: state}});
  		});
  		// Meteor.call('updateGuessState', correct_guesses, 1);
  		Games.update({_id: Router.current().params._id}, {$set: {state: 2}});
  	}
  },

  'click .delete-game': function(){
    if (confirm('Are you sure?')) {
      var game = Games.findOne({_id: Router.current().params._id});
      Meteor.call('deleteGame');
    }
  }
})
