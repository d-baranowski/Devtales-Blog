// @flow
import React from 'react';

type Props = {
    children: any[]
}

const StyledCodeBlock = (props: Props) => {
    return (
        <div>
            <pre className="language-">
                {props.children}
            </pre>
        </div>
    );
};

export default StyledCodeBlock;