using Microsoft.EntityFrameworkCore;
using SportDatabase.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SportDatabase
{
    public class BaseContext:DbContext, IBaseContext
    {
        public BaseContext():base()
        {

        }
    }
}
