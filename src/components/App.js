
import React from 'react';
import {withRouter, Route, Redirect, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import {refreshAuthToken, logout} from '../actions/auth';
import {initializeSendBird, accessSendBird} from '../actions/sendbird';

import LandingPageSection from './landing-page-section';
import LoginSection from './login-section';
import CreateAccountSection from './create-account-section';
import AvailableConversationSection from "./home";
import CreateConversationSection from "./create-conversation-section";
import ConversationSection from "./conversation-section";
import Header from "./header";
import Footer from "./footer";

import './index.css';

export class App extends React.Component {
  componentDidMount() {
    initializeSendBird();
    if (this.props.loggedIn) {
      accessSendBird(this.props.currentUser.userId);
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.loggedIn && this.props.loggedIn) {
      // When we are logged in, refresh the auth token periodically
      accessSendBird(this.props.currentUser.userId);
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

  onLogoutClick() {
    this.props.dispatch(logout());
  }

  render() {
    console.log(`window.location.pathname= `, window.location.pathname);
    let footer;
    let header;
    
    if (!window.location.pathname.startsWith('/conversation')) {
      header = <Header onClick={() => this.onLogoutClick()}/>;
      footer = <Footer />;
    }

    return (
      <div className="container">
        {header}
        <main role="main">
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/landing-page" />}/>
            <Route exact path="/landing-page" component={LandingPageSection} />
            <Route exact path="/login" component={LoginSection} />
            <Route exact path="/create-account" component={CreateAccountSection} />
            <Route exact path="/home" component={AvailableConversationSection} />
            <Route exact path="/create-conversation" component={CreateConversationSection} />
            <Route exact path="/conversation/:conversationId" component={ConversationSection} />
            <Route render={function () {return <p>Not Found</p>}} />
          </Switch>
        </main>
        {footer}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  hasAuthToken: state.auth.authToken !== null,
  loggedIn: state.auth.currentUser !== null,
  currentUser: state.auth.currentUser
});

export default withRouter(connect(mapStateToProps)(App));

