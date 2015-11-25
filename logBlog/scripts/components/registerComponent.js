var React = require('react');

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
					<form className="col s12" onSubmit={this.onRegister}>
						<h1>Register</h1>
						{errorElement}
						<div className="row">
							<div className="file-field input-field">
      							<div className="btn">
        							<span>Your Photo</span>
        							<input type="file" ref="profilePhoto" />
      							</div>
      							<div className="file-path-wrapper">
       	 							<input className="file-path validate" type="text" />
      							</div>
    						</div>
							<div className="input-field col s12">
								<input type="text" ref="firstName" id="firstName" />
								<label htmlFor="first_name">First Name</label>
							</div>
							<div className="input-field col s12">
								<input type="text" ref="lastName" id="lastName" />
								<label htmlFor="last_name">Last Name</label>
							</div>
							<div className="input-field col s12">
								<input type="text" ref="email" className="validate" id="email_address" />
								<label htmlFor="first_name">Email Address</label>
							</div>
						</div>
						<div className="row">
							<div className="input-field col s12">
								<input type="password" ref="password" className="validate" id="password" />
								<label htmlFor="password">Password</label>
							</div>
						</div>
						<div className="row">
							<button className="waves-effect waves-light btn">Register</button>
						</div>
					</form>
				</div>
			</div>
		);
	},
	onRegister: function(e) {
		e.preventDefault();
		var user = new Parse.User();
		var fileUploadControl = this.refs.profilePhoto.value[0];
		if (fileUploadControl.length > 0) {
  			var file = fileUploadControl[0];
  			var name = "photo.jpg";

  			var parseFile = new Parse.File(name, file);
		}
		user.signUp(
			{
				firstName: this.refs.firstName.value,
				lastName: this.refs.lastName.value,
				username: this.refs.email.value,
				password: this.refs.password.value,
				email: this.refs.email.value,
				photo: parseFile
			},
			{
				success: (u) => {
					this.props.router.navigate('', {trigger: true});
				},
				error: (u, error) => {
					this.setState({
						error: error.message
					});
				}
			}
		);
	}
});