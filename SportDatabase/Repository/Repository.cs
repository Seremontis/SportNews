using Microsoft.EntityFrameworkCore;
using SportDatabase.Context;
using SportDatabase.Interface;
using SportDatabase.Model;
using System;
using System.Collections.Generic;
using System.Deployment.Internal;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace SportDatabase.Repository
{
    /// <summary>
    /// zaimplementować rejestrację błędów
    /// </summary>

    public class Repository<T> : IRepository<T> where T : class
    {
        public readonly SportNewsContext _SportNewsContext;

        public Repository(SportNewsContext sportNews)
        {
            _SportNewsContext = sportNews;
        }

        public void Add(T model)
        {
            _SportNewsContext.Set<T>().Add(model);
        }

        public void Delete(int id)
        {
            T checkModel = _SportNewsContext.Set<T>().Find((object)id);
            if (checkModel != null)
                _SportNewsContext.Set<T>().Remove(checkModel);
            else
            {
                //throw new HttpResponseMessage(System.Net.HttpStatusCode.NotFound)
                //{
                //    Content = new StringContent(string.Format("Brak wyników dla id= {0}", id)),
                //    ReasonPhrase = "Brak elementu do usunięcia"
                //};
            }
        }

        public IEnumerable<T> Get()
        {
            return _SportNewsContext.Set<T>();
        }

        public T Get(int id)
        {
            return _SportNewsContext.Set<T>().Find((object)id);
        }

        public void Update(T model)
        {
            _SportNewsContext.Entry(model).State = EntityState.Modified;
            _SportNewsContext.Set<T>().Attach(model);
        }
    }
}
