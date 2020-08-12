﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using Microsoft.Data.SqlClient;
using System;
using System.Threading.Tasks;
using SportDatabase.Model;

namespace SportDatabase.Model
{
    public partial class SportNewsContextProcedures
    {
        private readonly SportNewsContext _context;

        public SportNewsContextProcedures(SportNewsContext context)
        {
            _context = context;
        }

        public async Task<ListShortArticlesResult[]> ListShortArticles(int? PageNumber,int? PageSize)
        {
            var parameterPageNumber = new SqlParameter
            {
                ParameterName = "PageNumber",
                Precision = 10,
                Size = 4,
                SqlDbType = System.Data.SqlDbType.Int,
                Value = PageNumber,
            };

            var parameterPageSize = new SqlParameter
            {
                ParameterName = "PageSize",
                Precision = 10,
                Size = 4,
                SqlDbType = System.Data.SqlDbType.Int,
                Value = PageSize,
            };

            var result = await _context.SqlQuery<ListShortArticlesResult>("EXEC [dbo].[ListShortArticles] @PageNumber,@PageSize  ",parameterPageNumber,parameterPageSize);

            return result;
        }

        public async Task<ListShortArticlesByCategoryResult[]> ListShortArticlesByCategory(int? PageNumber,int? PageSize,int? CategoryId)
        {
            var parameterPageNumber = new SqlParameter
            {
                ParameterName = "PageNumber",
                Precision = 10,
                Size = 4,
                SqlDbType = System.Data.SqlDbType.Int,
                Value = PageNumber,
            };

            var parameterPageSize = new SqlParameter
            {
                ParameterName = "PageSize",
                Precision = 10,
                Size = 4,
                SqlDbType = System.Data.SqlDbType.Int,
                Value = PageSize,
            };

            var parameterCategoryId = new SqlParameter
            {
                ParameterName = "CategoryId",
                Precision = 10,
                Size = 4,
                SqlDbType = System.Data.SqlDbType.Int,
                Value = CategoryId,
            };

            var result = await _context.SqlQuery<ListShortArticlesByCategoryResult>("EXEC [dbo].[ListShortArticlesByCategory] @PageNumber,@PageSize,@CategoryId  ",parameterPageNumber,parameterPageSize,parameterCategoryId);

            return result;
        }

        public async Task<SingleFullArticleResult[]> SingleFullArticle(int? ArticleId)
        {
            var parameterArticleId = new SqlParameter
            {
                ParameterName = "ArticleId",
                Precision = 10,
                Size = 4,
                SqlDbType = System.Data.SqlDbType.Int,
                Value = ArticleId,
            };

            var result = await _context.SqlQuery<SingleFullArticleResult>("EXEC [dbo].[SingleFullArticle] @ArticleId  ",parameterArticleId);

            return result;
        }

        public async Task<SingleShortArticleResult[]> SingleShortArticle(int? SportId)
        {
            var parameterSportId = new SqlParameter
            {
                ParameterName = "SportId",
                Precision = 10,
                Size = 4,
                SqlDbType = System.Data.SqlDbType.Int,
                Value = SportId,
            };

            var result = await _context.SqlQuery<SingleShortArticleResult>("EXEC [dbo].[SingleShortArticle] @SportId  ",parameterSportId);

            return result;
        }
    }
}