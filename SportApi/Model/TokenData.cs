using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SportApi.Model
{
    public class TokenData
    {
        public int IdUser { get; set; }
        public int Role { get; set; }
        public string UserType { get; set; }
    }
}
