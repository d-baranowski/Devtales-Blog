import React, { Component }  from 'react';
import { connect } from 'react-redux';
import RichEditor from "../components/RichEditor";

const mapStateToProps = (state) => {
    return {
        article: state.articleReducer.updating
    };
};

const saveArticleAction = (data) => {
    return {
        type: 'CREATE_ARTICLE',
        data
    }
};

const updateArticleAction = (id) => (data) => {
    return {
        type: 'UPDATE_ARTICLE',
        id: id,
        data
    }
};

const mapDispatchToProps = (dispatch) => {
    return({
        saveArticle: (data) => {
            dispatch(saveArticleAction(data))
        },
        updateArticle: (id) => (data) => {
            dispatch(updateArticleAction(id)(data))
        }
    });
};

const ArticleEditorContainer = connect(mapStateToProps, mapDispatchToProps)(class extends Component {
    render() {
       return <RichEditor
           loadState={this.props.article ? this.props.article.jsonRepresentation : false}
           saveArticle={ this.props.article ?
               this.props.updateArticle(this.props.article.id) : this.props.saveArticle }
       />
    }
});

export default ArticleEditorContainer;