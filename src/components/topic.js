
import React from 'react';

export default function Topic(props) {
    function onClick() {
        const topicData = {
            topicId : props.topicId,
            topicName : props.topicName
        }
        props.onClickTopic(topicData);
    }

    return (
        <li className="topic" >
            <button type="button" className="topic-button" onClick={onClick}>{props.topicName}</button>
        </li>
    );
}