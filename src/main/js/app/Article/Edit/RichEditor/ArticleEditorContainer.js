// @flow
import React, {Component}  from 'react';
import {connect} from 'react-redux';
import RichEditor from "./RichEditor";
import type {ApplicationReducerType} from "../../../Configuration"

type Props = {
    article: any,
    saveArticle: Function,
    updateArticle: Function
}

const mapStateToProps = (state: ApplicationReducerType) => {
    return {
        article: state.ArticleReducer.updating
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
    return ({
        saveArticle: (data) => {
            dispatch(saveArticleAction(data))
        },
        updateArticle: (id) => (data) => {
            dispatch(updateArticleAction(id)(data))
        }
    });
};

export const ArticleEditorContainer = connect(mapStateToProps, mapDispatchToProps)(class extends Component<Props> {
    render() {
        return <RichEditor
            loadState={this.props.article ? this.props.article.jsonRepresentation : false}
            saveArticle={ this.props.article ?
                this.props.updateArticle(this.props.article.id) : this.props.saveArticle }
        />
    }
});