Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});

Template.gameNew.events({
  'submit .form--gameNew': function(e) {
    e.preventDefault();
    var input = e.target.treat;
    var title = input.value;

    Meteor.call('addGame', {
      title: title,
      user_id: Meteor.user()._id,
      owner: Meteor.user(),
      state: 0,
      created: new Date()
    }, function(error, result){
      if (!error) {
        input.value = '';
        Router.go('/games/' + result);
      };
    });
  }
})

Template.gameView.events({
  'submit .form--guess': function(e) {
    e.preventDefault();
    var input = e.target.guess;
    var guess = input.value;
    var game = Games.findOne({_id: Router.current().params._id});

    Meteor.call('addGuess', this._id, guess, function(error, result){});

    input.value = '';
  },

  'click .end-game': function(){
  	var checkboxes = $('.mark-correct');
    var game_id = this._id;
    var guesses = [];

    checkboxes.each(function(i, item){
      guesses.push({_id: item.value, state: item.checked})
    });

    Meteor.call('closeGame', game_id, guesses);
  },

  'click .reopen-game': function() {
    Meteor.call('openGame', this._id);
  },

  'click .delete-game': function(){
    if (confirm('Are you sure?')) {
      Meteor.call('deleteGame', Router.current().params._id, function(error, result){
        Router.go('/');
      });
    }
  }
})
