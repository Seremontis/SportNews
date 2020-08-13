using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SportDatabase;
using SportDatabase.Context;
using SportDatabase.Interface;
using SportDatabase.Model;
using SportDatabase.Repository;

namespace SportApi.Controllers
{
    [Route("Api")]
    [ApiController]
    public class StartController : ErrorsController
    {
        private readonly IUnitOfWork unitOfWork;

        //change on DI
        public StartController(SportNewsContext sportNewsContext)
        {
            this.unitOfWork = new UnitOfWork(sportNewsContext);
        }
        [HttpGet]
        [Route("")]
        public string TextLauncher()
        {
            return "Witaj w Api serwisu sportowego";
        }
        [HttpGet]
        [Route("GetArticle/{id}")]
        public WFullArticle GetArticle(int id)
        {
            try
            {
                var result= unitOfWork.IRepoArticle.GetFullArticle(id);
                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet]
        [Route("GetAllArticles/{size}/{page}")]
        public IEnumerable<WListArticle> GetAllArticles(int page=1,int size=10)
        {
            try
            {
                var result = unitOfWork.IRepoArticle.GetListArticles(page,size);
                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
        [HttpGet]
        [Route("GetAllArticlesSport/{categoryId}/{size}/{page}")]
        public IEnumerable<WListArticle> GetAllArticlesSport(int categoryId,int page = 1, int size = 10)
        {
            try
            {
                var result = unitOfWork.IRepoArticle.GetListArticlesByCategory(categoryId,page, size);
                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }      
        [HttpGet]
        [Route("GetCategories")]
        public IEnumerable<Category> GetCategories()
        {
            try
            {
                var result = unitOfWork.IRepoCategory.Get();
                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
