import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';
// import uuid from 'uuid';
import axios from 'axios';

import './App.css';

class App extends Component {
    state = {
        todos: []
    }

    componentDidMount() {
        const url = 'https://jsonplaceholder.typicode.com/todos?limit=10';
        axios.get(url)
        .then(res => this.setState({ todos: res.data }))
        .catch(function (error) {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
            }
            console.log(error.config);
          });
    }



    // Toggle Complete
    markComplete = (id) => {
        this.setState({
            todos: this.state.todos.map(todo => {
                if (todo.id === id) {
                    todo.completed = !todo.completed
                }
                return todo;
            })
        });
    }

    // Delete Todo
    delTodo = (id) => {
        const url = `https://jsonplaceholder.typicode.com/todos/${id}`;
        axios.delete(url)
        .then(res => this.setState({
            todos: [...this.state.todos.filter(todo => todo.id !== id)]
        }))
        .catch(err => console.log(err));
    }

    // Add Todo
    addTodo = title => {
        const url = 'https://jsonplaceholder.typicode.com/todos';
        axios.post(url, {
            title,
            completed: false
        })
        .then(res => this.setState({ todos: [
            ...this.state.todos,
            res.data
        ] }))
        .catch(error => console.log(error));
    }

  render () {
    return (
    <Router>
      <div className="App">
        <div className="container">
        <Header />
        {/* LANDING ROUTE */}
        <Route exact path="/" render={props => (
            <React.Fragment>
                <AddTodo addTodo={this.addTodo} />
                <Todos 
                    todos={this.state.todos} 
                    markComplete={this.markComplete} 
                    delTodo={this.delTodo} 
                />
            </React.Fragment>
        )} />

        {/* ABOUT ROUTE */}
        <Route path="/about" component={About} />
        </div>
      </div>
    </Router>
    );
  }
}

export default App;
