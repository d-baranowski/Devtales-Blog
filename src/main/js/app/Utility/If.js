import React from "react";

export const If = (props) => {
    if (!props._) {
        return null;
    }

    return props.children;
};