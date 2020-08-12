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
        IEnumerable<T> Get();
        IEnumerable<T> Get(int page);
/*        T GetOne(int id)*/
        void Add(T model);
        void Delete(int id);
        void Update(T model);
    }
}
