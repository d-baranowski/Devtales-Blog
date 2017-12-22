import React from "react";

const PrismSpan = (props) => {
    const block = props.children[0].props.block;
    const token =  block.tokenMap[props.decoratedText] || {};
    const prismClass = token.type ? token.type : '';
    return (<span spellCheck={token.type === "comment"}
                  className={"token " + prismClass}
                  data-offset-key={props.offsetKey}
    >
            {props.children}
          </span>);
};

export default PrismSpan;