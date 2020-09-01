import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {cb} from "react-syntax-highlighter/src/styles/prism";

class CodeBlock extends PureComponent {
    static propTypes = {
        value: PropTypes.string.isRequired,
        language: PropTypes.string
    };

    static defaultProps = {
        language: null
    };

    render() {
        let { language, value } = this.props;

        if (!language) {
            const matches = value.match(/\/\/ (.*) \/\//);
            if (matches) {
                language = matches[1]
            }
        }

        return (
            <SyntaxHighlighter className="code-block" language={language} style={cb}>
                {value}
            </SyntaxHighlighter>
        );
    }
}

export default CodeBlock;
