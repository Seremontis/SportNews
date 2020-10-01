﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SportDatabase.Model
{
    public partial class Article
    {
        [Key]
        public int ArticleId { get; set; }
        public int? AuthorId { get; set; }
        [Required]
        [Column(TypeName = "text")]
        public string Title { get; set; }
        [MaxLength(1)]
        public byte[] SmallPicture { get; set; }
        [StringLength(300)]
        public string Picture { get; set; }
        [StringLength(300)]
        public string DescritpionPicture { get; set; }
        [StringLength(100)]
        public string SourcePicture { get; set; }
        [Column(TypeName = "text")]
        public string ShortArticle { get; set; }
        [Column("Article", TypeName = "text")]
        public string FullArticle { get; set; }
        [StringLength(100)]
        public string Keywords { get; set; }
        [Column(TypeName = "date")]
        public DateTime PublicationTime { get; set; }
        [JsonConverter(typeof(IntToStringConverter))]
        public int? CategoryId { get; set; }
        public int UserModified { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime LastModified { get; set; }
    }
}