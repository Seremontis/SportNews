using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SportApi.Model
{
    public enum EnumPolicy
    {
        All = 0,
        SuperAdmin = 1,
        Admin = 2,
        FullJournalist = 3,
        CustomJournalist = 4,
        AllAdmin = 5,
    }
}
