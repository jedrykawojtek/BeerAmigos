import React from 'react'
import {Link, Redirect} from 'react-router-dom';
// import logoimg from './images/beer_amigos_logo.jpg';
// import logo from '../logo.svg';
import "./Nav.css"
export default function Nav(props) {
    debugger
    return (
        // <div className="spacer"></div>
        <nav>
            <img src="/images/beer_amigos_logo.jpg" className="App-logo" alt="logo"/>
            {/* <img src={logoimg} className="App-logo" alt="logo" /> */}
            <div className="Logo-name">
                <h1>Beer Amigos</h1>
            </div>
            <Link to={"/"}>Home</Link>
            <Link to={"/"}>About</Link>
            <Link to={"/"}>Beers</Link>
            <Link to={"/"}>Events</Link>
            <Link to={"/"}>Contact</Link>
            {
                Object.keys(props.user).length === 0?
                <>
                <Link to={"/login"}>Login</Link>
                <Link to={"/sign-up"}>Sign up</Link>
                </>
                :
                <>
                    <Link to={"/profile"}>Profile</Link>
                    <Link onClick={props.logout}>Logout</Link>
                    <p>Welcome {props.user.username}</p>
                </>
            }
        </nav>
        

       
    )
}