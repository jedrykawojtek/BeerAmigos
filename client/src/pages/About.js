import React, { Component } from 'react'
import axios from "axios"
import "./About.css"

export default class About extends Component {
    render() {
        return (
            <div>
                <h1>Welcome to Beer Amigos®</h1>
                <p> So you’ve decided to make your own beer at home. Congratulations! You’re about to engage in a wondrous and rewarding task almost as old as humanity itself. 
                But there’s no reason to be intimidated. Although people have been brewing beer for millennia, the basic process has remained much the same through the ages.
                Beer Amigos®, launched in 2019, is fast growing circulation platform for people interested in making their own great beer at home. 
                You can find here recipes, how-to projects and expert advice to help you brew world-class beer. DIY has never gone out of fashion, but in the last few years we've seen a real revival in this area.
                Our goal is to observe the brewing scene from different perspectives, using all our passion to refocus the beer experience back on society – and fun never gets a raw deal at work! 
                Beer Amigos® inspires soon-to-be master brewers every day – whether they are longing to taste their very first home-brewed beer or are already proud home brewers. 
                Beer Amigos® offer you an easy and safe introduction to the world of home brewing. Beer Amigos® is all about making homebrewing easy and consistent.
                We want to help you take it to the next level.
                Enjoy your home brewed beer!</p>
            </div>
        )
    }
}
