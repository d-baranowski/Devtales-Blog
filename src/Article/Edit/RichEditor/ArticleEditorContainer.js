// @flow
import React, {Component}  from 'react';
import {connect} from 'react-redux';
import RichEditor from './RichEditor';
import {ImageUploadMenuContainer} from '../Images';

import type {ApplicationReducerType} from '../../../Configuration';
import type {Article} from '../../ArticleType';

type Props = {
    article: Article,
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
    };
};

const updateArticleAction = (id) => (data) => {
    return {
        type: 'UPDATE_ARTICLE',
        id: id,
        data
    };
};

const mapDispatchToProps = (dispatch) => {
    return ({
        saveArticle: (data) => {
            dispatch(saveArticleAction(data));
        },
        updateArticle: (id) => (data) => {
            dispatch(updateArticleAction(id)(data));
        }
    });
};

export const ArticleEditorContainer = connect(mapStateToProps, mapDispatchToProps)(class ArticleEditorContainer extends Component<Props> {
    uploadMenuContainer = (props) => (<ImageUploadMenuContainer {...props} />);

    render() {
        return <RichEditor
            article={this.props.article}
            updateArticle={this.props.updateArticle}
            saveArticle={this.props.saveArticle}
            uploadMenuContainer={this.uploadMenuContainer}
        />;
    }
});