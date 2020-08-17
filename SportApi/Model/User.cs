using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SportApi.Model
{
    public class User
    {
        public string UserName { get; set; }
        public string Password{ get; set; }//byte
        public string Role { get; set; }
        public string UserType { get; set; }
    }
}
