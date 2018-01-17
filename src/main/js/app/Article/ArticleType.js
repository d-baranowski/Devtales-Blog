// @flow

type Tag = {
    id: number,
    value: string
}

export type Article = {
    id: number,
    title: string,
    slug: string,
    html: string,
    summary: string,
    createdOn: number,
    updatedOn: number,
    publishedDate: number,
    jsonRepresentation: string | null,
    tags: Tag[],
    isLoading: LoadingType
}

export const LoadingTypeEnum = {
    LOADING: "Loading",
    LOADED: "Loaded",
    WILL_LOAD: "Will-Load"
};
export type LoadingType = "Loading" | "Loaded" | "Will-Load";