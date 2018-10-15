
import React from 'react';
import './App.css';
import {withRouter, Route, Switch} from 'react-router-dom';
import LandingPageSection from './landing-page';
import LoginSection from './login';
import CreateAccountSection from './create-account';
import AvailableConversationSection from "./home";
import CreateConversationSection from "./create-conversation";
import ConversationSection from "./conversation";
import Header from "./header";
import Footer from "./footer";

export default class App extends React.Component {
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
          <Route exact path="/landing-page" component={LandingPageSection} />
          <Route exact path="/login" component={LoginSection} />
          <Route exact path="/create-account" component={CreateAccountSection} />
          <Route exact path="/home" component={AvailableConversationSection} />
          <Route exact path="/create-conversation" component={CreateConversationSection} />
          <Route exact path="/conversation" component={ConversationSection} />
        </Switch>
        {footer}
      </div>
    );
  }
}