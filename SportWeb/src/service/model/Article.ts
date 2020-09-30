export class Article {
    articleId: number;
    authorId: number;
    title: string;
    smallPicture: string;  //base64
    picture: string;
    descritpionPicture: string;
    sourcePicture: string;
    shortArticle: string;
    article: Text;
    keywords: string;
    publicationTime: Date;
    categoryId: number
    userModified: number;
    lastModified: Date;
}
