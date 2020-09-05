﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore;
using SportDatabase.Model;
using System;

namespace SportDatabase.Context
{
    public class ArticleConfiguration : IEntityTypeConfiguration<Article>
    {
        public void Configure(EntityTypeBuilder<Article> entity)
        {
            entity.Property(e => e.IsGallery).HasDefaultValueSql("((0))");

            entity.Property(e => e.Keywords).IsFixedLength();

            entity.Property(e => e.MainPicture).IsFixedLength();

            entity.Property(e => e.SmallPicture).IsFixedLength();

            entity.HasOne(d => d.Author)
                .WithMany(p => p.Articles)
                .HasForeignKey(d => d.AuthorId)
                .HasConstraintName("FK__Articles__Author__412EB0B6");
        }
    }
}