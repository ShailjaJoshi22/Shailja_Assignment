import React, { useState, useEffect } from "react";
import "./index1.css";
import { Link } from 'react-router-dom';
import { useVoice } from './useVoice';
import Mic from "./microphone-black-shape.svg";
import { useBookFetch } from "./useBookFetch";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackwardStep } from '@fortawesome/free-solid-svg-icons'; // Import the desired Font Awesome icon


const SpeechCommand = () => {

    const { text, isListening, listen, voiceSupported } = useVoice();
    const { authorBooks, isFetchingBooks, fetchBooksByAuthor } = useBookFetch();

    useEffect(() => {
        if (text !== "") {
            fetchBooksByAuthor(text);
        }
    }, [text]);

    if (!voiceSupported) {
        return (
            <div className="app">
                <h1>
                    Voice recognition is not supported by your browser, please retry with a supported browser e.g. Chrome
                </h1>
            </div>
        );
    }

    const usersobj = (e) => {
        return authorBooks.map((user) => {
            return
            <p> {user.firstName + " " + user.lastName}</p>
        })
    }

    return (
        <><nav>
             <Link to="/"><FontAwesomeIcon icon={faBackwardStep} size="2x" color="grey" /></Link>
        </nav>
            <div className="app">
                <h2>User Voice Search</h2>
                <h3>Click the Mic and say an Users's name</h3>
                <div>
                    <img
                        className={`microphone ${isListening && "isListening"}`}
                        src={Mic}
                        alt="microphone"
                        onClick={listen}
                    />
                </div>
                <p>{text}</p>
                {isFetchingBooks ? (
                    "fetching books...."
                ) : (
                    <div>
                        {Object.keys(authorBooks).map((key) => (
                            <li key={key}>{authorBooks[key]}</li>
                        ))}
                    </div>
                )}
            </div>

        </>
    );
}
export default SpeechCommand;