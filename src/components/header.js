
import {Link} from 'react-router-dom';

export default function Header() {
    return (
        <header role="header">
            <h1>Our Two Cents</h1>
            <Link to="./home.html">Home (icon link)</Link>
            <Link to="./landing-page.html">About Our Site (icon link)</Link>
        </header>
    );
}