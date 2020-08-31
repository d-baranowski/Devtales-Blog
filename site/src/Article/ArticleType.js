// @flow

export type LoadingType = "Loading" | "Loaded" | "Will-Load";

export type Article = {
    id: string,
    title: string,
    slug: string,
    summary: string,
    date: string,
    tags: string[],
    text: string,

    isLoading: LoadingType
}

export const LoadingTypeEnum = {
    LOADING: 'Loading',
    LOADED: 'Loaded',
    WILL_LOAD: 'Will-Load'
};
