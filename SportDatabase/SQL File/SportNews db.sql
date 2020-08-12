--dodaæ podzia³ dziennikarzy
-- odseparowaæ do osobnych plików SQL
use master
go
DROP DATABASE IF EXISTS SportNews
go

Create database SportNews
go

use SportNews
go

Create table Users(
[UserId] int identity(1,1) primary key,
[FirstName] varchar(50),
[LastName] varchar(80),
[Login] varchar(50),
[Password] binary(64),
[PasswordExpired] datetime,
[RoleId] int,
)
go
Create table Roles(
[RoleId] int identity(1,1) primary key,
[NameRole] varchar(100)
)
go

--dokoñczyæ w trakcie budowy apki
Create table [Permissions](
[PermissionId] int identity(1,1) primary key,
[RoleId] int not null,
[Name] varchar(100),
[Description] varchar(255)
)
go

Create table Categories(
[CategoryId] int identity(1,1) primary key,
[Name] varchar(50)
)
go

Create table Articles(
[ArticleId] int identity(1,1) primary key,
[AuthorId] int not null,
[Title] varchar(100) not null,
[SmallPicture] binary,
[MainPicture] nchar(300), 
[ShortArticle] nvarchar(150),
[Article] text,
[Keywords] nchar(100),
[PublicationTime] date,
[LastUpdate] date,
[CategoryId] int,
[IsGallery] bit default 0
)
go

Create table Gallery(
[GalleryId] int identity(1,1) primary key,
[ArticleId] int not null,
[Path] nchar(150)
)
go

Create table LogExceptions(
[LogExceptionId] int identity(1,1) primary key,
[Date] datetime,
[Path] nvarchar(150) not null,
[Message] nvarchar(max) not null,
[UserId] int,
)
go


Create table LogOperation(
[LogOperationId] int identity(1,1) primary key,
[Date] datetime,
[Controller] nvarchar(25),
[Operation] nvarchar(25),
[Description] nvarchar(50),
[UserId] int
)
go