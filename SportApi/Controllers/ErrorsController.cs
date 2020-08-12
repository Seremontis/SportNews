using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace SportApi.Controllers
{
    [ApiExplorerSettings(IgnoreApi = true)]
    [ApiController]
    public class ErrorsController : ControllerBase
    {
        /// <summary>
        /// obsłużyć błąd 405
        /// </summary>
        /// <returns></returns>
        [Route("/Error")]
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
    }
}
