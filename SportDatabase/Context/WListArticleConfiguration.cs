﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore;
using SportDatabase.Model;
using System;

namespace SportDatabase.Context
{
    public class WlistArticleConfiguration : IEntityTypeConfiguration<WListArticle>
    {
        public void Configure(EntityTypeBuilder<WListArticle> entity)
        {

            entity.ToView("WListArticles");

            entity.Property(e => e.Keywords).IsFixedLength();

            entity.Property(e => e.Name).IsUnicode(false);

            entity.Property(e => e.Picture).IsFixedLength();
        }
    }
}
