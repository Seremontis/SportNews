using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SportDatabase;
using SportDatabase.Context;
using SportDatabase.Interface;
using SportDatabase.Model;
using SportDatabase.Repository;

namespace SportApi.Controllers
{
    [ApiExplorerSettings(IgnoreApi = true)]
    [ApiController]
    [Microsoft.AspNetCore.Mvc.Route("/")]
    public class ErrorsController : ControllerBase
    {
        private IUnitOfWork _unitOfWork;
        public ErrorsController(SportNewsContext sportNewsContext)
        {
            this._unitOfWork = new UnitOfWork(sportNewsContext);
        }

        [Microsoft.AspNetCore.Mvc.Route("Error")]
        [AllowAnonymous]
        public object Error()
        {
            var exceptionDetails = HttpContext.Features.Get<IExceptionHandlerPathFeature>();
            LogException logException = new LogException()
            {
                Date = DateTime.Now,
                Message = exceptionDetails.Error.StackTrace,
                Path = exceptionDetails.Path,
                UserId = null,
            };          
            try
            {
                _unitOfWork.IRepoLogException.Add(logException);
                _unitOfWork.Commit();
            }
            catch (Exception)
            {
                throw;
            }
            return new { Content = "Error\n" + exceptionDetails.Error.Message.ToString() };

        }
        protected LogOperation GetLogException(EnumOperation operation)
        {
            LogOperation logOperation = new LogOperation()
            {
                Date = DateTime.Now,
                Controller = this.ControllerContext.RouteData.Values["controller"].ToString(),
                Description = this.ControllerContext.RouteData.Values["action"].ToString(),
                Operation = operation.ToString()
            };
            return logOperation;
        }
    }
}
