﻿using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using SportDatabase.Interface;
using SportDatabase.Model;

namespace SportDatabase.Context
{
    public partial class SportNewsContext :  DbContext, ISportNewsContext
    {
        public SportNewsContext()
        {
        }

        public SportNewsContext(DbContextOptions<SportNewsContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Article> Articles { get; set; }
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<LogException> LogExceptions { get; set; }
        public virtual DbSet<LogOperation> LogOperations { get; set; }
        public virtual DbSet<Permission> Permissions { get; set; }
        public virtual DbSet<Role> Roles { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<WCategory> WCategories { get; set; }
        public virtual DbSet<WFullArticle> WFullArticles { get; set; }
        public virtual DbSet<WListArticle> WListArticles { get; set; }
        public virtual DbSet<WUser> WUsers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new ArticleConfiguration());
            modelBuilder.ApplyConfiguration(new CategoryConfiguration());
            modelBuilder.ApplyConfiguration(new PermissionConfiguration());
            modelBuilder.ApplyConfiguration(new RoleConfiguration());
            modelBuilder.ApplyConfiguration(new UserConfiguration());
            modelBuilder.ApplyConfiguration(new WcategoryConfiguration());
            modelBuilder.ApplyConfiguration(new WfullArticleConfiguration());
            modelBuilder.ApplyConfiguration(new WlistArticleConfiguration());
            modelBuilder.ApplyConfiguration(new WuserConfiguration());

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);

        /*public DbSet<T> Set<T>() where T : class
        {
            return Set<T>();
        }*/
    }
}
