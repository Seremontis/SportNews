using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SportDatabase.Model
{
    public partial class Role
    {
        [Key]
        public int RoleId { get; set; }
        [StringLength(100)]
        public string NameRole { get; set; }
        public bool? CanModify { get; set; }
    }
}