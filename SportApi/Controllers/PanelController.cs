using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;
using SportApi.Attribute;
using SportApi.Model;
using SportDatabase;
using SportDatabase.Context;
using SportDatabase.Interface;
using SportDatabase.Model;
using SportDatabase.Repository;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Primitives;

namespace SportApi.Controllers
{
    //[AllowCrossSiteJson]
    [Route("Panel")]
    [ApiController]
    //[EnableCors("AllowOrigin")]

    ///  breadcrumbs to Angular
    public class PanelController : ControllerBase
    {
        private readonly IUnitOfWork unitOfWork;
        private Func<Task> sendOperation;
        private GenericOperation genericOperation;

        public PanelController(SportNewsContext sportNewsContext)
        {
            this.unitOfWork = new UnitOfWork(sportNewsContext);
            this.genericOperation = new GenericOperation((UnitOfWork)unitOfWork);
        }

        [Route("")]
        [HttpGet]
        [Authorize(Roles = Policies.All)]
        public string Start()
        {
            return "Witaj w panelu użytkownika";
        }

        [Route("GetArticle/{id}")]
        [HttpGet]
        [Authorize(Roles = Policies.AllWithoutAdmin)]
        public async Task<Article> GetArticle(int id)
        {
            try
            {
                return await unitOfWork.IRepoArticle.Get(id);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [Route("GetListArticle/{pageId}")]
        [HttpGet]
        [Authorize(Roles = Policies.AllWithoutAdmin)]
        public async Task<IEnumerable<WListArticle>> GetListArticle(int pageId)
        {
            try
            {
                return await unitOfWork.IRepoArticle.GetListArticles(pageId);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        [Route("GetUser")]
        [HttpGet]
        [Authorize(Roles = Policies.All)]
        public async Task<WUser> GetUser()
        {
            try
            {
                StringValues stream;
                HttpContext.Request.Headers.TryGetValue("Authorization", out stream);          
                return await unitOfWork.IRepoUser.Get(GetUserId(stream));
            }
            catch (Exception)
            {
                throw;
            }
        }


        [Route("GetWUser/{pageid}")]
        [HttpGet]
        [Authorize(Roles = Policies.AllAdmin)]
        public async Task<List<WUser>> GetWUser(int pageid)
        {
            try
            {
                return await unitOfWork.IRepoUser.GetWList(pageid);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [Route("AddUser")]
        [ValidateModel]
        [HttpPost]
        [Authorize(Roles = Policies.AllAdmin)]
        public async Task<HttpResponseMessage> AddUser([FromBody] SportDatabase.Model.User user)
        {
            sendOperation = async () => { await unitOfWork.IRepoUser.Add(user); };
            StringValues stream;
            HttpContext.Request.Headers.TryGetValue("Authorization", out stream);
            user.UserModified = GetUserId(stream);
            return await genericOperation.Execute(sendOperation, EnumOperation.Add, this.ControllerContext.RouteData, (int)user.UserModified);
        }

        [Route("AddArticle")]
        [ValidateModel]
        [HttpPost]
        [Authorize(Roles = Policies.AllWithoutAdmin)]
        public async Task<HttpResponseMessage> AddArticle([FromBody] Article article)
        {
            StringValues stream;
            HttpContext.Request.Headers.TryGetValue("Authorization", out stream);
            article.UserModified = GetUserId(stream);
            article.LastModified = DateTime.Now;
            sendOperation = async () => { await unitOfWork.IRepoArticle.Add(article); };
            return await genericOperation.Execute(sendOperation, EnumOperation.Add, this.ControllerContext.RouteData, article.UserModified);
        }


        [Route("UpdateArticle")]
        [ValidateModel]
        [HttpPut]
        [Authorize(Roles = Policies.AllWithoutAdmin)]
        public async Task<HttpResponseMessage> UpdateArticle([FromBody] Article article)
        {
            StringValues stream;
            HttpContext.Request.Headers.TryGetValue("Authorization", out stream);
            article.UserModified = GetUserId(stream);
            article.LastModified = DateTime.Now;
            sendOperation = async () => { unitOfWork.IRepoArticle.Update(article); };
            return await genericOperation.Execute(sendOperation, EnumOperation.Update, this.ControllerContext.RouteData,article.UserModified);
        }

        [Route("DeleteArticle/{id}")]
        [HttpDelete]
        [Authorize(Roles = Policies.AllWithoutAdmin)]
        public async Task<HttpResponseMessage> DeleteArticle(int id)
        {
            sendOperation = async () => { await unitOfWork.IRepoArticle.Delete(id); };
            StringValues stream;
            HttpContext.Request.Headers.TryGetValue("Authorization", out stream);
            return await genericOperation.Execute(sendOperation, EnumOperation.Delete, this.ControllerContext.RouteData, GetUserId(stream));
        }

        [Route("DeleteUser/{id}")]
        [HttpDelete]
        [Authorize(Roles = Policies.AllAdmin)]
        public async Task<HttpResponseMessage> DeleteUser(int id)
        {
            sendOperation = async () => { await unitOfWork.IRepoUser.Delete(id); };
            StringValues stream;
            HttpContext.Request.Headers.TryGetValue("Authorization", out stream);
            return await genericOperation.Execute(sendOperation, EnumOperation.Delete, this.ControllerContext.RouteData, GetUserId(stream));
        }

        [Route("UpdateUser")]
        [ValidateModel]
        [HttpPut]
        [Authorize(Roles = Policies.AllAdmin)]
        public async Task<HttpResponseMessage> UpdateUser([FromBody] SportDatabase.Model.User user)
        {          
            sendOperation = async () => { unitOfWork.IRepoUser.Update(user); };
            StringValues stream;
            HttpContext.Request.Headers.TryGetValue("Authorization", out stream);
            user.UserModified = GetUserId(stream);
            return await genericOperation.Execute(sendOperation, EnumOperation.Update, this.ControllerContext.RouteData,(int)user.UserModified);
        }

        [Route("AddCategory")]
        [ValidateModel]
        [HttpPost]
        [Authorize(Roles = Policies.All)]
        public async Task<HttpResponseMessage> AddCategory([FromBody] Category category)
        {
            sendOperation = async () => { await unitOfWork.IRepoCategory.Add(category); };
            StringValues stream;
            HttpContext.Request.Headers.TryGetValue("Authorization", out stream);
            category.UserModified = GetUserId(stream);
            category.LastModified = DateTime.Now;
            return await genericOperation.Execute(sendOperation, EnumOperation.Add, this.ControllerContext.RouteData,category.UserModified);
        }

        [Route("UpdateCategory")]
        [ValidateModel]
        [HttpPut]
        [Authorize(Roles = Policies.All)]
        public async Task<HttpResponseMessage> UpdateCategory([FromBody] Category categories)
        {
            sendOperation = async () =>
            {
                categories.LastModified = DateTime.Now;
                unitOfWork.IRepoCategory.Update(categories);
            };
            StringValues stream;
            HttpContext.Request.Headers.TryGetValue("Authorization", out stream);
            return await genericOperation.Execute(sendOperation, EnumOperation.Update, this.ControllerContext.RouteData, GetUserId(stream));
        }

        [Route("DeleteCategory/{id}")]
        [HttpDelete]
        [Authorize(Roles = Policies.All)]
        public async Task<HttpResponseMessage> DeleteCategory(int id)
        {
            sendOperation = async () => { await unitOfWork.IRepoCategory.Delete(id); };
            StringValues stream;
            HttpContext.Request.Headers.TryGetValue("Authorization", out stream);
            return await genericOperation.Execute(sendOperation, EnumOperation.Delete, this.ControllerContext.RouteData,GetUserId(stream));
        }

        [Route("GetCategory")]
        [HttpGet]
        [Authorize(Roles = Policies.All)]
        public async Task<IEnumerable<WCategory>> GetCategory()
        {
            try
            {
                return await unitOfWork.IRepoCategory.GetView();
            }
            catch (Exception)
            {
                throw;
            }
        }

        [Route("MoveUpCategory")]
        [HttpPut]
        [Authorize(Roles = Policies.All)]
        public async Task<HttpResponseMessage> MoveUpCategory([FromBody] int id)
        {
            sendOperation = async () =>{await unitOfWork.IRepoCategory.MoveUp(id);};
            StringValues stream;
            HttpContext.Request.Headers.TryGetValue("Authorization", out stream);
            return await genericOperation.Execute(sendOperation, EnumOperation.Update, this.ControllerContext.RouteData,GetUserId(stream));
        }
        [Route("MoveDownCategory")]
        [HttpPut]
        [Authorize(Roles = Policies.All)]
        public async Task<HttpResponseMessage> MoveDowCategory(int id)
        {
            sendOperation = async () =>{await unitOfWork.IRepoCategory.MoveDown(id);};
            StringValues stream;
            HttpContext.Request.Headers.TryGetValue("Authorization", out stream);
            return await genericOperation.Execute(sendOperation, EnumOperation.Update, this.ControllerContext.RouteData,GetUserId(stream));
        }


        #region metody pomocniczne
        private int GetUserId(StringValues stream)
        {
            try
            {
                string str = stream[0].Replace("Bearer ", string.Empty);
                var handler = new JwtSecurityTokenHandler();
                var jsonToken = handler.ReadToken(str);
                var tokenS = handler.ReadToken(str) as JwtSecurityToken;
                var jti = tokenS.Claims.First(claim => claim.Type == "loginId").Value;
                return int.Parse(jti);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        #endregion
    }
}
