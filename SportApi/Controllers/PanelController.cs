using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;
using SportApi.Attribute;
using SportDatabase;
using SportDatabase.Context;
using SportDatabase.Interface;
using SportDatabase.Model;
using SportDatabase.Repository;

namespace SportApi.Controllers
{
    [Route("Panel")]
    [ApiController]
    public class PanelController : ControllerBase
    {
        private readonly IUnitOfWork unitOfWork;
        private Action sendOperation;
        private GenericOperation genericOperation;

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
                return unitOfWork.IRepoUser.Get(id);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [Route("AddUser")]
        [ValidateModel]
        [HttpPost]
        public HttpResponseMessage AddUser([FromBody]User user)
        {

            sendOperation = delegate { unitOfWork.IRepoUser.Add(user); };
            return genericOperation.Execute(sendOperation, EnumOperation.Add, this.ControllerContext.RouteData);
        }

        [Route("DeleteUser/{id}")]
        [HttpDelete]
        public HttpResponseMessage DeleteUser(int id)
        {            
            sendOperation = delegate { unitOfWork.IRepoUser.Delete(id); };
            return genericOperation.Execute(sendOperation, EnumOperation.Delete, this.ControllerContext.RouteData);
        }

        [Route("UpdateUser")]
        [ValidateModel]
        [HttpPut]
        public HttpResponseMessage UpdateUser([FromBody]User user)
        {
            sendOperation = delegate { unitOfWork.IRepoUser.Add(user); };
            return genericOperation.Execute(sendOperation, EnumOperation.Update,this.ControllerContext.RouteData);
        }

        [Route("AddCategory")]
        [ValidateModel]
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
        [ValidateModel]
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

        [Route("DeleteCategory/{id}")]
        [HttpDelete]
        public HttpResponseMessage DeleteCategory(int id)
        {
            sendOperation = delegate { unitOfWork.IRepoCategory.Delete(id); };
            return genericOperation.Execute(sendOperation, EnumOperation.Delete, this.ControllerContext.RouteData);
        }

        [Route("GetCategory")]
        [HttpGet]
        public IEnumerable<Category> GetCategory()
        {
            try
            {
                return unitOfWork.IRepoCategory.Get();
            }
            catch (Exception)
            {
                throw;
            }
        }

        [Route("GetGallery/{id}")]
        [HttpGet]
        public IEnumerable<Gallery> GetGallery(int id)
        {
            try
            {
                return unitOfWork.IRepoGallery.GetList(id);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [Route("AddGallery")]
        [ValidateModel]
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
            return genericOperation.Execute(sendOperation, EnumOperation.Delete, this.ControllerContext.RouteData);

        }


    }
}
