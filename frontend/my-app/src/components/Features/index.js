import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faTwitter ,faFacebook, faYoutube  } from '@fortawesome/free-brands-svg-icons';

const  socialMedia = () =>{
    return (
        <div>
            <span><Link to="https://www.google.com/search?keywords=My+Search+Parameters"><FontAwesomeIcon icon={faGoogle} size="2x" color="black" /></Link></span>
            <span><Link to="https://www.youtube.com/"><FontAwesomeIcon icon={faYoutube} size="2x" color="red" /></Link></span>
            <Link to="https://twitter.com/?lang=en"><FontAwesomeIcon icon={faTwitter} size="2x" color="skyblue" /></Link>
            <Link to="https://www.facebook.com/"><FontAwesomeIcon icon={faFacebook} size="2x" color="blue" /></Link>
        </div>
    );
}

export default socialMedia;