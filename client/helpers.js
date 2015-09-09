Template.games.helpers({
	activeGames: function () {
    return Games.find({state: 1});
  },
  inactiveGames: function () {
    return Games.find({state: 2});
  }
})

Template.guesses.helpers({
	guesses: function() {
		var game_id = Router.current().params._id;
		var guesses = Guesses.find({$and: [
			{game_id: game_id},
			{user_id: {$ne: Meteor.user()._id}}
		]});
		return guesses;
	}
})
