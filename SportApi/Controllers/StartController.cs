﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using Microsoft.AspNetCore.Mvc;
using SportApi.Model;
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


        public StartController(IUnitOfWork unitOfwork)
        {
            this._unitOfWork = unitOfwork;
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
        [Route("GetListArticles")]
        public async Task<IEnumerable<WListArticle>> GetAllArticles()
        {
            try
            {
                return await _unitOfWork.IRepoArticle.GetListArticles(1);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("GetListArticles/{page}")]
        public async Task<IEnumerable<WListArticle>> GetAllArticles(int page)
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
        [Route("GetArticlesByCategory/{categoryId}/{page}")]
        [AllowAnonymous]
        public async Task<IEnumerable<WListArticle>> GetArticlesByCategory(int? categoryId,int page = 1)
        {
            try
            {
                categoryId = categoryId == 0 ? null : categoryId;
                return await _unitOfWork.IRepoArticle.GetListArticlesByCategory(categoryId,page);
            }
            catch (Exception)
            {
                throw;
            }
        }      
        [HttpGet]
        [Route("GetCategories/{id?}")]
        [AllowAnonymous]
        public async Task<IEnumerable<WCategory>> GetCategories(int? idCategory=null)
        {
            try
            {
                if (idCategory == null || idCategory == 0)
                    return await _unitOfWork.IRepoCategory.GetView();
                else
                    return await _unitOfWork.IRepoCategory.Get((int)idCategory);
            }
            catch (Exception)
            {
                throw;
            }

        }
        [Microsoft.AspNetCore.Mvc.HttpPost]
        [Route("GetSearcher")]
        [AllowAnonymous]
        public IEnumerable<WListArticle> GetSearcher([Microsoft.AspNetCore.Mvc.FromBody] ModelKeyword keyword)
        {
            try
            {
                return _unitOfWork.IRepoArticle.GetSearcher(keyword.keywords,keyword.page);
            }
            catch (Exception e)
            {
                throw;
            }

        }
    }
}
