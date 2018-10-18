
import React from 'react';

export default function ErrorNotification(props) {
    return (
        <div class="error-notification" aria-live="polite">
            <p>{props.error.text}</p>
        </div>
    );
}