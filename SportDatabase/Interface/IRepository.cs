using SportDatabase.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SportDatabase.Interface
{
    public interface IRepository<T> where T: class
    {
        Task<List<T>> Get();
        Task<T> Get(int id);
        Task Add(T model);
        Task Delete(int id);
        void Update(T model);
    }
}
