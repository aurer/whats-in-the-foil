Template.guesses.helpers({
	guessOwner: function() {
		return Meteor.userId() == this.user._id;
	},

	hasGuesses: function(){
		if (this.guesses) {
			return this.guesses.count() > 0;
		} else {
			return true
		}
	}
})

Template.gameView.helpers({
	isAdmin: function() {
		return Meteor.user().username.toLowerCase() == 'phil';
	}
})
