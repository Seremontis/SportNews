using FakeItEasy;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;
using NUnit.Framework;
using SportApi.Controllers;
using SportDatabase.Context;
using SportDatabase.Interface;
using SportDatabase.Model;
using SportDatabase.Repository;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SportTest
{
    class ApiTest
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
            context.Set<Category>().Add(new Category { Name = "test" });
            context.Set<Role>().Add(new Role { NameRole = "testRole" });
            context.SaveChanges();
            unitOfWork = new UnitOfWork(context);
        }

        [Test]
        public void Start()
        {
            var controller = new StartController(unitOfWork);
            bool condition = !string.IsNullOrEmpty(controller.TextLauncher());
            Assert.IsTrue(condition);
        }

        [Test]
        public void GetRoleWithController()
        {      
            var controller = new PanelController(unitOfWork);

            var test = controller.GetRole().Result;

            Assert.IsNotNull(test);
            Assert.AreNotEqual(0,test.Count());
        }
        [Test]
        public void GetCategoryWithController()
        {
            var controller = new PanelController(unitOfWork);

            var categories = controller.GetCategory().Result;

            Assert.IsInstanceOf(typeof(IEnumerable<WCategory>), categories);
            Assert.AreEqual("test",categories.ToList()[0].Name);
        }
        
    }
}
