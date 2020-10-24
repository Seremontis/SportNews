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

        public LoginController(IConfiguration config, SportNewsContext sportNewsContext)
        {
            _config = config;
            this.unitOfWork = new UnitOfWork(sportNewsContext);
            this.genericOperation = new GenericOperation((UnitOfWork)unitOfWork);
        }


        [HttpPost]
        [AllowAnonymous]
        [Route("")]
        public async Task<IActionResult> Login([FromBody] User login)
        {
            IActionResult response = Unauthorized();
            SportDatabase.Model.User userCheck = new SportDatabase.Model.User()
            {
                Login = login.Login,
                Password = login.Password
            };
            userCheck = await unitOfWork.IRepoUser.CheckUser(userCheck);
            if (userCheck != null)
            {
                TokenData data = new TokenData()
                {
                    IdUser = userCheck.UserId,
                    Role = userCheck.RoleId ?? 0,
                };
                try
                {
                    var token = GenerateJWT(data);
                    response = Ok(new
                    {
                        token = token,
                        time = DateTime.Now.AddHours(12),
                        userDetail = data
                    });
                }
                catch (Exception ex)
                {
                    throw;
                }
            }
            return response;
        }

        public string GenerateJWT(TokenData data)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:SecretKey"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, data.IdUser.ToString()),
                new Claim("loginId", data.IdUser.ToString()),
                new Claim("role",((EnumPolicy)data.Role).ToString()),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(12),
                signingCredentials: credentials
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
