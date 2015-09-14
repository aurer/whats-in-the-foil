Games = new Meteor.Collection("games", {
	transform: function (doc) {
		doc.active = doc.state == 0;
		return doc;
	}
});

Guesses = new Meteor.Collection("guesses", {
	transform: function (doc) {
		doc.correct = doc.state == 1;
		doc.game = Games.findOne({_id: doc.game_id});
		return doc;
	}
});
