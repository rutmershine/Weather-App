import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './comps/Home';
import Favorites from './comps/Favorites';
import Navbar from './comps/Navbar';

function App() {
  return (
    <Router>
      {/* <div className="navigation"> */}
        {/* <Link className="nav" to="/">Home</Link>
        <Link className="nav" to="/favorites">Favorites</Link> */}
        <Navbar></Navbar>‏

      {/* </div> */}

      <div className="App">
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/favorites">
            <Favorites />
          </Route>

        </Switch>
      </div>
    </Router>

  );
}

export default App;
