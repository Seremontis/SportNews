﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SportApi.Model
{
    public class User
    {
        public string Login { get; set; }
        public string Password{ get; set; }
        public int Role { get; set; }
        public int UserType { get; set; }
    }
}
