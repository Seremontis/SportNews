using Microsoft.AspNetCore.Routing;
using SportDatabase;
using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace SportApi
{
    public interface IGenericOperation
    {
        Task<HttpResponseMessage> Execute(Func<Task> action, EnumOperation enumOperation, RouteData routeData, int userId);
    }
}