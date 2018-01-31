import '../../../Test/setup';
import React from 'react';
import {ArticleEditorContainer} from './ArticleEditorContainer';
import {mount} from 'enzyme';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {Provider} from 'react-redux';
import {ArticleReducer, ArticleReducerInitialState} from '../..';
import {ImagesReducer, ImagesReducerInitialState} from '../';
import {routerMiddleware} from 'react-router-redux';

const SpyMiddlewareFactory = (actionList, stateList, actionType) => (store) => (next) => (action) => {
    next(action);
    if (action.type === actionType) {
        actionList.push(action);
        stateList.push(store.getState());
    }
};

describe('Article container will receive a fake article', () => {
    const fakeArticle =  {
        id: 1,
        title: 'This is test data',
        slug: 'this-is-test-data',
        html: '<html>\n <head></head>\n <body>\n  <div class="notranslate public-DraftEditor-content" style="outline: none; user-select: text; white-space: pre-wrap; word-wrap: break-word;">\n   <div>\n    <h1>\n     <div class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr">\n      <span><span>This is test data</span></span>\n     </div></h1>\n    <div class="summary">\n     <div class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr">\n      <span><span>This test data contains a summary that will be displayed in the article preview window</span></span>\n     </div>\n    </div>\n    <div class="summary">\n     <div class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr">\n      <span><br></span>\n     </div>\n    </div>\n    <div>\n     <div class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr">\n      <span><span>Unlike the rest of the article </span></span>\n      <span style="font-weight: bold;"><span>body </span></span>\n      <span><span>which will only be </span></span>\n      <span style="text-decoration: underline;"><span>visible</span></span>\n      <span><span> in the full article page. </span></span>\n     </div>\n    </div>\n    <div>\n     <div class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr">\n      <span><span>This </span></span>\n      <span style="font-style: italic;"><span>Article </span></span>\n      <span><span>can contain styling and </span></span>\n      <span style="font-family: monospace; word-wrap: break-word;"><span>lovely </span></span>\n      <span><span>code blocks developed with help of an open source project </span></span>\n      <span style="font-weight: bold; text-decoration: underline; font-style: italic; font-family: monospace; word-wrap: break-word;"><span>Prism</span></span>\n     </div>\n    </div>\n    <div>\n     <div class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr">\n      <span><br></span>\n     </div>\n    </div>\n    <div>\n     <pre class="language-"><pre>\n       <div class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr">\n        <span class="token comment"><span><span>// javascript //</span></span></span>\n       </div></pre><pre>\n       <div class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr">\n        <span class="token "><span><span>var whatIEnjoy </span></span></span>\n        <span class="token operator"><span><span>=</span></span></span>\n        <span class="token "><span><span> </span></span></span>\n        <span class="token punctuation"><span><span>[</span></span></span>\n        <span class="token string"><span><span>"programming"</span></span></span>\n        <span class="token punctuation"><span><span>,</span></span></span>\n        <span class="token "><span><span> </span></span></span>\n        <span class="token string"><span><span>"dnd"</span></span></span>\n        <span class="token punctuation"><span><span>,</span></span></span>\n        <span class="token "><span><span> </span></span></span>\n        <span class="token string"><span><span>"internet memes"</span></span></span>\n        <span class="token punctuation"><span><span>,</span></span></span>\n        <span class="token "><span><span> </span></span></span>\n        <span class="token string"><span><span>"computer games"</span></span></span>\n        <span class="token punctuation"><span><span>,</span></span></span>\n        <span class="token "><span><span> </span></span></span>\n        <span class="token string"><span><span>"mtg"</span></span></span>\n        <span class="token punctuation"><span><span>,</span></span></span>\n        <span class="token "><span><span> </span></span></span>\n        <span class="token string"><span><span>"board games"</span></span></span>\n        <span class="token punctuation"><span><span>]</span></span></span>\n        <span class="token punctuation"><span><span>;</span></span></span>\n       </div></pre><pre>\n       <div class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr">\n        <span><br></span>\n       </div></pre><pre>\n       <div class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr">\n        <span class="token keyword"><span><span>function</span></span></span>\n        <span class="token "><span><span> </span></span></span>\n        <span class="token function"><span><span>printThingsIEnjoy</span></span></span>\n        <span class="token punctuation"><span><span>(</span></span></span>\n        <span class="token punctuation"><span><span>)</span></span></span>\n        <span class="token "><span><span> </span></span></span>\n        <span class="token punctuation"><span><span>{</span></span></span>\n       </div></pre><pre>\n       <div class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr">\n        <span class="token "><span><span> </span></span></span>\n        <span class="token keyword"><span><span>for</span></span></span>\n        <span class="token "><span><span> </span></span></span>\n        <span class="token punctuation"><span><span>(</span></span></span>\n        <span class="token "><span><span>var i </span></span></span>\n        <span class="token operator"><span><span>=</span></span></span>\n        <span class="token "><span><span> </span></span></span>\n        <span class="token number"><span><span>0</span></span></span>\n        <span class="token punctuation"><span><span>,</span></span></span>\n        <span class="token "><span><span> i </span></span></span>\n        <span class="token operator"><span><span>&lt;</span></span></span>\n        <span class="token "><span><span> whatIEnjoy</span></span></span>\n        <span class="token punctuation"><span><span>.</span></span></span>\n        <span class="token "><span><span>length</span></span></span>\n        <span class="token punctuation"><span><span>;</span></span></span>\n        <span class="token "><span><span> i</span></span></span>\n        <span class="token operator"><span><span>++</span></span></span>\n        <span class="token punctuation"><span><span>)</span></span></span>\n        <span class="token "><span><span> </span></span></span>\n        <span class="token punctuation"><span><span>{</span></span></span>\n       </div></pre><pre>\n       <div class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr">\n        <span class="token "><span><span> console</span></span></span>\n        <span class="token punctuation"><span><span>.</span></span></span>\n        <span class="token function"><span><span>log</span></span></span>\n        <span class="token punctuation"><span><span>(</span></span></span>\n        <span class="token string"><span><span>"I enjoy "</span></span></span>\n        <span class="token "><span><span> </span></span></span>\n        <span class="token operator"><span><span>+</span></span></span>\n        <span class="token "><span><span> whatIEnjoy</span></span></span>\n        <span class="token punctuation"><span><span>[</span></span></span>\n        <span class="token "><span><span>i</span></span></span>\n        <span class="token punctuation"><span><span>]</span></span></span>\n        <span class="token "><span><span> </span></span></span>\n        <span class="token operator"><span><span>+</span></span></span>\n        <span class="token "><span><span> </span></span></span>\n        <span class="token string"><span><span>" \\n"</span></span></span>\n        <span class="token punctuation"><span><span>)</span></span></span>\n        <span class="token punctuation"><span><span>;</span></span></span>\n       </div></pre><pre>\n       <div class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr">\n        <span class="token "><span><span> </span></span></span>\n        <span class="token punctuation"><span><span>}</span></span></span>\n       </div></pre><pre>\n       <div class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr">\n        <span class="token punctuation"><span><span>}</span></span></span>\n       </div></pre><pre>\n       <div class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr">\n        <span><br></span>\n       </div></pre></pre>\n    </div>\n    <div>\n     <div class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr">\n      <span><br></span>\n     </div>\n    </div>\n    <div>\n     <div class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr">\n      <span><span>This is it. I hope you enjoyed writing this test data. In the test I\'ll try and assert if its possible to </span></span>\n     </div>\n    </div>\n   </div>\n  </div>\n </body>\n</html>',
        summary: '<div class="summary">\n <div class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr">\n  <span><span>This test data contains a summary that will be displayed in the article preview window</span></span>\n </div>\n</div><br><div class="summary">\n <div class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr">\n  <span><br></span>\n </div>\n</div><br>',
        createdOn: 1515149115763,
        updatedOn: null,
        publishedDate: null,
        jsonRepresentation: '{"entityMap":{},"blocks":[{"key":"7p8nt","text":"This is test data","type":"header-one","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"14qlk","text":"This test data contains a summary that will be displayed in the article preview window","type":"summary","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"e89hn","text":"","type":"summary","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"7r0pr","text":"Unlike the rest of the article body which will only be visible in the full article page. ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":31,"length":5,"style":"BOLD"},{"offset":55,"length":7,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"37ma2","text":"This Article can contain styling and lovely code blocks developed with help of an open source project Prism","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":5,"length":8,"style":"ITALIC"},{"offset":102,"length":5,"style":"ITALIC"},{"offset":37,"length":7,"style":"CODE"},{"offset":102,"length":5,"style":"CODE"},{"offset":102,"length":5,"style":"BOLD"},{"offset":102,"length":5,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"6j4cd","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"7q7v0","text":"// javascript //","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"17k2q","text":"var whatIEnjoy = [\\"programming\\", \\"dnd\\", \\"internet memes\\", \\"computer games\\", \\"mtg\\", \\"board games\\"];","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"8e2ui","text":"","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"9p718","text":"function printThingsIEnjoy() {","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"31mme","text":"   for (var i = 0, i < whatIEnjoy.length; i++) {","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"fupv4","text":"      console.log(\\"I enjoy \\" + whatIEnjoy[i] + \\" \\\\n\\");","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"8elvr","text":"   }","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"dfiof","text":"}","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"eme0m","text":"","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"1kaba","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"1e91m","text":"This is it. I hope you enjoyed writing this test data. In the test I\'ll try and assert if its possible to ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]}',
        tags: []
    };

    const actionsDispatched = [];
    const statesInOrder = [];
    const spyMiddleware = SpyMiddlewareFactory(actionsDispatched, statesInOrder, 'TOGGLE_MENU');

    const store = createStore(
        combineReducers({
            ArticleReducer,
            ImagesReducer
        }),
        {
            ArticleReducer: {...ArticleReducerInitialState, updating: fakeArticle},
            ImagesReducer: {...ImagesReducerInitialState, images: [{
                image: 'https://www.placecage.com/500/500',
                thumb: 'https://www.placecage.com/50/50'}
            ]}
        },
        applyMiddleware(spyMiddleware)
    );

    const wrapper = mount(
        <Provider store={store}>
            <ArticleEditorContainer />
        </Provider>
    );

    describe('When I open the image upload menu and select an image ', () => {
        wrapper.find('#displayImageUploadMenuButton').simulate('click');
        wrapper.find('img').at(0).simulate('click');

        it('There should be a single visible image', () => {
            expect(wrapper.find('img').length).toEqual(1);
        });

        it('The image source should be equal to the image selected earlier', () => {
            expect(wrapper.find('img').get(0).props.src).toEqual('https://www.placecage.com/500/500');
        });

        it('The menu should be toggled twice once to show and once to hide the image', () => {
            expect(actionsDispatched).toContain({ type: 'TOGGLE_MENU' }, { type: 'TOGGLE_MENU' });
            expect(statesInOrder[0].ImagesReducer.showMenu).toEqual(true);
            expect(statesInOrder[1].ImagesReducer.showMenu).toEqual(false);
        });
    });
});