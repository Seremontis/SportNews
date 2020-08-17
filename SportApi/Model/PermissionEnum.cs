using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SportApi.Model
{
    [Flags]
    public enum PermissionEnum
    {
        None=0,
        Read=1,
        Modify=2,
        Create=4,
    }
}
