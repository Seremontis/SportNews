﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore;
using System;

namespace SportDatabase.Model
{
    public class WFullArticleConfiguration : IEntityTypeConfiguration<WFullArticle>
    {
        public void Configure(EntityTypeBuilder<WFullArticle> entity)
        {
            entity.HasNoKey();

            entity.ToView("WFullArticle");

            entity.Property(e => e.FirstName).IsUnicode(false);

            entity.Property(e => e.LastName).IsUnicode(false);

            entity.Property(e => e.Name).IsUnicode(false);

            entity.Property(e => e.SmallPicture).IsFixedLength();

            entity.Property(e => e.Title).IsUnicode(false);
        }
    }
}