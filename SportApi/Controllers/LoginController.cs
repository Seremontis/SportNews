using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Microsoft.VisualBasic;
using SportApi.Model;
using SportDatabase.Context;
using SportDatabase.Interface;
using SportDatabase.Repository;

namespace SportApi.Controllers
{
    [Route("Login")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IUnitOfWork unitOfWork;
        private GenericOperation genericOperation;

        private List<User> users = new List<User>()
        {
            new User()
        {
            Login = "test",
            //Password = Encoding.UTF8.GetBytes("test"),
            //Password="test",
            Role = "SuperAdmin",
            UserType = string.Empty
        },
        new User()
        {
            Login = "test2",
            //Password = Encoding.UTF8.GetBytes("test"),
            //Password = "test",
            Role = "CustomJournalist",
            UserType = string.Empty
        }
    };

        public LoginController(IConfiguration config, SportNewsContext sportNewsContext)
        {
            _config = config;
            this.unitOfWork = new UnitOfWork(sportNewsContext);
            this.genericOperation = new GenericOperation((UnitOfWork)unitOfWork);
        }


        [HttpPost]
        [AllowAnonymous]
        [Route("")]
        public async Task<IActionResult> Login([FromBody]User login)
        {
            IActionResult response = Unauthorized();
            SportDatabase.Model.User userCheck = new SportDatabase.Model.User()
            {
                Login = login.Login,
                Password = login.Password
            };
            userCheck = await unitOfWork.IRepoUser.CheckUser(userCheck);
            if (userCheck != null){
                login.Password = null;
                login.Login = userCheck.UserId.ToString();
                login.Role = userCheck.RoleId.ToString();
                //login.UserType=userCheck.
                try
                {
                    var token = GenerateJWT(login);
                    response = Ok(new
                    {
                        token = token,
                        userDetail = login
                    });
                }
                catch (Exception ex)
                {
                    throw;
                }
                
            }
            return response;
        }

        private string GenerateJWT(User userInfo)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:SecretKey"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userInfo.Login),
                new Claim("firstName", userInfo.Login.ToString()),
                new Claim("role",userInfo.Role),
                new Claim("usertype",userInfo.UserType??string.Empty),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(60),
                signingCredentials: credentials
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
