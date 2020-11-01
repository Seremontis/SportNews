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
[NameRole] varchar(100),
[CanModify] bit default 1,
)
go

Create table Users(
[UserId] int identity(1,1) primary key,
[FirstName] varchar(50),
[LastName] varchar(80),
[Login] varchar(50),
[Password] nvarchar(max),
[PasswordExpired] datetime,
[RoleId] int,
[UserModified] int ,
[LastModified] datetime
)
go


Create table Categories(
[CategoryId] int identity(1,1) primary key,
[Name] varchar(50),
[SortField] int,
[UserModified] int not null,
[LastModified] datetime not null,
[AboveCategory] int default(null)
)
go

Create table [Permissions](
[PermissionId] int identity(1,1) primary key,
[UserId] int foreign key references Users(UserId) not null,
[CategoryId] int,
[UserModified] int,
[LastModified] datetime
)
go


Create table Articles(
[ArticleId] int identity(1,1) primary key,
[AuthorId] int ,
[Title] text not null,
[Picture] varchar(max), 
[DescritpionPicture] nvarchar(300),
[SourcePicture] nvarchar(100),
[SourceArticle] nvarchar(100),
[ShortArticle] text,
[FullArticle] text,
[Keywords] nchar(100),
[PublicationTime] datetime not null,
[CategoryId] int,
[UserModified] int not null,
[LastModified] datetime not null
)
go


Create table LogExceptions(
[LogExceptionId] int identity(1,1) primary key,
[Date] datetime,
[Path] nvarchar(150) not null,
[Message] nvarchar(max) not null,
[UserId] int not null
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