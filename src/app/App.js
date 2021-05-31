import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';
import { store } from './store';
import { GithubProfilesPage } from '../features/github-users/GithubProfilesPage';

let routerBaseName;

if (process.env.NODE_ENV !== 'development') {
  routerBaseName = '/profile-search-sample';
}

function App() {
  return (
    <Router basename={routerBaseName}>
      <Provider store={store}>
        <div className="App">
          <Switch>
            <Route path="/github-profiles" component={GithubProfilesPage} />
            <Route path="/" exact>
              <Redirect to="/github-profiles" />
            </Route>
          </Switch>
        </div>
      </Provider>
    </Router>
  );
}

export default App;
