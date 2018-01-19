// @flow
import React from 'react';
import type {DecoratorPropsType} from '../Decorators';

const HashtagSpan = (props: DecoratorPropsType) => {
    return (
        <span
            style = {{
                color: 'rgba(95, 184, 138, 1.0)'
            }}
            className="tag"
            data-offset-key={props.offsetKey}
        >
            {props.children}
        </span>
    );
};

export default HashtagSpan;