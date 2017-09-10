import React from "react";

class SummaryBlock extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='summary'>
                {/* here, this.props.children contains a <section> container, as that was the matching element */}
                {this.props.children}
            </div>
        );
    }
}

export default SummaryBlock;
