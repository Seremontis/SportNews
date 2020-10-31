using Microsoft.EntityFrameworkCore;
using Moq;
using NUnit.Framework;
using SportDatabase.Context;
using SportDatabase.Interface;
using SportDatabase.Model;
using SportDatabase.Repository;

namespace SportTest
{
    
    public class Tests
    {
// Mock<IUnitOfWork> unitOfWork;
        Mock<SportNewsContext> mock;
        DbContextOptions<SportNewsContext> config;
        [SetUp]
        public void Setup()
        {
            config = new DbContextOptionsBuilder<SportNewsContext>()
                .UseInMemoryDatabase(databaseName: "SportNews Test").Options;
            mock = new Mock<SportNewsContext>(config);
            //unitOfWork = new Mock<IUnitOfWork>();
        }

        [Test]
        public void CommitTest()
        {

            var contextMock = new Mock<SportNewsContext>();
            contextMock.Setup(a => a.Set<User>()).Returns(Mock.Of<DbSet<User>>);
            contextMock.Setup(a => a.Set<Role>()).Returns(Mock.Of<DbSet<Role>>);
            var unitOfWorkMock = new Mock<IUnitOfWork>();
            unitOfWorkMock.Verify(x => x.Commit());
        }

        [Test]
        public void AddObjectTest()
        {
            Mock<Category> mock = new Mock<Category>();
            var unitOfWork2 = new UnitOfWork(new SportNewsContext());
            unitOfWork2.IRepoCategory.Add(mock.Object);
            unitOfWork2.Commit();
        }
    }
}