using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using SportDatabase;
using SportDatabase.Interface;
using SportDatabase.Model;
using SportDatabase.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace SportApi
{
    public class GenericOperation
    {
        IUnitOfWork unitOfWork;
        public GenericOperation(UnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }
        public HttpResponseMessage Execute(Action action, EnumOperation enumOperation, RouteData routeData)
        {
            try
            {
                action();
                unitOfWork.IRepoLogOperation.Add(GetLogException(enumOperation,routeData));
                unitOfWork.Commit();
                return new HttpResponseMessage(System.Net.HttpStatusCode.OK);
            }
            catch (Exception)
            {
                unitOfWork.Dispose();
                throw;
            }
        }

        protected LogOperation GetLogException(EnumOperation operation, RouteData routeData)
        {
            LogOperation logOperation = new LogOperation()
            {
                Date = DateTime.Now,
                Controller = routeData.Values["controller"].ToString(),
                Description = routeData.Values["action"].ToString(),
                Operation = operation.ToString()
            };
            return logOperation;
        }

    }
}
