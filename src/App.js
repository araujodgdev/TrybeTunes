import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Album from './pages/Album';
import Login from './pages/Login';
import Search from './pages/Search';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/page/not/found" component={ NotFound } />
        <Route path="/album/:id" component={ Album } />
        <Route path="/profile/edit" component={ ProfileEdit } />
        <Route path="/search" component={ Search } />
        <Route path="/favorites" component={ Favorites } />
        <Route path="/profile" component={ Profile } />
        <Route path="/" component={ Login } />
      </Switch>
    );
  }
}

export default App;
