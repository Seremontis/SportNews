using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;
using SportDatabase;
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

        public PanelController(SportNewsContext sportNewsContext)
        {
            this.unitOfWork = new UnitOfWork(sportNewsContext); ;
        }

        [Route("")]
        [HttpGet]
        public string Start()
        {
            return "Witaj w panelu użytkownika";
        }

        [Route("GetUser")]
        [HttpGet]
        public User GetUser(int id)
        {
            try
            {
                var result=unitOfWork.IRepoUser.Get(id);
                return result.SingleOrDefault();
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
            try
            {
                unitOfWork.IRepoUser.Add(user);
                LogOperation logOperation = new LogOperation()
                {
                    Date = DateTime.Now,
                    Controller = this.ControllerContext.RouteData.Values["controller"].ToString(),
                    Description = this.ControllerContext.RouteData.Values["action"].ToString(),
                    Operation = EnumOperation.Add.ToString()
                };
                unitOfWork.IRepoLogOperation.Add(logOperation);
                unitOfWork.Commit();
                HttpResponseMessage message = new HttpResponseMessage(System.Net.HttpStatusCode.OK);
                return message;
            }
            catch (Exception)
            {
                throw;
            }
        }
        [Route("UpdateUser")]
        [HttpPut]
        public HttpResponseMessage UpdateUser([FromBody]User user)
        {
            try
            {
                unitOfWork.IRepoUser.Add(user);
                LogOperation logOperation = new LogOperation()
                {
                    Date = DateTime.Now,
                    Controller = this.ControllerContext.RouteData.Values["controller"].ToString(),
                    Description = this.ControllerContext.RouteData.Values["action"].ToString(),
                    Operation = EnumOperation.Update.ToString()
                };
                unitOfWork.IRepoLogOperation.Add(logOperation);
                unitOfWork.Commit();
                return new HttpResponseMessage(System.Net.HttpStatusCode.OK);
            }
            catch (Exception)
            {
                unitOfWork.Dispose();
                throw;
            }
        }
    }
}
