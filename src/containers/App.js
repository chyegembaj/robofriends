import React, {Component} from 'react';
//import {robots} from './robots.js';
import CardList from '../components/CardList.js';
import SearchBox from '../components/SearchBox.js';
import '../containers/App.css';
import Scroll from '../components/Scroll.js'
import ErrorBoundary from '../components/ErrorBoundary.js';


class App extends Component {
	constructor(){
		super();
		this.state = {
			robots: [],
			searchfield: ''	
		}
	}

	componentDidMount() {
		fetch("https://jsonplaceholder.typicode.com/users")
			.then((response) =>  response.json())
			.then((users) => { this.setState({ robots : users })});
	}


	onSearchChange = (event) => {
		this.setState({
			searchfield: event.target.value
		}); 		

	}

	render() {
		const {robots, searchfield} = this.state;
		const filteredRobots = robots.filter((robots) => {

		return robots.name.toLowerCase().includes(searchfield.toLowerCase());

		});

		if(robots.length === 0) {
			return <h1>Loading....</h1>
		}else {
			return(

				<div className='tc'>
					<h1>RoboFriends</h1>
					<SearchBox searchChange={this.onSearchChange}/>
  					<Scroll>
  						<ErrorBoundary>
  							<CardList robots={filteredRobots}/>
  						</ErrorBoundary>
  						
  					</Scroll>
  					
  				</div>


		);

		}
		
	}

	
}




export default App;