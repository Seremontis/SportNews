using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;
using SportDatabase;
using SportDatabase.Context;
using SportDatabase.Interface;
using SportDatabase.Model;
using SportDatabase.Repository;

namespace SportApi.Controllers
{
    [Route("Panel")]
    [ApiController]
    public class PanelController : ErrorsController
    {
        private readonly IUnitOfWork unitOfWork;
        private Action sendOperation;
        GenericOperation genericOperation;

        public PanelController(SportNewsContext sportNewsContext)
        {
            this.unitOfWork = new UnitOfWork(sportNewsContext);
            this.genericOperation = new GenericOperation((UnitOfWork)unitOfWork);
        }

        [Route("")]
        [HttpGet]
        public string Start()
        {
            return "Witaj w panelu użytkownika";
        }

        [Route("GetUser/{id}")]
        [HttpGet]
        public WUser GetUser(int id)
        {
            try
            {
                var result=unitOfWork.IRepoUser.Get(id);
                return result;
            }
            catch (Exception)
            {

                throw;
            }
        }

        [Route("AddUser")]
        [HttpPost]
        public HttpResponseMessage AddUser([FromBody]User user)
        {
            sendOperation = delegate { unitOfWork.IRepoUser.Add(user); };
            return genericOperation.Execute(sendOperation, EnumOperation.Add, this.ControllerContext.RouteData);
        }

        [Route("DeleteUser/{userid}")]
        [HttpDelete]
        public HttpResponseMessage DeleteUser(int userid)
        {            
            sendOperation = delegate { unitOfWork.IRepoUser.Delete(userid); };
            return genericOperation.Execute(sendOperation, EnumOperation.Delete, this.ControllerContext.RouteData);
        }

        [Route("UpdateUser")]
        [HttpPut]
        public HttpResponseMessage UpdateUser([FromBody]User user)
        {
            sendOperation = delegate { unitOfWork.IRepoUser.Add(user); };
            return genericOperation.Execute(sendOperation, EnumOperation.Update,this.ControllerContext.RouteData);
        }

        [Route("AddCategory")]
        [HttpPost]
        public HttpResponseMessage AddCategory([FromBody] Category[] categories)
        {               
                sendOperation = delegate {
                    foreach (var item in categories)
                        unitOfWork.IRepoCategory.Add(item);
                };
                return genericOperation.Execute(sendOperation, EnumOperation.Add, this.ControllerContext.RouteData);
            }

        [Route("UpdateCategory")]
        [HttpPut]
        public HttpResponseMessage UpdateCategory([FromBody] Category[] categories)
        {
            sendOperation = delegate
            {
                foreach (var item in categories)
                    unitOfWork.IRepoCategory.Update(item);
            };
            return genericOperation.Execute(sendOperation, EnumOperation.Update, this.ControllerContext.RouteData);
        }

        [Route("GetGallery/{id}")]
        [HttpGet]
        public IEnumerable<Gallery> GetGallery(int idArticle)
        {
            try
            {
                var result = unitOfWork.IRepoGallery.GetList(idArticle);
                return result;
            }
            catch (Exception)
            {

                throw;
            }
        }

        [Route("AddGallery")]
        [HttpPost]
        public HttpResponseMessage AddGallery([FromBody] Gallery[] galleries)
        {
            sendOperation = delegate
            {
                foreach (var item in galleries)
                    unitOfWork.IRepoGallery.Add(item);
            };
            return genericOperation.Execute(sendOperation, EnumOperation.Add, this.ControllerContext.RouteData);
        }

        [Route("DeleteGallery")]
        [HttpDelete]
        public HttpResponseMessage DeleteGallery(int[] galleries)
        {
            sendOperation = delegate
            {
                foreach (var item in galleries)
                    unitOfWork.IRepoGallery.Delete(item);
            };
            return genericOperation.Execute(sendOperation, EnumOperation.Add, this.ControllerContext.RouteData);

        }

    }
}
