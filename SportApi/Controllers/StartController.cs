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
        public async Task<WFullArticle> GetArticle(int id)
        {
            try
            {
                return await _unitOfWork.IRepoArticle.GetFullArticle(id);
            }
            catch (Exception)
            {
                throw;
            }
        }


        [HttpGet]
        [AllowAnonymous]
        [Route("GetLastArticles")]
        public async Task<IEnumerable<WListArticle>> GetAllArticles()
        {
            try
            {
                return await _unitOfWork.IRepoArticle.GetLastArticles();
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("GetAllArticles/{page}")]
        public async Task<IEnumerable<WListArticle>> GetAllArticles(int page=1)
        {
            try
            {
                return await _unitOfWork.IRepoArticle.GetListArticles(page);
            }
            catch (Exception)
            {
                throw;
            }
        }
        [HttpGet]
        [Route("GetArticlesByCategory/{categoryId}/{size}")]
        [AllowAnonymous]
        public async Task<IEnumerable<WListArticle>> GetArticlesByCategory(int categoryId,int page = 1)
        {
            try
            {
                return await _unitOfWork.IRepoArticle.GetListArticlesByCategory(categoryId,page);
            }
            catch (Exception)
            {
                throw;
            }
        }      
        [HttpGet]
        [Route("GetCategories")]
        [AllowAnonymous]
        public async Task<List<Category>> GetCategories()
        {
            try
            {
                return await _unitOfWork.IRepoCategory.Get();
            }
            catch (Exception)
            {
                throw;
            }

        }
    }
}
