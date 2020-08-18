using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using SportDatabase.Context;
using SportDatabase.Interface;
using SportDatabase.Model;
using System;
using System.Collections.Generic;

using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SportDatabase.Repository
{
    public class UserRepo:Repository<User>, IUserRepo<User>
    {
        public UserRepo(SportNewsContext newsContext) : base(newsContext)
        {

        }
        public async Task<WUser> Get(int id)
        {
            SqlParameter idparam = new SqlParameter("@userId", id);
            return (await _SportNewsContext.Set<WUser>()
                .FromSqlRaw("GetWUser @userId", idparam)
                .AsNoTracking()
                .ToListAsync()).SingleOrDefault();
        }
    }
}
