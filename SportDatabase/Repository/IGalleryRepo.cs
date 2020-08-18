using SportDatabase.Interface;
using SportDatabase.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SportDatabase.Repository
{
    public interface IGalleryRepo<T>:IRepository<T> where T: Gallery 
    {
        Task<List<T>> GetList(int id);
    }
}