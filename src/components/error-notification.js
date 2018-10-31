
import React from 'react';

export default function ErrorNotification(props) {
    console.log('errorNotification. error=', props.error);
    let error;
    if (props.error.text) {
        error = props.error.text;
    } else if (props.error.message) {
        error = props.error.message;
    } else {
        error = "We had an error, please refresh the page to retry.";
    }
    return (
        <div className="error-notification" aria-live="polite">
            <p>{error}</p>
        </div>
    );
}