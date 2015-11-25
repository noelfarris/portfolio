var React = require('react');
var PostModel = require('../models/postModel');
// var image = require('../../images/bgimage.png');

module.exports = React.createClass({
	getInitialState: function() {
		return { error: null };
	},
	render: function() {
		var errorElement = null;
		if(this.state.error) {
			errorElement = (
				<p className="red">{this.state.error}</p>
			);
		}
		return (
			<div className="container">
				<div className="row">
					<form className="col s12" onSubmit={this.onAddPost}>
						<h1>Add Post</h1>
						{errorElement}
						<div className="row">
							<div className="file-field input-field">
      							<div className="btn">
        							<span>Your Photo</span>
        							<input type="file" ref="profilePhoto" />
      							</div>
      							<div className="file-path-wrapper">
       	 							<input className="file-path validate" type="text" ref="filePath" />
      							</div>
    						</div>
							<div className="input-field col s12">
								<input type="text" ref="title" className="validate" />
								<label>Title</label>
							</div>
						</div>
						<div className="row">
							<div className="input-field col s12">
								<textarea id="textarea1" ref="post" className="materialize-textarea"></textarea>
								<label>Post</label>
							</div>
						</div>
						<div className="row">
							<div className="input-field col s6">
								<input type="text" ref="category" className="validate" />
								<label>Category</label>
							</div>
						</div>
						<div className="row">
							<button className="waves-effect waves-light btn">Add Post</button>
						</div>
					</form>
				</div>
			</div>
		);
	},
	onAddPost: function(e) {
		e.preventDefault();
		console.log(this.refs.filePath.value);
		var file = this.refs.profilePhoto.files[0];
  		var name = "photo.jpg";
  		var parseFile;
  		this.refs.filePath.value = '' ? parseFile = null : parseFile = new Parse.File(name, file);

  		// console.log(typeof parseFile);
		var newPost = new PostModel({
			title: this.refs.title.value,
			post: this.refs.post.value,
			category: this.refs.category.value,
			user: Parse.User.current(),
			photo: parseFile
		});
		newPost.save();
		this.props.router.navigate('', {trigger: true});
	}
});