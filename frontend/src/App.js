import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Settings from './pages/Settings';
import Welcome from './pages/Welcome';

const App = () => (
  <Router>
    <Routes>
      <Route exact path="/" component={Welcome} />
      <Route path="/home" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
      <Route path="/settings" component={Settings} />
    </Routes>
  </Router>
);

export default App;
