using Microsoft.EntityFrameworkCore;
using Moq;
using NUnit.Framework;
using SportApi.Controllers;
using SportDatabase.Context;
using SportDatabase.Interface;
using SportDatabase.Repository;

namespace SportTest
{
    class ApiTest
    {
        IUnitOfWork unitOfWork;
        Mock<SportNewsContext> mock;
        DbContextOptions<SportNewsContext> config;
        [SetUp]
        public void Setup()
        {
            config = new DbContextOptionsBuilder<SportNewsContext>()
                .UseInMemoryDatabase(databaseName: "SportNews Test").Options;
            mock = new Mock<SportNewsContext>(config);
            unitOfWork = new UnitOfWork(mock.Object);
        }

        [Test]
        public void Start()
        {
            var controller = new StartController(mock.Object);
            bool condition = !string.IsNullOrEmpty(controller.TextLauncher());
            Assert.IsTrue(condition);
        }
    }
}
