--dodaæ podzia³ dziennikarzy
use master
go

DROP DATABASE IF EXISTS SportNews
go

Create database SportNews
go

use SportNews
go

Create table Roles(
[RoleId] int identity(1,1) primary key,
[NameRole] varchar(100)
)
go

Create table Users(
[UserId] int identity(1,1) primary key,
[FirstName] varchar(50),
[LastName] varchar(80),
[Login] varchar(50),
[Password] binary(64),
[PasswordExpired] datetime,
[RoleId] int foreign key references Roles(RoleId)
)
go

--dokoñczyæ w trakcie budowy apki
Create table [Permissions](
[PermissionId] int identity(1,1) primary key,
[RoleId] int foreign key (RoleId) references Roles(RoleId) not null,
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
[AuthorId] int foreign key references Users(UserId),
[Title] text not null,
[SmallPicture] binary,
[MainPicture] nchar(300), 
[ShortArticle] text,
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
[ArticleId] int foreign key references Articles([ArticleId]) not null,
[Path] nchar(150)
)
go

Create table LogExceptions(
[LogExceptionId] int identity(1,1) primary key,
[Date] datetime,
[Path] nvarchar(150) not null,
[Message] nvarchar(max) not null,
[UserId] int foreign key (UserId) references Users(UserId)
)
go


Create table LogOperation(
[LogOperationId] int identity(1,1) primary key,
[Date] datetime,
[Controller] nvarchar(25),
[Operation] nvarchar(25),
[Description] nvarchar(50),
[UserId] int foreign key (UserId) references Users(UserId)
)
go