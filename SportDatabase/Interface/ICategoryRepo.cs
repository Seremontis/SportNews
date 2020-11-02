using SportDatabase.Interface;
using SportDatabase.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SportDatabase.Repository
{
    public interface ICategoryRepo<T>:IRepository<T> where T: Category
    {
        Task MoveUp(int id);
        Task MoveDown(int id);

        Task<IEnumerable<WCategory>> Get(int idCategory);
        Task<IEnumerable<WCategory>> GetView();
        //Task AddCategory(Category category);
    }
}
