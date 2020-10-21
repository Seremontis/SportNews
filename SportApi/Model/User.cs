using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SportApi.Model
{
    public class User
    {
        public string Login { get; set; }
        public string Password{ get; set; }
        public string Role { get; set; }
        public string UserType { get; set; }
    }
}
