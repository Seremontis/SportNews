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
        public ErrorsController(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
        }

        [Microsoft.AspNetCore.Mvc.Route("Error")]
        [AllowAnonymous]
        public async Task<IActionResult> Error()
        {
            var exceptionDetails = HttpContext.Features.Get<IExceptionHandlerPathFeature>();
            LogException logException = new LogException()
            {
                Date = DateTime.Now,
                Message = exceptionDetails.Error.StackTrace,
                Path = exceptionDetails.Path,
                UserId = 0,
            };          
            try
            {
                await _unitOfWork.IRepoLogException.Add(logException);
                await _unitOfWork.Commit();
            }
            catch (Exception)
            {
                throw;
            }
            return StatusCode(StatusCodes.Status500InternalServerError,"Error\n" + exceptionDetails.Error.Message.ToString());

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
