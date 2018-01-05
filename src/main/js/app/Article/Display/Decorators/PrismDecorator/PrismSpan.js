import React from "react";

const PrismSpan = (props) => {
    const block = props.children[0].props.block;
    const token =  block.tokenMap[props.decoratedText] || {};
    const prismClass = token.type || '';
    const childrenWithKeys = props.children.map((child) => {
        if (child.props.key) {
            return child
        }
        return {...child, key: prismClass + props.offsetKey}
    });

    return (<span spellCheck={token.type === "comment"}
                  className={"token " + prismClass}
                  data-offset-key={props.offsetKey}>
            {childrenWithKeys}
          </span>);
};

export default PrismSpan;