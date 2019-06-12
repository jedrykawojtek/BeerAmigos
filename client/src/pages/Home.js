import React, { Component } from 'react'
import "./Home.css"
import axios from "axios"

export default class Home extends Component {
    render() {
        return (
            <>
            
            <div className="Beer-Amigos">
                <img src="/images/beer_amigos_logo.jpg" alt="logo"/>

            </div>
            

            <div>
                <h1>Welcome to Beer Amigos®</h1>
            </div>
            
            </>
        )
    }
}

