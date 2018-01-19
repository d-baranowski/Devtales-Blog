// @flow
import React from 'react';

type Props = {
    isOpen: boolean,
    children: any
}

const ResponsiveNavComponent = (props: Props) =>
    React.createElement('responsivenav',
        {className: props.isOpen ? 'open' : ''},
        props.children); //Custom html element

export default ResponsiveNavComponent;