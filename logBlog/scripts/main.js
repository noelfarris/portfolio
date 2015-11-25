'use strict';

Parse.initialize("AUPf1KJD34PVFz3JgkNzCUrnfPFyfqjve4mjM0e4", "bnAelwusvxhAEMjgDymNj5od3DxxDPo1KxwYTS9c");
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');

var NavigationComponent = require('./components/navigationComponent');
var RegisterComponent = require('./components/registerComponent');
var LoginComponent = require('./components/loginComponent');
var HomeComponent = require('./components/homeComponent');
var AddPostComponent = require('./components/addPostComponent');
var ViewPostComponent = require('./components/viewPostComponent');
var UserPostComponent = require('./components/userPostComponent');
var FindUserComponent = require('./components/findUserComponent')
var app = document.getElementById('app');

var Router = Backbone.Router.extend({
	routes: {
		'': 'home',
		'register': 'register',
		'login': 'login',
		'register': 'register',
		'addPost': 'addPost',
		'viewPost/details/:id': 'viewPost',
		'userPost/:id': 'userPost',
		'findUserPost/:id': 'findUserPost'
	},
	home: function() {
		ReactDOM.render(<HomeComponent router={r} />, app);
	},
	register: function() {
		ReactDOM.render(<RegisterComponent router={r} />, app);
	},
	login: function() {
		ReactDOM.render(<LoginComponent router={r} />, app);
	},
	addPost: function() {
		ReactDOM.render(<AddPostComponent router={r} />, app);
	},
	viewPost: function(id) {
		ReactDOM.render(<ViewPostComponent router={r} postId={id} />, app);
	},
	userPost: function(id) {
		ReactDOM.render(<UserPostComponent router={r} userId={id} />, app);
	},
	findUserPost: function(id) {
		ReactDOM.render(<FindUserComponent router={r} userId={id} />, app);
	}
})

var r = new Router();
Backbone.history.start();
ReactDOM.render(<NavigationComponent router={r} />, document.getElementById('nav'));