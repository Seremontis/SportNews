use SportNews
GO

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
SELECT ArticleId,Title,Picture,ShortArticle,Article,PublicationTime,LastModified,Name,CategoryId,FirstName,LastName
FROM WFullArticle
where ArticleId=@ArticleId
go

CREATE OR ALTER PROCEDURE GetWUser
@userid int
AS
SELECT UserId,FirstName,LastName,Login,PasswordExpired,RoleId,NameRole
FROM WUser
where UserId=@userid
GO

CREATE OR ALTER PROCEDURE MoveUpCategory
(
    @CategoryId      As INT,
	@SortField		as INT
) As

	DECLARE @AnotherRowId int
	DECLARE @AnotherRowSortField int
	SELECT @AnotherRowId=CategoryId,@AnotherRowSortField=SortField 
	FROM Categories
	WHERE SortField=@SortField-1

	BEGIN TRANSACTION 
	Update Categories 
	SET SortField=@SortField-1 
	WHERE CategoryId=@CategoryId

	Update Categories 
	SET SortField=@AnotherRowSortField+1 
	WHERE CategoryId=@AnotherRowId

	COMMIT TRANSACTION  
GO

CREATE OR ALTER PROCEDURE MoveDownCategory
(
    @CategoryId      As INT,
	@SortField		as INT
) As

	DECLARE @AnotherRowId int
	DECLARE @AnotherRowSortField int
	SELECT @AnotherRowId=CategoryId,@AnotherRowSortField=SortField
	FROM Categories
	WHERE SortField=@SortField+1

	BEGIN TRANSACTION 
	Update Categories 
	SET SortField=@SortField+1 
	WHERE CategoryId=@CategoryId

	Update Categories 
	SET SortField=@AnotherRowSortField-1 
	WHERE CategoryId=@AnotherRowId

	COMMIT TRANSACTION  
GO

CREATE OR ALTER PROCEDURE AddCategory
@NameCategory varchar(50),
@UserId int
AS
DECLARE @lastNumberSort int
SET @lastNumberSort= (SELECT MAX(SortField) FROM Categories)
INSERT INTO Categories (Name,SortField,UserModified,LastModified)
VALUES (@NameCategory,@lastNumberSort,@UserId,GETDATE())
go