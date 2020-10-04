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
            return await _SportNewsContext.WUsers.FindAsync((object)id);
        }

        public async Task<List<WUser>> GetWList(int page)
        {
            SetupPageSize(page);
            return await _SportNewsContext.WUsers.Skip(_Page).Take(_DefaultPageSize).ToListAsync();
        }
    }
}
