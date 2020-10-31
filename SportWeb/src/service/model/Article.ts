export interface  IArticle {
    articleId: number;
    authorId: number;
    title: string;
    smallPicture: string;  //base64
    picture: string;
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
