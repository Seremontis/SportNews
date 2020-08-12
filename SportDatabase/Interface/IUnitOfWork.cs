﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.SqlExpressions;
using SportDatabase.Model;
using SportDatabase.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SportDatabase.Interface
{
    public interface IUnitOfWork : IDisposable
    {
        IArticleRepo<Article> IRepoArticle {get;}
        IRepository<Category> IRepoCategory{get;}
        IRepository<Gallery> IRepoAGallery{get;}
        IRepository<LogException> IRepoLogException{get;}
        IRepository<Permission> IRepoPermission{get;}
        IRepository<Role> IRepoRole{ get; }
        IRepository<User> IRepoUser{ get; }
        IRepository<LogOperation> IRepoLogOperation { get; }


        void Commit();
        void Rollback();
    }
}