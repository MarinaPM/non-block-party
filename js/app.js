App = Ember.Application.create({});

App.ApplicationRoute = Ember.Route.extend({
  setupController: function(controller) {
    // `controller` is the instance of ApplicationController
    controller.set('title', "A/NB standups");

  },

});

App.ApplicationController = Ember.Controller.extend({
  appName: ''
});

App.ApplicationView = Ember.View.extend({
      templateName: 'application',
      message : 'Hello message'

    });



App.Router.map(function() {
  this.route('dashboards', { path: '/' });
  //this.resource('dashboard');  //, { path: '/dashboard/:status_id' }

  this.resource('dashboard', { path: '/dash/:status_id' });
  //this.resource('dashboards');

  this.resource('posts', function() {
    this.resource('post', { path: ':status_id' });
  });

});


App.PostsRoute = Ember.Route.extend({
  model: function() {
    return App.Post.find();
  }
});

App.DashboardRoute = Ember.Route.extend({
  model: function(params) {
    //console.log(this);
    return App.Post.find(params.status_id);
  }
});



App.statuses = Ember.Object.create({
  selected: 'green',
  content:  ["green", "yellow", "red"]
});

App.DashboardController = Ember.Controller.extend({
  igor: 'yo!',
  viewMode: 'table',

  // true if we're viewing the table mode
  viewingTable: function() {
    alert('bar');
    return this.get('viewMode') === 'table';
  }.property('viewMode'),

 
  // true if we're viewing the bar chart mode
  viewingBarChart: function() {

    return this.get('viewMode') === 'barChart';
  }.property('viewMode'),

  // Changes the current view mode to 'table'
  viewAsTable: function() {
    this.set('viewMode', 'table');
    this.set('igor', 'TTTtable');
  },

  // Changes the current view mode to 'barChart'
  viewAsBarChart: function() {
    this.set('viewMode', 'barChart');
     this.set('igor', 'BBBB');

  }

});

StatusFormView = Ember.View.extend({
  templateName: 'createStatus'
});

App.DashboardsController = Ember.Controller.extend({
  test: "success",
  createPost: function () {

    var status = this.get('status');
    console.log(this.get('status'));
    console.log(this.get('today'));
    console.log(this.get('tomorrow'));
    // Get the todo title set by the "New Todo" text field
    //var status = this.get('status');
    //if (!status.trim()) { return; }

   //var transaction = this.get('store').transaction();
   // console.log(transaction);



    // Create the new Todo model
    var post = App.Post.createRecord({
      
      status: this.get('status'),
      questions: this.get('questions'),
      today: this.get('today'),
      tomorrow: this.get('tomorrow'),
      user: "My control user",
      publishedAt: new Date('06-22-2013')
    });

  
    //console.log(post.status);
    // Save the new model
    post.get('transaction').commit()
    //post.save();



    this.transitionToRoute('posts');

  },

  clearPost: function () {
    alert('reset');
  }  

});



App.Store = DS.Store.extend({
revision: 12,
adapter: 'DS.FixtureAdapter'
});


var attr = DS.attr;

App.Post = DS.Model.extend({
  status: attr('string'),
  user: attr('string'),
  today: attr('string'),
  tomorrow: attr('string'),
  questions: attr('string'),
  publishedAt: attr('date')
});

var showdown = new Showdown.converter();

Ember.Handlebars.registerBoundHelper('markdown', function(input) {
  return new Handlebars.SafeString(showdown.makeHtml(input));
});

Ember.Handlebars.registerBoundHelper('date', function(date) {
  return moment(date).fromNow();
});

App.Post.FIXTURES = [{
id: 1,
status: "green",
user: "Igor",
publishedAt: new Date('05-15-2013'),
today: "Working on important stuff",
tomorrow: "Tomorrow is another day",
questions: "Have few questions",
},
{
id: 2,
status: "yellow",
user: "Igor",
publishedAt: new Date('05-16-2013'),
today: "Working on another important stuff",
tomorrow: "Tomorrow is a day",
questions: "Have no questions",
}];