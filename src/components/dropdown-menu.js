
import {Route, Link} from 'react-router-dom';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

import './index.css';

export default function DropdownMenu(props) {
    return (
        <DropdownButton id="dropdown-menu" className="header-hamburger-menu hidden-sm hidden-md hidden-lg">
            <MenuItem eventKey="1">Home</MenuItem>
            <MenuItem eventKey="2">About the Site</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey="4">Logout</MenuItem>
        </DropdownButton>
    );
}

/*
<Dropdown id="dropdown-custom-1">
    <Dropdown.Toggle>
      <Glyphicon glyph="star" />
      Pow! Zoom!
    </Dropdown.Toggle>
    <Dropdown.Menu className="super-colors">
      <MenuItem eventKey="1">Action</MenuItem>
      <MenuItem eventKey="2">Another action</MenuItem>
      <MenuItem eventKey="3" active>
        Active Item
      </MenuItem>
      <MenuItem divider />
      <MenuItem eventKey="4">Separated link</MenuItem>
    </Dropdown.Menu>
  </Dropdown>
*/