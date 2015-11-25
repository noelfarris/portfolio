var React = require('react');
var PostModel = require('../models/postModel')

module.exports = React.createClass({

	getInitialState: function() {
	    return ({
	        posts: null

	    });
	},
	componentWillMount: function() {
	      var query = new Parse.Query(PostModel);
	      query
	      .get(this.props.postId)
	      .then(
	      	(posts) => {
	      		console.log(posts);
	      		this.setState({posts: posts});
	      	},
	      	(err) => {
				console.log(err);
			}
	      	);
	},

	render: function() {
		var content = <div>loading...</div>;

		if(this.state.posts) {
		return (
				<div className='container'>
					<div className='row'>
					<h3>{this.state.posts.get('title')}</h3>
					</div>
					<div className='row'>
					<div>{this.state.posts.get('category')} </div>
					</div>
					<div className='row'>
					<img src={this.state.posts.get('photo').url()} />
					</div>
					<div className='row'>
					<p>{this.state.posts.get('post')}</p>
					</div>
					<div className='row'>
					<div>Posted by {this.state.posts.get('user').get('firstName')} {this.state.posts.get('user').get('lastName')}</div>
					</div>
					<div className='row'>
					<div>{this.state.posts.get('createdAt').toString()}</div>
					</div>
				</div>

		)};
		
		return (
			<div className="container">
				{content}
			</div>
		);
	}
	
});