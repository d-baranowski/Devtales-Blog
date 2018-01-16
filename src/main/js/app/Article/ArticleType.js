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
    jsonRepresentation: string,
    tags: Tag[],
    isLoading: boolean
}