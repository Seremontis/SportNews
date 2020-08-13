using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using SportDatabase.Context;
using SportDatabase.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SportDatabase.Repository
{
    public class GalleryRepo: Repository<Gallery>, IGalleryRepo<Gallery>
    {
        public GalleryRepo(SportNewsContext newsContext) : base(newsContext)
        {

        }

        public IEnumerable<Gallery> GetList(int id)
        {
            SqlParameter sqlParameter = new SqlParameter("@articleid", id);
            return _SportNewsContext.Galleries.FromSqlRaw("GetGallery @articleid", sqlParameter).ToList();
        }
    }
}
