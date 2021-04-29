import React, { createContext, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Destinations from './components/Destination/Destinations';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import NoMatch from './components/NoMatch/NoMatch';

export const UserContext = createContext();
const App = () => {
    const [loggenInUser, setLoggedInUser] = useState({});
    return (
        <div className="main">
            <div className="container">
            <UserContext.Provider value={[loggenInUser, setLoggedInUser]}>
                <Router>
                    <Header/>
                    <Switch>
                        <Route exact path="/login">
                            <Login/>
                        </Route>
                        <Route exact path="/signup">
                            <Signup/>
                        </Route>
                        <PrivateRoute exact path="/:vehicle">
                            <Destinations/>
                        </PrivateRoute>
                        <PrivateRoute exact path="/destination">
                            <Destinations/>
                        </PrivateRoute>
                        <Route exact path="/">
                            <Home/>
                        </Route>
                        <Route exact path="*">
                            <NoMatch/>
                        </Route>
                    </Switch>
                </Router>
            </UserContext.Provider>
            </div>
        </div>
    );
};

export default App;