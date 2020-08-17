using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using Microsoft.AspNetCore.Mvc;
using SportDatabase;
using SportDatabase.Context;
using SportDatabase.Interface;
using SportDatabase.Model;
using SportDatabase.Repository;
using HttpGetAttribute = System.Web.Http.HttpGetAttribute;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

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
        [AllowAnonymous]
        public string TextLauncher()
        {
            return "Witaj w Api serwisu sportowego";
        }
        [HttpGet]
        [Route("GetArticle/{id}")]
        [AllowAnonymous]
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
        [AllowAnonymous]
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
        [AllowAnonymous]
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
        [AllowAnonymous]
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
