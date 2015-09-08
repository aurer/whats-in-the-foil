Games = new Meteor.Collection("games", {
	transform: function (doc) {
		doc.owner = Meteor.users.findOne({_id: doc.user_id});
		doc.guesses = Guesses.find({game_id: doc._id});
		doc.winners = Guesses.find({game_id: doc._id, state: 1});
		doc.active = doc.state == 1;
		return doc;
	}
});

Guesses = new Meteor.Collection("guesses", {
	transform: function (doc) {
		doc.correct = doc.state == 1;
		return doc;
	}
});
