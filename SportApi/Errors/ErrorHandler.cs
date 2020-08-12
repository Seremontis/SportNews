using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
            HandlePageNotFound(context);
        }
        public static void HandlePageNotFound(HttpContext context)
        {
            CookieOptions cookieOptions = new CookieOptions();
            cookieOptions.Expires = DateTime.Now.AddMilliseconds(10000);
            cookieOptions.IsEssential = true;
            context.Response.Cookies.Append("Source", "./" + context.Request.Path, cookieOptions);
            context.Response.Cookies.Append("Status", context.Response.StatusCode.ToString(), cookieOptions);
            context.Response.Redirect("/Error");
            var result = string.Empty;

            var test=context.Connection.RemoteIpAddress.ToString();
        }


    }
}
