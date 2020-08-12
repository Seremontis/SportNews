using Microsoft.EntityFrameworkCore;
using SportDatabase.Interface;
using SportDatabase.Model;
using System;

namespace SportDatabase
{
    public interface ISportNewsContext:IBaseContext, IDisposable
    {
        DbSet<Article> Articles { get; set; }
        DbSet<Category> Categories { get; set; }
        DbSet<Gallery> Gallery { get; set; }
        DbSet<LogException> LogExceptions { get; set; }
        DbSet<Permission> Permissions { get; set; }
        DbSet<Role> Roles { get; set; }
        DbSet<User> Users { get; set; }
        DbSet<LogOperation> LogOperations { get; set; }
    }
}