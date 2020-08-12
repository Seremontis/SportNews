CREATE OR ALTER PROCEDURE SingleShortArticle 
@SportId int
AS 
select TOP 1 ArticleId,Title,SmallPicture,ShortArticle,PublicationTime,Name,CategoryId
from WListArticles
 go

CREATE OR ALTER PROCEDURE ListShortArticles
@PageNumber int,
@PageSize int
AS
DECLARE @start int
SET @start=(@PageSize*@PageNumber)-@PageSize
select ArticleId,Title,SmallPicture,ShortArticle,PublicationTime,Name,CategoryId
from WListArticles
Order by ArticleId
OFFSET @start ROWS
FETCH FIRST @PageSize ROWS ONLY
go

CREATE OR ALTER PROCEDURE ListShortArticlesByCategory
@PageNumber int,
@PageSize int,
@CategoryId int
AS
DECLARE @start int
SET @start=(@PageSize*@PageNumber)-@PageSize
select ArticleId,Title,SmallPicture,ShortArticle,PublicationTime,Name,CategoryId
from WListArticles
where CategoryId=@CategoryId
Order by ArticleId
OFFSET @start ROWS
FETCH FIRST @PageSize ROWS ONLY
go

CREATE OR ALTER PROCEDURE SingleFullArticle
@ArticleId int
AS
SELECT ArticleId,Title,SmallPicture,ShortArticle,PublicationTime,LastUpdate,IsGallery,Name,CategoryId,FirstName,LastName
FROM WFullArticle
where ArticleId=@ArticleId
go
