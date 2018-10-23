
import React from 'react';

export default function WaitingSection(props) {
    function onClick() {
        props.onCancelWaitingSection();
    }

    return (
        <section className="waiting-for-other-person-section">
            <h3 className="waiting-text">Your conversation on {props.createConvoData.topicName} is visible. You'll be notified when someone connects.</h3>
            <button className="cancel-conversation-button" onClick={onClick}>Cancel</button>
            {/*<h3 className="success-text" hidden>Success! Your conversation on {props.topicName} is about to start.</h3>  !!! may have this show by if/else based on props*/}
        </section>
    );
}