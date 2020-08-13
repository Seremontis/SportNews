﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore;
using SportDatabase.Model;
using System;

namespace SportDatabase.Context
{
    public class LogExceptionConfiguration : IEntityTypeConfiguration<LogException>
    {
        public void Configure(EntityTypeBuilder<LogException> entity)
        {
            entity.HasOne(d => d.User)
                .WithMany(p => p.LogExceptions)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__LogExcept__UserI__47DBAE45");
        }
    }
}
