Meteor.methods({
	'deleteGame': function(id) {
		Games.remove({_id: id});
		Guesses.remove({game_id: id});
	}
})
