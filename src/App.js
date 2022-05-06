import React, { Component } from 'react';
import User from './User';
import UserForm from './UserForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes } from 'react-router-dom';

class App extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
              <Routes>
                  <Route path="/edit/:id" element={<UserForm />} />
                  <Route path="/add" element={<UserForm />} />
                  <Route exact path="/" element={<User />} />
                  <Route path="/*" element={<NotFound />} />
              </Routes>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;

class NotFound extends Component {
  render(){
    return <div>Not Found</div>
  }
}