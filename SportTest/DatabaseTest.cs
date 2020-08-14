using Microsoft.AspNetCore.DataProtection.XmlEncryption;
using Microsoft.EntityFrameworkCore;
using Moq;
using NUnit.Framework;
using SportDatabase;
using SportDatabase.Context;
using SportDatabase.Interface;
using SportDatabase.Model;
using SportDatabase.Repository;
using System.Security.Cryptography.X509Certificates;

namespace SportTest
{
    public class Tests
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
        public void CommitTest()
        {
            unitOfWork.Commit();
            mock.Verify(x => x.SaveChanges());
        }

        [Test]
        public void AddObjectTest()
        {
            /*var unitOfWork2 = new UnitOfWork(new SportNewsContext());
            unitOfWork2.IRepoCategory.Add(new Categories()
            {
                Name = "test"
            });
            unitOfWork2.Commit();
        */}
    }
}