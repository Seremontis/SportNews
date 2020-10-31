using SportDatabase.Interface;
using SportDatabase.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SportDatabase.Repository
{
    public interface IUserRepo<T>:IRepository<T> where T:User
    {
        Task<User> CheckUser(User user);
        Task<WUser> Get(int id);
        Task<User> GetEdit(int id);
        Task<List<WUser>> GetWList(int idpage);
    }
}