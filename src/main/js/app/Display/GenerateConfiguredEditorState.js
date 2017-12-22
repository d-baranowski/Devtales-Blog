import {EditorState, convertFromRaw} from "draft-js";
import {Decorators} from "./Decorators"

export const GenerateConfiguredEditorState = (article) => {
    return article ?
        EditorState.createWithContent(convertFromRaw(JSON.parse(article)), Decorators) :
        EditorState.createEmpty(Decorators)
};