using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using SportDatabase.Context;
using SportDatabase.Interface;
using SportDatabase.Model;
using System;
using System.Collections.Generic;
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

        public WListArticle GetOne(int id)
        {
            SqlParameter param= new SqlParameter("@SportId",id);
            var result= _SportNewsContext.Set<WListArticle>()
                .FromSqlRaw("SingleShortArticle @SportId", param).ToList();
            return result.SingleOrDefault();
        }

        public WFullArticle GetFullArticle(int id)
        {
            SqlParameter paramArticle = new SqlParameter("@ArticleId", id);
            var result = _SportNewsContext.Set<WFullArticle>()
                .FromSqlRaw("SingleFullArticle @ArticleId", paramArticle).AsNoTracking().ToList();
            return result.SingleOrDefault();
        }

        public IEnumerable<WListArticle> GetListArticles(int page,int size)
        {
            SqlParameter paramPage = new SqlParameter("@PageNumber", page);
            SqlParameter paramSize = new SqlParameter("@PageSize", size);
            var result = _SportNewsContext.Set<WListArticle>()
                .FromSqlRaw("ListShortArticles @PageNumber,@PageSize", paramPage,paramSize).AsNoTracking().ToList();
            return result;
        }

        public IEnumerable<WListArticle> GetListArticlesByCategory(int categoryId,int page, int size)
        {
            SqlParameter paramPage = new SqlParameter("@PageNumber", page);
            SqlParameter paramSize = new SqlParameter("@PageSize", size);
            SqlParameter paramCategory = new SqlParameter("@CategoryId", categoryId);
            var result = _SportNewsContext.Set<WListArticle>()
                .FromSqlRaw("ListShortArticles @PageNumber,@PageSize,@CategoryId", paramPage, paramSize,paramCategory).AsNoTracking().ToList();
            return result;
        }

    }
}
