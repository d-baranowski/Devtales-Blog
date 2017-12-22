import React from "react";

const StyledCodeBlock = (props) => {
    return (
        <div>
            <pre className="language-">
                {props.children}
            </pre>
        </div>
    )
};

export default StyledCodeBlock;