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

        public async Task<IEnumerable<WListArticle>> GetListArticles(int page)
        {
            _Page *= (page - 1);
            return await _SportNewsContext.WListArticles.Skip(_Page).Take(_DefaultPageSize).ToListAsync();
        }

        public async Task<IEnumerable<WListArticle>> GetListArticlesByCategory(int categoryId, int page)
        {
            _Page *= (page - 1);
            return await _SportNewsContext.WListArticles
                .Where(x => x.CategoryId == categoryId)
                .Skip(_Page).Take(_DefaultPageSize).ToListAsync();
        }

    }
}
