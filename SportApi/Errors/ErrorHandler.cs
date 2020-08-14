using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace SportApi.Errors
{
    public class ErrorHandler
    {
        private readonly RequestDelegate _next;

        public ErrorHandler(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            await _next(context);
            HandleException(context);
        }
        public static void HandleException(HttpContext context)
        {
            context.Response.StatusCode = context.Response.StatusCode;
            context.Response.ContentType = "application/json";

            //context.Response.Redirect("/Error");
            var test=context.Connection.RemoteIpAddress.ToString();
            
        }


    }
}
