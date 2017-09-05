import React, { Component }  from 'react';
import { connect } from 'react-redux';
import RichEditor from "../components/RichEditor";

const mapStateToProps = (state) => {
    return { };
};

const saveArticleAction = (data) => {
    return {
        type: 'CREATE_ARTICLE',
        data
    }
};

const mapDispatchToProps = (dispatch) => {
    return({
        saveArticle: (data) => {
            dispatch(saveArticleAction(data))
        }
    });
};

const ArticleEditorContainer = connect(mapStateToProps, mapDispatchToProps)(class extends Component {
    render() {
       return <RichEditor saveArticle={ this.props.saveArticle }/>
    }
});

export default ArticleEditorContainer;