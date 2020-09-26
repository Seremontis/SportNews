using Microsoft.EntityFrameworkCore;
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
        ICategoryRepo<Category> IRepoCategory{get;}
        IRepository<Permission> IRepoPermission{get;}
        IRepository<Role> IRepoRole{ get; }
        IUserRepo<User> IRepoUser{ get; }
        IRepository<LogException> IRepoLogException { get; }
        IRepository<LogOperation> IRepoLogOperation { get; }

        Task Commit();
        Task Rollback();
    }
}
