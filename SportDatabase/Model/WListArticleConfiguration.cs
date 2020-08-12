﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore;
using System;

namespace SportDatabase.Model
{
    public class WListArticleConfiguration : IEntityTypeConfiguration<WListArticle>
    {
        public void Configure(EntityTypeBuilder<WListArticle> entity)
        {
            entity.HasNoKey();

            entity.ToView("WListArticles");

            entity.Property(e => e.Name).IsUnicode(false);

            entity.Property(e => e.SmallPicture).IsFixedLength();

            entity.Property(e => e.Title).IsUnicode(false);
        }
    }
}
