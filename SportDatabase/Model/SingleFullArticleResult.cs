﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

namespace SportDatabase.Model
{
    public partial class SingleFullArticleResult
    {
        public int ArticleId { get; set; }
        public string Title { get; set; }
        public byte[] SmallPicture { get; set; }
        public string ShortArticle { get; set; }
        public DateTime? PublicationTime { get; set; }
        public DateTime? LastUpdate { get; set; }
        public bool? IsGallery { get; set; }
        public string Name { get; set; }
        public int? CategoryId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
