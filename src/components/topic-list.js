
import React from 'react';

import Topic from './topic';

export default function TopicList(props) {
    const topicList = props.topicList.map((topic, index) => (
        <Topic {...topic} onClickTopic={props.onClickTopic} key={index} />
    ));
    return (
        <ul>
            {topicList}
        </ul>
    );
}