App.IndexController = Ember.Controller.extend({
  gamesBinding: 'App.games',
  gameData: {
    title: '',
    descr: '',
    maxPlayers: 8,
    ladder: 1
  },
  sendingRequest: false,
  chatMessages: [],
  renderPlayerList: true
});