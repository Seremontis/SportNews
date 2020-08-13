using SportDatabase.Interface;
using SportDatabase.Model;
using System.Collections.Generic;

namespace SportDatabase.Repository
{
    public interface IGalleryRepo<T>:IRepository<T> where T: Gallery 
    {
        IEnumerable<T> GetList(int id);
    }
}