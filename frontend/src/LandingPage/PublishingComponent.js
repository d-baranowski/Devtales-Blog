// @flow
import React, {Component}  from 'react';
import type {Props} from './PublishingContainer';
import type {Article} from '../Article/ArticleType';

class PublishingComponent extends Component<Props> {
    onButtonClick: () => void;

    constructor(props: Props) {
        super(props);
        this.onButtonClick = this.onButtonClick.bind(this);
    }

    onButtonClick() {
        const article : Article = this.props.article;

        if (article.publishedDate > 0) {
            this.props.hide(article.id);
        } else {
            this.props.publish(article.id);
        }
    }

    render() {
        const {isAdmin, article} = this.props;

        return isAdmin ? <div>
            <button onClick={this.onButtonClick}>{ article.publishedDate > 0 ? 'Hide' : 'Publish'}</button>
        </div> : (null);
    }
}

export default PublishingComponent;