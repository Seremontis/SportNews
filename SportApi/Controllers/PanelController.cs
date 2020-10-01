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

namespace SportApi.Controllers
{
    //[AllowCrossSiteJson]
    [Route("Panel")]
    [ApiController]
    //[EnableCors("AllowOrigin")]

    /// TODO :co zrobić z użytkownika których nie można usunąć oraz obiektami
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
        //[Authorize(Roles = Policies.AllAdmin)]
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
        //[Authorize(Roles = Policies.AllAdmin)]
        public async Task<IEnumerable<WListArticle>> GetListArticle(int pageId)
        {
            try
            {
                return await unitOfWork.IRepoArticle.GetListArticles(pageId);               
            }
            catch (Exception)
            {
                throw;
            }
        }

        [Route("GetUser/{id}")]
        [HttpGet]
        [Authorize(Roles=Policies.AllAdmin)]
        public async Task<WUser> GetUser(int id)
        {
            try
            {
                return await unitOfWork.IRepoUser.Get(id);
            }
            catch (Exception)
            {
                throw;
            }
        }


        [Route("GetWUser/{pageid}")]
        [HttpGet]
        //[Authorize(Roles = Policies.AllAdmin)]
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
        //[ValidateModel]
        [HttpPost]
        //[Authorize(Roles = Policies.AllAdmin)]
        public async Task<HttpResponseMessage> AddUser([FromBody] SportDatabase.Model.User user)
        {

            sendOperation = async()=> { await unitOfWork.IRepoUser.Add(user); };
            return await genericOperation.Execute(sendOperation, EnumOperation.Add, this.ControllerContext.RouteData);
        }

        [Route("AddArticle")]
        //[ValidateModel]
        [HttpPost]
        //[Authorize(Roles = Policies.AllAdmin)]
        public async Task<HttpResponseMessage> AddArticle([FromBody] SportDatabase.Model.Article article)
        {
            article.LastModified = DateTime.Now;
            sendOperation = async () => { await unitOfWork.IRepoArticle.Add(article); };
            return await genericOperation.Execute(sendOperation, EnumOperation.Add, this.ControllerContext.RouteData);
        }


        [Route("UpdateArticle")]
        //[ValidateModel]
        [HttpPut]
        //[Authorize(Roles = Policies.AllAdmin)]
        public async Task<HttpResponseMessage> UpdateUser([FromBody] SportDatabase.Model.Article article)
        {
            article.LastModified = DateTime.Now;
            //article.UserModified =;
            sendOperation = async () => { unitOfWork.IRepoArticle.Update(article); };
            return await genericOperation.Execute(sendOperation, EnumOperation.Update, this.ControllerContext.RouteData);
        }

        [Route("DeleteUser/{id}")]
        [HttpDelete]
        [Authorize(Roles =Policies.AllAdmin)]
        public async Task<HttpResponseMessage> DeleteUser(int id)
        {            
            sendOperation = async() => {await unitOfWork.IRepoUser.Delete(id); };
            return await genericOperation.Execute(sendOperation, EnumOperation.Delete, this.ControllerContext.RouteData);
        }

        [Route("UpdateUser")]
        [ValidateModel]
        [HttpPut]
        [Authorize(Roles = Policies.AllAdmin)]
        public async Task<HttpResponseMessage> UpdateUser([FromBody] SportDatabase.Model.User user)
        {
            sendOperation = async() => { unitOfWork.IRepoUser.Update(user); };
            return await genericOperation.Execute(sendOperation, EnumOperation.Update, this.ControllerContext.RouteData);
        }

        [Route("AddCategory")]
        //[ValidateModel]
        [HttpPost]
        //[Authorize(Roles = Policies.AllAdmin)]
        public async Task<HttpResponseMessage> AddCategory([FromBody] Category category)
        {
            sendOperation = async()=>
            {
                   await unitOfWork.IRepoCategory.Add(category);
            };
            return await genericOperation.Execute(sendOperation, EnumOperation.Add, this.ControllerContext.RouteData);
        }

        [Route("UpdateCategory")]
        //[ValidateModel]
        [HttpPut]
        //[Authorize(Roles = Policies.AllAdmin)]
        public async Task<HttpResponseMessage> UpdateCategory([FromBody] Category categories)
        {
            sendOperation = async() =>
            {
                    categories.LastModified = DateTime.Now;
                    unitOfWork.IRepoCategory.Update(categories);
            };
            return await genericOperation.Execute(sendOperation, EnumOperation.Update, this.ControllerContext.RouteData);
        }

        [Route("DeleteCategory/{id}")]
        [HttpDelete]
        //[Authorize(Roles = Policies.AllAdmin)]
        public async Task<HttpResponseMessage> DeleteCategory(int id)
        {
            sendOperation = async () => { await unitOfWork.IRepoCategory.Delete(id); };
            return await genericOperation.Execute(sendOperation, EnumOperation.Delete, this.ControllerContext.RouteData);
        }

        [Route("GetCategory")]
        [HttpGet]
        //[Authorize(Roles = Policies.All)]
        public async Task<IEnumerable<WCategory>> GetCategory()     //parameter id and return category from Table permission
        {
            try
            {
                return await unitOfWork.IRepoCategory.GetView();
            }
            catch (Exception)
            {
                throw;
                //return Ok((object)"Wystąpił nieoczekiwany błąd");
            }
        }

        [Route("MoveUpCategory")]
        [HttpPut]
        //[Authorize(Roles = Policies.All)]
        public async Task<HttpResponseMessage> MoveUpCategory([FromBody]int id)
        {
            sendOperation = async () =>
            {
                await unitOfWork.IRepoCategory.MoveUp(id);
            };
            return await genericOperation.Execute(sendOperation, EnumOperation.Update, this.ControllerContext.RouteData);
        }
        [Route("MoveDownCategory")]
        [HttpPut]
        //[Authorize(Roles = Policies.All)]
        public async Task<HttpResponseMessage> MoveDowCategory(int id)
        {
            sendOperation = async () =>
            {
                await unitOfWork.IRepoCategory.MoveDown(id);
            };
            return await genericOperation.Execute(sendOperation, EnumOperation.Update, this.ControllerContext.RouteData);
        }
    }
}
