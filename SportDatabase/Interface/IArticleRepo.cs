using SportDatabase.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SportDatabase.Interface
{
    public interface IArticleRepo<T> where T : Article
    {
        WFullArticle GetFullArticle(int id);
        IEnumerable<WListArticle> GetListArticles(int page, int size);
        IEnumerable<WListArticle> GetListArticlesByCategory(int categoryId, int page, int size);
    }
}
