CREATE OR ALTER VIEW WListArticles
AS
SELECT ArticleId,Title,SmallPicture,ShortArticle,PublicationTime,C.Name,A.CategoryId
FROM Articles A
LEFT JOIN Categories C ON A.CategoryId=C.CategoryId
go

CREATE OR ALTER VIEW WFullArticle
AS
SELECT ArticleId,Title,SmallPicture,ShortArticle,PublicationTime,LastUpdate,IsGallery,C.Name,A.CategoryId,U.FirstName,U.LastName
FROM Articles A
LEFT JOIN Categories C ON A.CategoryId=C.CategoryId
LEFT JOIN Users U on A.AuthorId=U.UserId
go
