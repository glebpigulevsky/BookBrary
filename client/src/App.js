import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/routing/PrivateRoute';

// Redux
import { Provider } from 'react-redux';
import store from './store';

import './App.css';

import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import About from './components/pages/About';
import Alerts from './components/layout/Alerts';
import { loadUser } from './actions/authActions';
import setAuthToken from './utils/setAuthToken';
import AdminPanel from './components/adminPanel/AdminPanel';
import Verify from './components/pages/Verify';
import EditUserModal from './components/adminPanel/EditUserModal';
import PersonalPage from './components/personal/PersonalPage';
import AddPostModal from './components/post/AddPostModal';
import Post from './components/post/Post';
import EditPostModal from './components/post/EditPostModal';
import Footer from './components/layout/Footer';
import AddChapterModal from './components/post/AddChapterModal';

// modules for intrn
import { IntlProvider } from 'react-intl';
import ru from './translations/ru.json';
import en from './translations/en.json';
import locales from './translations/index';

const messages = {
  [locales.EN]: en,
  [locales.RU]: ru,
};

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const [selectedState, setSelectedState] = useState(
    localStorage.lang || locales.EN
  );
  // const onLocalChange = (value) => {
  //   setSelectedState(value);
  //   localStorage.setItem(localStorageKeys.SLECTED_LOCALE, value);
  // };
  useEffect(() => {
    // if (localStorage.lang) {
    //   setSelectedLang(localStorage.lang);
    // } else {
    //   localStorage.setItem('lang', 'EN');
    //   setSelectedLang('EN');
    // }
    store.dispatch(loadUser());

    // eslint-disable-next-line
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <IntlProvider locale={selectedState} messages={messages[selectedState]}>
          <Fragment>
            <Navbar style={{ background: '#3a3f44' }} />
            <section className='container'>
              <Alerts />
              <AddPostModal />
              <EditUserModal />
              <EditPostModal />
              <AddChapterModal />

              <Switch>
                <Route exact path='/verify' component={Verify} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/about' component={About} />
                <Route exact path='/' component={Dashboard} />
                <Route exact path='/post/:id' component={Post} />
                <PrivateRoute
                  exact
                  path='/personal-page'
                  component={PersonalPage}
                />
                <PrivateRoute exact path='/dashboard' component={Dashboard} />

                <PrivateRoute exact path='/adminPanel' component={AdminPanel} />
              </Switch>
            </section>
            <Footer onLocalChange={(value) => setSelectedState(value)} />
          </Fragment>
        </IntlProvider>
      </Router>
    </Provider>
  );
}

export default App;
