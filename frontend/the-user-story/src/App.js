import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import UserStory from './component/user_stories';

class App extends Component{
  state = {
    userStories : []
  }
  callAPI(){
    var url = process.env.BACKEND_URL || "http://127.0.0.1:9000/api/user_stories"
    fetch(url)
        .then(res => res.json())
        .then(data => this.setState({userStories: data.data}))
        .catch(console.log);
  }
  componentDidMount(){
    this.callAPI();
  }
  render(){
    return (
       <UserStory userStories={this.state.userStories} />
    );
  }
}
export default App;
