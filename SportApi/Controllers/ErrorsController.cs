using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SportDatabase;
using SportDatabase.Model;

namespace SportApi.Controllers
{
    [ApiExplorerSettings(IgnoreApi = true)]
    [ApiController]
    public class ErrorsController : ControllerBase
    {
        /// <summary>
        /// obsłużyć błąd 405
        /// </summary>
        /// HttpContext.Features.Get<IExceptionHandlerPathFeature>();
        [Route("Error")]
        public string Error()
        {
            var test=HttpContext.Request.Cookies;
            string message = "Connection error \nDetail:";
            foreach (var item in test)
            {
                    message += ("\n" + item.Key + ":" + item.Value).Replace("//","/");
            }
            return message;
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
