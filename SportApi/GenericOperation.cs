using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using SportDatabase;
using SportDatabase.Interface;
using SportDatabase.Model;
using SportDatabase.Repository;
using System;
using System.Collections.Generic;
using System.Diagnostics;
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
        public async Task<HttpResponseMessage> Execute(Func<Task> action, EnumOperation enumOperation, RouteData routeData)
        {
            try
            {
                await action();
                await unitOfWork.IRepoLogOperation.Add(GetLogOperation(enumOperation,routeData));
                await unitOfWork.Commit();
                return new HttpResponseMessage(System.Net.HttpStatusCode.OK);
            }
            catch (Exception exception)
            {
                unitOfWork.Rollback();
                unitOfWork.IRepoLogException.Add(GetLogException(exception));
                unitOfWork.Commit();
                throw;
            }
        }

        protected LogOperation GetLogOperation(EnumOperation operation, RouteData routeData)
        {
            LogOperation logOperation = new LogOperation()
            {
                Date = DateTime.Now,
                Controller = routeData.Values["controller"].ToString(),
                Description = routeData.Values["action"].ToString(),
                Operation = operation.ToString(),
                UserId=1
            };
            return logOperation;
        }

        protected LogException GetLogException(Exception exception)
        {
            var info = new StackTrace(exception, true);
            var frame = info.GetFrame(0);
            var file = frame.GetFileName() ;
            var numberRow = frame.GetFileLineNumber();

            LogException logException = new LogException()
            {
                Date = DateTime.Now,
                Message = exception.Message,
                Path = string.Format($"Name file: {0}, Line number {1}", file, numberRow),
                UserId = 1
            };
            return logException;
        }

    }
}
