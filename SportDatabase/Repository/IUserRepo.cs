using SportDatabase.Interface;
using SportDatabase.Model;

namespace SportDatabase.Repository
{
    public interface IUserRepo<T>:IRepository<T> where T:User
    {
        WUser Get(int id);
    }
}