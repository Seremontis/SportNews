﻿using SportDatabase.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SportDatabase.Interface
{
    public interface IArticleRepo<T>: IRepository<T> where T:Article
    {
        Task<WListArticle> GetOne(int id);
        Task<WFullArticle> GetFullArticle(int id);
        Task<IEnumerable<WListArticle>> GetListArticles(int page,int? size=null);
        Task<IEnumerable<WListArticle>> GetListArticlesByCategory(int? categoryId, int page);
        IEnumerable<WListArticle> GetSearcher(string keywords, int page);
    }
}
