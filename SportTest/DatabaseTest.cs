using FakeItEasy;
using Microsoft.EntityFrameworkCore;
using Moq;
using NUnit.Framework;
using SportDatabase.Context;
using SportDatabase.Interface;
using SportDatabase.Model;
using SportDatabase.Repository;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

namespace SportTest
{

    public class Tests
    {
        IUnitOfWork unitOfWork;
        SportNewsContext context;
        DbContextOptions<SportNewsContext> config;

        [SetUp]
        public void Setup()
        {
            config = new DbContextOptionsBuilder<SportNewsContext>()
                .UseInMemoryDatabase(databaseName: "SportNews Test").Options;
            context = new SportNewsContext(config);
            context.Set<WCategory>().Add(new WCategory { Name = "test" });
            context.Set<Category>().Add(new Category {CategoryId=1, Name = "test",SortField=1 });
            context.Set<Category>().Add(new Category { CategoryId = 2, Name = "test2", SortField = 2 });
            context.Set<Role>().Add(new Role { NameRole = "testRole" });
            context.SaveChanges();
            unitOfWork = new UnitOfWork(context);
        }
        
        [Test]
        public void TestAddUser()
        {
            User user = new User() { FirstName = "TestowyUser" };

            unitOfWork.IRepoUser.Add(user);
            unitOfWork.Commit();

            Assert.IsNotNull(context.Users);
            Assert.AreEqual(1, context.Users.Count());
            Assert.AreEqual("TestowyUser", context.Users.ToList()[0].FirstName);
        }
        
        [Test]
        public void TestDeleteCategory()
        {
            int count = context.Categories.Count();

            unitOfWork.IRepoCategory.Delete(1);
            unitOfWork.Commit();
            int countAfter= context.Categories.Count();

            Assert.IsNull(context.Categories.Find(1));
            Assert.AreNotEqual(countAfter, count);   
        }

        [Test]
        public void TestGetViewCategory()
        {
            IEnumerable<WCategory> enumerable;

            enumerable = unitOfWork.IRepoCategory.GetView().Result;

            Assert.NotNull(enumerable);
            Assert.GreaterOrEqual(enumerable.Count(),1);
        }

        [Test]
        public void TestMoveUpSortNumberCategory()
        {
            int id = 2;
            var sortCategoryOld = context.Categories.Find(id).SortField;

            unitOfWork.IRepoCategory.MoveUp(id);
            unitOfWork.Commit();
            var sortCategoryNew = context.Categories.Find(id).SortField;

            Assert.Less(sortCategoryNew, sortCategoryOld);
        }

        [Test]
        public void TestMoveDownSortNumberCategory()
        {
            int id = 1;
            var sortCategoryOld = context.Categories.Find(id).SortField;

            unitOfWork.IRepoCategory.MoveDown(id);
            unitOfWork.Commit();
            var sortCategoryNew = context.Categories.Find(id).SortField;

            Assert.Greater(sortCategoryNew, sortCategoryOld);
        }
    }
}