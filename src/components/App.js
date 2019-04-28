
import React from 'react';
import { withRouter, Route, Redirect, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { refreshAuthToken, logout } from '../actions/auth';

import SendBirdAction from '../actions/sendbirdAction';
import LandingPageSection from './landing-page-section';
import LoginSection from './login-section';
import CreateAccountSection from './create-account-section';
import AvailableConversationSection from "./home";
import CreateConversationSection from "./create-conversation-section";
import ConversationSection from "./conversation-section";
import Header from "./header";
import Footer from "./footer";

import './index.css';

export let sendbirdInstance;

export class App extends React.Component {
  componentDidMount() {
    sendbirdInstance = SendBirdAction.getInstance();
    if (this.props.loggedIn) {
      sendbirdInstance.accessSendBird(this.props.currentUser.userId);
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.loggedIn && this.props.loggedIn) {
      // When we are logged in, refresh the auth token periodically
      sendbirdInstance.accessSendBird(this.props.currentUser.userId, this.props.currentUser.username);
      this.startPeriodicRefresh();
    } else if (prevProps.loggedIn && !this.props.loggedIn) {
      // Stop refreshing when we log out
      sendbirdInstance.exitSendBird();
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

  /*
  makeElementsPageHeight() {
    let elementsToFillPage = document.getElementsByClassName("notSizeIsPageHeight");
    console.log(`elementsToFillPage= `, elementsToFillPage);
    for (let i = 0; i < elementsToFillPage.length; i++) {
      elementsToFillPage[i].classList.remove("notSizeIsPageHeight");
      elementsToFillPage[i].classList.add("sizeIsPageHeight");
    }
  }

  makeElementsNotPageHeight() {
    let elementsToFillPage = document.getElementsByClassName("sizeIsPageHeight");
    console.log(`elementsToFillPage= `, elementsToFillPage);
    for (let i = 0; i < elementsToFillPage.length; i++) {
      elementsToFillPage[i].classList.remove("sizeIsPageHeight");
      elementsToFillPage[i].classList.add("notSizeIsPageHeight");
    }
  }
  */

  render() {
    console.log(`window.location.pathname= `, window.location.pathname);
    let footer;
    let header;

    if (!window.location.pathname.startsWith('/conversation')) {
      //this.makeElementsNotPageHeight();
      header = <Header onClick={() => this.onLogoutClick()} loggedIn={this.props.loggedIn} />;
      footer = <Footer />;
    } else {
      //this.makeElementsPageHeight();
    }

    return (
      <div className="page-container notSizeIsPageHeight">
        {header}
        <main role="main" className="notSizeIsPageHeight">
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/landing-page" />} />
            <Route exact path="/landing-page" component={LandingPageSection} />
            <Route exact path="/login" component={LoginSection} />
            <Route exact path="/create-account" component={CreateAccountSection} />
            <Route exact path="/home" component={AvailableConversationSection} />
            <Route exact path="/create-conversation" component={CreateConversationSection} />
            <Route exact path="/conversation/:conversationId" component={ConversationSection} />
            <Route render={function () { return <p>This route doesn't exist, you can start at the <Link to="/home">home page</Link>.</p> }} />
          </Switch>
        </main>
        <div className="background"></div>
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

