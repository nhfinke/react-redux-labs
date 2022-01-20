import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import 'material-design-lite/dist/material.min.css';
import 'material-design-lite/dist/material.purple-indigo.min.css';
import './App.css';
import './helpers/Currency';
import './helpers/Date';
import 'material-design-lite/material';
import { actions } from './store/actions';
import { LandingPage } from './LandingPage';
import { FilmDetails } from './FilmDetails';
import { PickSeats } from './PickSeats';
import { Checkout } from './Checkout';
import { NotFound } from './NotFound';
import { Login } from './authentication/Login';
import { Logout } from './authentication/Logout';
import { Account } from './authentication/Account';

function App() {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.fetchInitialData());
  }, []);
  console.log(1234.567.toCurrency());
  return (
    <BrowserRouter>
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <header className="mdl-layout__header">
          <div className="mdl-layout__header-row">
            <Link to="/" style={{ ...styles.navlink, ...styles.topMenuNavLink }} className="mdl-layout-title">Dinner and a Movie</Link>
            <nav className="mdl-navigation mdl-layout--large-screen-only">
              {state.user ?
                <>
                  <Link to="/account" className="mdl-layout__tab">My account</Link>
                  <Link to="/logout" className="mdl-layout__tab">logout</Link>
                  <Link to="/checkout" className="mdl-layout__tab"><i className="material-icons">shopping_cart</i></Link>
                </>
                :
                <>
                  <Link to="/login" className="mdl-layout__tab">Login</Link>
                  <Link to="/register" className="mdl-layout__tab">Register</Link>
                </>}
            </nav>
          </div>
        </header>
        <div className="mdl-layout__drawer">
          <Link to="/" style={{ ...styles.drawerNavLink, ...styles.navlink }} className="mdl-layout-title">Dinner and a Movie</Link>
          <nav className="mdl-navigation">
            {state.user ?
              <>
                <Link to="/account" className="mdl-layout__link">My account</Link>
                <Link to="/logout" className="mdl-layout__link">logout</Link>
                <Link to="/checkout" className="mdl-layout__link"><i className="material-icons">shopping_cart</i></Link>
              </>
              :
              <>
                <Link to="/login" className="mdl-layout__link">Login</Link>
                <Link to="/register" className="mdl-layout__link">Register</Link>
              </>}
          </nav>
        </div>
        <main className="mdl-layout__content">
          <Switch>
            <Route exact path="/" render={() => <LandingPage {...state} />} />
            <Route exact path="/account" render={() => <Account {...state} />} />
            <Route exact path="/login" render={() => <Login />} />
            <Route exact path="/logout" render={() => <Logout />} />
            <Route exact path="/checkout" render={() => <Checkout {...state} />} />
            <Route exact path="/pickseats/:showingId" render={() => <PickSeats {...state} />} />
            <Route exact path="/film/:filmId" render={() => <FilmDetails {...state} />} />
            <Route exact render={() => <NotFound />} />
          </Switch>
        </main>
        <footer>
        </footer>
      </div>
    </BrowserRouter>
  );
}

const styles = {
  navlink: {
    padding: '10px',
    textTransform: 'uppercase',
    textDecoration: 'none',
  },
  drawerNavLink: {
    color: '#424242',
  },
  topMenuNavLink: {
    color: 'white',
  },
}

export default App;
