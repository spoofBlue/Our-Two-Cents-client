
import React from 'react';
import {withRouter, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import {refreshAuthToken} from '../actions/auth';
import {Provider} from 'react-redux';
import {homeStore, createConversationStore, conversationStore} from './appStore';

import LandingPageSection from './landing-page';
import LoginSection from './login';
import CreateAccountSection from './create-account';
import AvailableConversationSection from "./home";
import CreateConversationSection from "./create-conversation";
import ConversationSection from "./conversation";
import Header from "./header";
import Footer from "./footer";

import './App.css';

export class App extends React.Component {
  /*
  componentDidUpdate(prevProps) {
    if (!prevProps.loggedIn && this.props.loggedIn) {
      // When we are logged in, refresh the auth token periodically
      this.startPeriodicRefresh();
    } else if (prevProps.loggedIn && !this.props.loggedIn) {
      // Stop refreshing when we log out
      this.stopPeriodicRefresh();
    }
  }

  componentWillUnmount() {
    this.stopPeriodicRefresh();
  }

  startPeriodicRefresh() {
    this.refreshInterval = setInterval(
        () => this.props.dispatch(refreshAuthToken()),
        24 * 60 * 60 * 1000 // Can go 24 hours without refreshing.
    );
  }

  stopPeriodicRefresh() {
    if (!this.refreshInterval) {
        return;
    }

    clearInterval(this.refreshInterval);
  }
  */

  render() {
    console.log(`Hello App.js`);
    console.log(`window.location.pathname= `, window.location.pathname);
    let footer;
    let header;
    if (window.location.pathname === '/conversation') {
      header = Header;
      footer = Footer;
    }

    return (
      <div class="container">
        {header}
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/login" />}/>
          <Route exact path="/landing-page" component={LandingPageSection} />
          <Route exact path="/login" component={LoginSection} />
          <Route exact path="/create-account" component={CreateAccountSection} />
          <Route exact path="/home" component={AvailableConversationSection} />
          <Route exact path="/create-conversation" component={CreateConversationSection} />
          <Route exact path="/conversation/:conversationId" component={ConversationSection} />
          <Route render={function () {return <p>Not Found</p>}} />
        </Switch>
        {footer}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  hasAuthToken: state.auth.authToken !== null,
  loggedIn: state.auth.currentUser !== null
});

export default withRouter(connect(mapStateToProps)(App));

