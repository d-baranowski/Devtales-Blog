import React, { Component }  from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => {
    return {
        isAdmin: state.adminReducer.isAdmin,
        article: state.articleReducer.articles[ownProps.slug],
    };
};

const publishArticleAction = (id) => {
    return {
        type: 'PUBLISH_ARTICLE',
        id
    }
};
const hideArticleAction = (id) => {
    return {
        type: 'HIDE_ARTICLE',
        id
    }
};

const mapDispatchToProps = (dispatch) => {
    return({
        publish: (id) => dispatch(publishArticleAction(id)),
        hide: (id) => dispatch(hideArticleAction(id))
    })
};
const PublishingContainer = connect(mapStateToProps, mapDispatchToProps)(class extends Component {
    constructor(props) {
        super(props);
        this.onButtonClick = this.onButtonClick.bind(this);
    }

    onButtonClick() {
        const article = this.props.article;
        const publish = this.props.publish.bind(this);
        const hide = this.props.hide.bind(this);

        if (article.publishedDate > 0) {
            hide(article.id);
        } else {
            publish(article.id);
        }
    };

    render() {
        const isAdmin = this.props.isAdmin;
        const article = this.props.article;
        return isAdmin ? <div>
            <button onClick={this.onButtonClick}>{ article.publishedDate > 0 ? 'Hide' : 'Publish'}</button>
        </div> : (null);
    }
});

export default PublishingContainer;