USE SportNews
go

CREATE OR ALTER VIEW WListArticles
AS
SELECT ArticleId,Title,Picture,ShortArticle,PublicationTime,Keywords,C.Name,A.CategoryId
FROM Articles A
LEFT JOIN Categories C ON A.CategoryId=C.CategoryId
go

CREATE OR ALTER VIEW WFullArticle
AS
SELECT ArticleId,Title,Picture,SourcePicture,SourceArticle,ShortArticle,FullArticle,PublicationTime,A.LastModified,C.Name,A.CategoryId,U.FirstName,U.LastName
FROM Articles A
LEFT JOIN Categories C ON A.CategoryId=C.CategoryId
LEFT JOIN Users U on A.AuthorId=U.UserId
go

CREATE OR ALTER VIEW WUser
AS
SELECT U.UserId,U.FirstName,U.LastName,U.Login,U.PasswordExpired,R.RoleId,R.NameRole,Us.FirstName+' '+Us.LastName as'UserModified'
FROM Users U
LEFT JOIN Roles R ON U.RoleId=R.RoleId
LEFT JOIN Users Us ON U.UserModified=Us.UserId
GO


CREATE OR ALTER VIEW WCategory
AS
SELECT C.CategoryId,C.Name,C.SortField,(U.FirstName+' '+U.LastName) as UserModified,C.LastModified,AboveCategory
FROM Categories C
LEFT JOIN Users U ON C.UserModified=U.UserId
GO