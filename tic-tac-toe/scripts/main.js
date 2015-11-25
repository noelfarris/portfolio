(function() {
var React = require('react');
var ReactDOM = require('react-dom');

var Home = React.createClass({
	render(){
		return (
			<div>
				<div className="header">
					<div className="container">
						<div className="row">
							<h1>Beavers vs Pandas</h1>
						</div>
					</div>
				</div>
				<div>
					<GameBoard />
				</div>
			</div>
		);
	}
	
})

var GameBoard = React.createClass({
	//setting the state on game spaces, player and winner
	getInitialState() {
        return {
            spaces:  [
                '', '', '',
                '', '', '',
                '', '', ''
            ],
            turn: 'Pandas', 
            winner: null
        }
    },
    switchPlayer() {
    	//Switching the turn state to the next player
			this.setState({turn: this.state.turn === 'Pandas' ? 'Beavers' : 'Pandas'})
    },

    setspaces(position, value){
    		//Setting the state on the spaces position
			var myspaces = this.state.spaces
			myspaces[position] = value;
			this.setState({spaces: myspaces,});
    },
    checkBoard(){
    	 //logic to check spaces for a winning combination
    	 var spaces = this.state.spaces;

    	if(spaces[0] == spaces[1] && spaces[1] == spaces[2]){
    		this.setState({winner: spaces[0]});
			return spaces[0];
		}
		if(spaces[3] == spaces[4] && spaces[4] == spaces[5]){
			this.setState({winner: spaces[3]});
			return spaces[3];	
		}
    	if(spaces[6] == spaces[7] && spaces[7] == spaces[8]){
			this.setState({winner: spaces[6]});
			return this.state.spaces[6];	
		}
    	if(spaces[2] == spaces[4] && spaces[4] == spaces[6]){
    		this.setState({winner: spaces[2]});
			return spaces[2];	
		}
    	if(spaces[0] == spaces[4] && spaces[4] == spaces[8]){
    		this.setState({winner: spaces[0]});
			return spaces[0];	
		}
    	if(spaces[0] == spaces[3] && spaces[3] == spaces[6]){
    		this.setState({winner: spaces[0]});
			return spaces[0];	
		}
    	if(spaces[1] == spaces[4] && spaces[4] == spaces[7]){
    		this.setState({winner: spaces[1]});
			return spaces[1];	
		}
    	if(spaces[2] == spaces[5] && spaces[5] == spaces[8]){
    		this.setState({winner: spaces[2]});
			return spaces[2];	
		}
		if(spaces.join('').length === 9){
			this.setState({winner: 'none'});
			return 'none';
		}
    },

    // resetGame() {
    //         location.reload(true));
    // },

	render(){
		//looping through the spaces and passing info to the tile class
		var boardSpaces = this.state.spaces
			.map((tile, position) => {
			return(
				<Tile key={position} pos={position} spaces={tile} player={this.state.turn} 
				switchPlayer={this.switchPlayer} checkBoard={this.checkBoard} 
				setspaces={this.setspaces} />
			);
		});
		if(!this.state.winner){
			var animal;
			var currentTurn = 
				<h5>Your turn: {this.state.turn}</h5>
		}else{ 
			if (this.state.winner === 'x'){
				animal = 'Pandas'
			} else {
				animal = 'Beavers'
			}
			currentTurn =
				<div className='row'>
					<h2>{animal} win!</h2>
					<a className='btn btn-default col-md-4 col-md-offset-4' href="javascript:location.reload(true)" role="button">Play again?</a>
				</div>
		}

		if(this.state.winner === 'none'){
			currentTurn = 
				<div>
					<h2>Tie game!</h2>
					<a className='btn btn-default col-md-4 col-md-offset-4' href="javascript:location.reload(true)" role="button">Play again?</a>
				</div>
		}

		return (
			<div className="gameBoard">
				<div>
					<div>{currentTurn}</div>
				</div>
				{boardSpaces}
			</div>
		);
	}
});

var Tile = React.createClass({
	getInitialState(){
		//Setting jsx element state for player icons
		return{
			panda: <div className="animalIconsPanda"></div>,
			beaver: <div className="animalIconsBeaver"></div>,

		}
	},

	render(){
		//Setting a position and click element to add player icons to spaces
		return (
				<div className="col-xs-4 tile" id={'spaces'+ this.props.pos} onClick={this.move}>
					{this.state.spaces}
					<div>
					{this.state.errorElement}
					</div>
				</div>

		);
	},

	move() {
		//Checking space for a move and setting the spaces state.
		if(this.state.spaces != undefined){
			return;
		}
		if(this.props.player == 'Pandas'){
			this.setState({ spaces: this.state.panda });
			this.props.setspaces(this.props.pos, 'x');
		}
		else{
			this.setState({ spaces: this.state.beaver });
			this.props.setspaces(this.props.pos, '0');
		}
		this.props.setspaces(this.props.key);
		this.props.switchPlayer();
		this.props.checkBoard();
	}
	
})

ReactDOM.render(
	<Home />,
	document.getElementById('app')
	)
})();