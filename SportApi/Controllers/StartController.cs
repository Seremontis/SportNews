using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
    public class StartController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        //change on DI
        public StartController(SportNewsContext sportNewsContext)
        {
            this._unitOfWork = new UnitOfWork(sportNewsContext);
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
                return _unitOfWork.IRepoArticle.GetFullArticle(id);
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
                return _unitOfWork.IRepoArticle.GetListArticles(page,size);
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
                return _unitOfWork.IRepoArticle.GetListArticlesByCategory(categoryId,page, size);
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
                return _unitOfWork.IRepoCategory.Get();
            }
            catch (Exception)
            {
                throw;
            }

        }
    }
}
