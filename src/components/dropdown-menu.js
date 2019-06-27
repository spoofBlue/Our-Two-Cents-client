import React from "react";
import { Link } from "react-router-dom";

import "./index.css";
import "./dropdown-menu.css";

export default function DropdownMenu(props) {
  let logoutMenuitem;
  let availableConversationMenuitem;
  let createConversationMenuitem;
  let loginMenuitem;
  let createAccountMenuitem;

  let landingPageMenuItem = (
    <li>
      <Link to="/landing-page">About Our Site</Link>
    </li>
  );

  if (props.loggedIn) {
    availableConversationMenuitem = (
      <li>
        <Link to="/home">See Available Conversations</Link>
      </li>
    );
    createConversationMenuitem = (
      <li>
        <Link to="/create-conversation">Create Conversation</Link>
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
        <Link to="/login">Login</Link>
      </li>
    );
    createAccountMenuitem = (
      <li>
        <Link to="/create-account">Create Your Account</Link>
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
          {landingPageMenuItem}
          {logoutMenuitem}
        </ul>
      </nav>
    </div>
  );
}
