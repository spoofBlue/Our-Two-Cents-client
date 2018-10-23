
import React from 'react';

import TopicList from './topic-list';

export default function ChooseTopicSection(props) {
    return (
        <section className="choose-topic-section">
            <h2>Choose one of the many pre-made topics for discussion.</h2>
            <TopicList {...props} />
        </section>
    );
}