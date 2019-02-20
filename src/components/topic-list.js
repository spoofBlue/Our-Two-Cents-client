
import React from 'react';

import Topic from './topic';
import {Grid, Row} from 'react-bootstrap';

import './topic-list.css';

export default function TopicList(props) {
    const topicList = props.topicList.map((topic, index) => (
        <Topic {...topic} onClickTopic={props.onClickTopic} key={index} />
    ));
    return (
        <Grid>
            <Row className="show-grid">
                <ul className="topic-list">
                    {topicList}
                </ul>
            </Row>
        </Grid>
    );
}