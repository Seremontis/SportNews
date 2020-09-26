using System;
using System.Web.Http.Filters;

/// <summary>
/// delete
/// </summary>
public class AllowCrossSiteJsonAttribute : ActionFilterAttribute
{
    public override void OnActionExecuted(HttpActionExecutedContext actionExecutedContext)
    {
        if (actionExecutedContext.Response != null)
            actionExecutedContext.Response.Headers.Add("Access-Control-Allow-Origin", "*");

        base.OnActionExecuted(actionExecutedContext);
    }
}