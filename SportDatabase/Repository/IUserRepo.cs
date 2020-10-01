using SportDatabase.Interface;
using SportDatabase.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SportDatabase.Repository
{
    public interface IUserRepo<T>:IRepository<T> where T:User
    {
        Task<WUser> Get(int id);

        Task<List<WUser>> GetWList(int idpage);
    }
}