﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SportDatabase.Model
{
    [Table("Gallery")]
    public partial class Gallery
    {
        [Key]
        public int GalleryId { get; set; }
        public int ArticleId { get; set; }
        [StringLength(150)]
        public string Path { get; set; }

        [ForeignKey(nameof(ArticleId))]
        [InverseProperty("Galleries")]
        public virtual Article Article { get; set; }
    }
}