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
        internal int _Page;
        internal int _DefaultPageSize;

        public Repository(SportNewsContext sportNews)
        {
            _SportNewsContext = sportNews;
        }


        public async Task Add(T model)
        {
            await _SportNewsContext.Set<T>().AddAsync(model);
        }

        public async Task Delete(int id)
        {
            T checkModel = await _SportNewsContext.Set<T>().FindAsync((object)id);
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

        public async Task<List<T>> Get()
        {
            return await _SportNewsContext.Set<T>().ToListAsync();
        }

        public async Task<T> Get(int id)
        {
            return await _SportNewsContext.Set<T>().FindAsync((object)id);
        }

        public void Update(T model)
        {
            _SportNewsContext.Entry(model).State = EntityState.Modified;
            //_SportNewsContext.Set<T>().Attach(model);
            _SportNewsContext.Set<T>().Update(model);
        }

        internal void SetupPageSize(int page)
        {
            if (page == 1)
            {
                _Page = 0;
                _DefaultPageSize = 6;
            }
            else
            {
                _Page = (6 * (page - 1)) - 2;
                _DefaultPageSize = 8;
            }
        }

    }
}
