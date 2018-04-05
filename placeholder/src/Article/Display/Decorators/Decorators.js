// @flow
import {CompositeDecorator} from 'draft-js';
import {HashtagDecorator} from './HashtagDecorator/index';
import {PrismDecorator} from './PrismDecorator/index';

//Draft js currently doesn't expose its types
export type DecoratorPropsType = {
    children: any[],
    contentState: any,
    decoratedText: string,
    dir: any,
    entityKey: any,
    offsetKey: string
}

export const Decorators = new CompositeDecorator([
    HashtagDecorator,
    PrismDecorator
]);