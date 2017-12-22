import React from "react";

function If(props) {
    if (!props._) {
        return null;
    }

    return props.children;
}

export default If;