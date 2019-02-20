
import React from 'react';

import {Col} from 'react-bootstrap';

/* import './topic.css'; may not use. just aggregate in topic-list.css*/

export default function Topic(props) {
    function onClick() {
        const topicData = {
            topicId : props.topicId,
            topicName : props.topicName
        }
        props.onClickTopic(topicData);
    }

    return (
        <Col sm={6}>
            <li className="topic" >
                <button type="button" className="topic-button" onClick={onClick}>{props.topicName}</button>
            </li>
        </Col>
    );
}