export interface  IArticle {
    articleId: number;
    authorId: number;
    title: string;
    picture: string;  //base64
    descritpionPicture: string;
    sourcePicture: string;
    shortArticle: string;
    fullArticle: string;
    keywords: string;
    publicationTime: Date;
    categoryId: number
    userModified: number;
    lastModified: Date;
}
