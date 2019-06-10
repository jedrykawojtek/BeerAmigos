import React from 'react'
// import {Link, Redirect} from 'react-router-dom';
import "./Footer.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faLinkedin, faYoutube, faInstagram, faPinterest, faGithub } from '@fortawesome/free-brands-svg-icons'

export default function Footer(props) {
   
    return (
        // <div className="spacer"></div>
        <footer>
            <p>Beer Amigos® by Voytek©. Graphics by <strong><a href="https://dribbble.com/urancd">Uran</a></strong></p>
            <div class="social-icons">
                <a href="https://facebook.com" target="_blank" ><FontAwesomeIcon icon={faFacebook } /></a>
                <a href="https://instagram.com" target="_blank" ><FontAwesomeIcon icon={faInstagram } /></a>
                <a href="https://pinterest.com" target="_blank" ><FontAwesomeIcon icon={faPinterest } /></a>
                <a href="https://linkedin.com" target="_blank" ><FontAwesomeIcon icon={faLinkedin } /></a>
                <a href="https://youtube.com" target="_blank" ><FontAwesomeIcon icon={faYoutube } /></a>
                <a href="https://github.com" target="_blank" ><FontAwesomeIcon icon={faGithub} /></a>
            </div>
        
        </footer>
                
    )
}
