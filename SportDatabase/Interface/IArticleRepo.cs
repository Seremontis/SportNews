using SportDatabase.Model;
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
        Task<IEnumerable<WListArticle>> GetListArticles(int page);
        Task<IEnumerable<WListArticle>> GetListArticlesByCategory(int categoryId, int page);
        Task<IEnumerable<WListArticle>> GetLastArticles();
    }
}
