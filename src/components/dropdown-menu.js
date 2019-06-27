import React from "react";
import { Route, Link } from "react-router-dom";

import "./index.css";
import "./dropdown-menu.css";

export default function DropdownMenu(props) {
  let logoutMenuitem;
  let availableConversationMenuitem;
  let createConversationMenuitem;
  let loginMenuitem;
  let createAccountMenuitem;
  if (props.loggedIn) {
    availableConversationMenuitem = (
      <li>
        <a href="./home">See Available Conversations</a>
      </li>
    );
    createConversationMenuitem = (
      <li>
        <a href="./create-conversation">Create Conversation</a>
      </li>
    );
    logoutMenuitem = (
      <li>
        <a
          className="header-logout-menuitem"
          href="./login"
          onClick={props.onClick}
        >
          <span>Logout</span>
        </a>
      </li>
    );
  } else {
    loginMenuitem = (
      <li>
        <a className="header-login-menuitem" href="./login">
          <span>Login</span>
        </a>
      </li>
    );
    createAccountMenuitem = (
      <li>
        <a className="create-account-menuitem" href="./create-account">
          <span>Create Your Account</span>
        </a>
      </li>
    );
  }

  return (
    <div id="dropdown-menu">
      <button title="Dropdown Menu" className="header-hamburger-menu"></button>
      <nav role="navigation" className="dropdown-content">
        <ul>
          {loginMenuitem}
          {createAccountMenuitem}
          {availableConversationMenuitem}
          {createConversationMenuitem}
          <li>
            <a className="header-login-menuitem" href="./landing-page">
              <span>About Our Site</span>
            </a>
          </li>
          {logoutMenuitem}
        </ul>
      </nav>
    </div>
  );
}
