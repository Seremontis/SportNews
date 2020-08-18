using Microsoft.EntityFrameworkCore;
using SportDatabase.Context;
using SportDatabase.Interface;
using SportDatabase.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Remoting.Messaging;
using System.Text;
using System.Threading.Tasks;

namespace SportDatabase.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private SportNewsContext _Context { get; }

        private IArticleRepo<Article> _IRepoArticle;
        private IRepository<Category> _IRepoCategory;
        private IGalleryRepo<Gallery> _IRepoGallery;
        private IRepository<LogException> _IRepoLogException;
        private IRepository<Permission> _IRepoPermission;
        private IRepository<Role> _IRepoRole;
        private IUserRepo<User> _IRepoUser;
        private IRepository<LogOperation> _IRepoLogOperation;

        public UnitOfWork(SportNewsContext context)
        {
            _Context = context;
        }

        //add async task
        public async Task Commit()
        {
            await _Context.SaveChangesAsync();
        }

        public async Task Rollback()
        {
            await _Context.DisposeAsync();
        }

        public void Dispose()
        {
            _Context.Dispose();
        }
        public IArticleRepo<Article> IRepoArticle => _IRepoArticle=_IRepoArticle??new ArticleRepo(_Context);

        public IRepository<Category> IRepoCategory => _IRepoCategory = _IRepoCategory ?? new Repository<Category>(_Context);

        public IGalleryRepo<Gallery> IRepoGallery => _IRepoGallery = _IRepoGallery ?? new GalleryRepo(_Context);

        public IRepository<LogException> IRepoLogException => _IRepoLogException = _IRepoLogException ?? new Repository<LogException>(_Context);

        public IRepository<Permission> IRepoPermission => _IRepoPermission = _IRepoPermission ?? new Repository<Permission>(_Context);

        public IRepository<Role> IRepoRole => _IRepoRole = _IRepoRole ?? new Repository<Role>(_Context);
       
        public IUserRepo<User> IRepoUser => _IRepoUser = _IRepoUser ?? new UserRepo(_Context);

        public IRepository<LogOperation> IRepoLogOperation => _IRepoLogOperation = _IRepoLogOperation ?? new Repository<LogOperation>(_Context);
    }
}
