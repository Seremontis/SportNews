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
using SportApi.Model;

namespace SportApi.Controllers
{
    [Route("Login")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IConfiguration _config;
        private List<User> users = new List<User>()
        {
            new User()
        {
            UserName = "test",
            //Password = Encoding.UTF8.GetBytes("test"),
            Password="test",
            Role = "FullAdmin",
            UserType = string.Empty
        },
        new User()
        {
            UserName = "test2",
            //Password = Encoding.UTF8.GetBytes("test"),
            Password = "test",
            Role = "CustomJournalist",
            UserType = string.Empty
        }
    };

        public LoginController(IConfiguration config)
        {
            _config = config;
        }


        [HttpPost]
        [AllowAnonymous]
        [Route("")]
        public IActionResult Login([FromBody]User login)
        {
            IActionResult response = Unauthorized();
            User user = users.Where(x=>x.UserName==login.UserName && x.Password==login.Password).FirstOrDefault();//tutaj sporawdzanie z bazy
            if (user!=null){

                var token = GenerateJWT(user);
                response = Ok(new
                {
                    token = token,
                    userDetail = user
                });
            }
            return response;
        }

        private string GenerateJWT(User userInfo)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:SecretKey"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userInfo.UserName),
                new Claim("firstName", userInfo.UserName.ToString()),
                new Claim("role",userInfo.Role),
                new Claim("usertype",userInfo.UserType),
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
