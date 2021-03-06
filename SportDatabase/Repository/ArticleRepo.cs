﻿using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using SportDatabase.Context;
using SportDatabase.Interface;
using SportDatabase.Model;
using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SportDatabase.Repository
{
    public class ArticleRepo : Repository<Article> ,IArticleRepo<Article>
    {
        public ArticleRepo(SportNewsContext newsContext):base(newsContext)
        {
            
        }

        public async Task<WListArticle> GetOne(int id)
        {
            SqlParameter param= new SqlParameter("@SportId",id);
            return (await _SportNewsContext.Set<WListArticle>()
                .FromSqlRaw("SingleShortArticle @SportId", param)
                .ToListAsync()).FirstOrDefault();
        }

        public async Task<WFullArticle> GetFullArticle(int id)
        {
            return await _SportNewsContext.WFullArticles.FindAsync((object)id);
        }

        public async Task<IEnumerable<WListArticle>> GetListArticles(int page,int? size=null)
        {
            if (size == null)
                SetupPageSize(page);
            else
                SetupPageSize(page, size);
            return await _SportNewsContext.WListArticles.OrderByDescending(x=>x.PublicationTime).Skip(_Page).Take(_DefaultPageSize).ToListAsync();
        }

        public async Task<IEnumerable<WListArticle>> GetListArticlesByCategory(int? categoryId, int page)
        {
            SetupPageSize(page);
            List<int> list=new List<int>();
            if(categoryId!=null)
                list = _SportNewsContext.Categories.Where(x => x.AboveCategory == categoryId).Select(x => x.CategoryId).ToList();
            return await _SportNewsContext.WListArticles
                .Where(x => x.CategoryId == categoryId || list.Contains((int)x.CategoryId))
                .Skip(_Page).Take(_DefaultPageSize).ToListAsync();
        }

        public IEnumerable<WListArticle> GetSearcher(string keywords,int page=1)
        {
            string[] keys = keywords.Split();
            SetupPageSize(page);
            List<WListArticle> wLists = new List<WListArticle>();

            foreach (var item in keys)
            {
                 wLists.AddRange(_SportNewsContext.WListArticles.AsNoTracking()
                     .Where(x => x.Keywords.Contains(item.ToLower())));
            };

            return wLists.Skip(_Page).Take(_DefaultPageSize);
        }
    }
}
