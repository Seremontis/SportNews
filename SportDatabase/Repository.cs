﻿using Microsoft.EntityFrameworkCore;
using SportDatabase.Interface;
using SportDatabase.Model;
using System;
using System.Collections.Generic;
using System.Linq;
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
                //dodać rejestrowanie błędów
            }
        }

        //konflikt z niektórymi operacjami repo
        public IEnumerable<T> Get()
        {
            return _SportNewsContext.Set<T>();
        }

        public IEnumerable<T> Get(int page)
        {
            throw new NotImplementedException();
        }

        /*public T GetOne(int id)
        {
            return _SportNewsContext.Set<T>().Find(id);
        }*/
        public void Update(T model)
        {
            _SportNewsContext.Entry(model).State = EntityState.Modified;
            _SportNewsContext.Set<T>().Attach(model);
        }
    }
}