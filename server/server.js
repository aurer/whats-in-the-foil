Meteor.publish('games', function(){
	return Games.find({});
})

Meteor.publish('game', function(id){
	return Games.find(id);
})

Meteor.publish('users', function(){
	return Meteor.users.find({});
})

Meteor.publish('guesses', function(){
	return Guesses.find({});
})

Meteor.methods({
	'addGame': function(game) {
		return Games.insert(game);
	},

	'addGuess': function(game_id, guess) {
		return Guesses.insert({
			game_id: game_id,
			guess: guess,
      user: Meteor.user(),
      state: 0,
      created: new Date()
		});
	},

	'deleteGame': function(id) {
		Games.remove({_id: id});
		Guesses.remove({game_id: id});
	},

	'closeGame': function(id, winners){
		_.each(winners, function(item){
      return Guesses.update(item._id, {$set: {state: item.state}});
		});
		Games.update(id, {$set: {state: 1}});
	},

	'openGame': function(id) {
		return Games.update(id, {$set: {state: 0}});
	}
})
