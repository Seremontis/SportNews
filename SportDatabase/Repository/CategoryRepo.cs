using Microsoft.EntityFrameworkCore;
using SportDatabase.Context;
using SportDatabase.Model;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SportDatabase.Repository
{
    public class CategoryRepo: Repository<Category>, ICategoryRepo<Category>
    {
        public CategoryRepo(SportNewsContext newsContext) : base(newsContext)
        {

        }

        public Task MoveDown(int id)
        {
            var CategoryObject = _SportNewsContext.Categories.Find((object)id);
            var CategoryReplace = _SportNewsContext.Categories.Where(x => x.SortField == CategoryObject.SortField + 1).FirstOrDefault();
            if (CategoryReplace==null)           
                    return null;                                                                            //except incorrect action
            CategoryObject.SortField += 1;
            CategoryReplace.SortField -= 1;
            CategoryObject.LastModified = CategoryReplace.LastModified = DateTime.Now;
            return Task.FromResult<object>(null);
        }

        public Task MoveUp(int id)
        {
            var CategoryObject = _SportNewsContext.Categories.Find((object)id);
            if (CategoryObject.SortField < 2)
                return null;                                                                            //except incorrect action           
            var CategoryReplace = _SportNewsContext.Categories.Where(x => x.SortField == CategoryObject.SortField - 1).FirstOrDefault();
            CategoryObject.SortField -= 1;
            CategoryReplace.SortField += 1;
            CategoryObject.LastModified = CategoryReplace.LastModified = DateTime.Now;
            return Task.FromResult<object>(null);
        }

        public async Task<IEnumerable<WCategory>> GetView()
        {
            return await _SportNewsContext.WCategories.OrderBy(x=>x.SortField).ToListAsync();
        }

        public async Task Add(Category category)
        {
            var numberSort = _SportNewsContext.Categories.Max(x => x.SortField);
            category.SortField = numberSort.HasValue?numberSort.Value+1:1;
            category.LastModified = DateTime.Now;
            await _SportNewsContext.Categories.AddAsync(category);
        }

        public async Task Delete(int id)
        {
            var CategoryToDelete = _SportNewsContext.Categories.Find((object)id);
            _SportNewsContext.Categories.Remove(CategoryToDelete);
            var listToResort = _SportNewsContext.Categories.Where(x => x.SortField > CategoryToDelete.SortField);
            foreach (var item in listToResort)
            {
                item.SortField -= 1;
            }
        }
    }
}
