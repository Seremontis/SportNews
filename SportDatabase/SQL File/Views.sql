USE SportNews
go

CREATE OR ALTER VIEW WListArticles
AS
SELECT ArticleId,Title,SmallPicture,ShortArticle,PublicationTime,C.Name,A.CategoryId
FROM Articles A
LEFT JOIN Categories C ON A.CategoryId=C.CategoryId
go

CREATE OR ALTER VIEW WFullArticle
AS
SELECT ArticleId,Title,Picture,ShortArticle,Article,PublicationTime,A.LastModified,C.Name,A.CategoryId,U.FirstName,U.LastName
FROM Articles A
LEFT JOIN Categories C ON A.CategoryId=C.CategoryId
LEFT JOIN Users U on A.AuthorId=U.UserId
go

CREATE OR ALTER VIEW WUser
AS
SELECT UserId,FirstName,LastName,Login,PasswordExpired,R.RoleId,NameRole
FROM Users U
LEFT JOIN Roles R ON U.RoleId=R.RoleId
GO


CREATE OR ALTER VIEW WCategory
AS
SELECT C.CategoryId,C.Name,C.SortField,(U.FirstName+' '+U.LastName) as UserModified,C.LastModified
FROM Categories C
LEFT JOIN Users U ON C.UserModified=U.UserId
GO