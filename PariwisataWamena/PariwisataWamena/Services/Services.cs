using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using PariwisataWamena.DataAccess;
using PariwisataWamena.Models;

namespace PariwisataWamena.Services {
    public interface IUserService {
        Task<user> Authenticate (string username, string password);
    }

    public class UserService : IUserService {
        private readonly AppSettings _appSettings;

        public UserService (IOptions<AppSettings> appSettings) {
            _appSettings = appSettings.Value;

        }

        public async Task<user> Authenticate (string username, string password) {

            var context = new UserDTO();
            var result = await context.GetByUserName(username);
            try
                {
                if (result == null || result.password!=password)
                    return null;

                // authentication successful so generate jwt token
                var tokenHandler = new JwtSecurityTokenHandler ();
                var key = Encoding.ASCII.GetBytes (_appSettings.Secret);
                var tokenDescriptor = new SecurityTokenDescriptor {
                    Subject = new ClaimsIdentity (new Claim[] {
                    new Claim (ClaimTypes.Name, result.iduser.ToString())
                    }),
                    Expires = DateTime.UtcNow.AddDays (7),
                    SigningCredentials = new SigningCredentials (new SymmetricSecurityKey (key), SecurityAlgorithms.HmacSha256Signature)
                };
                var token = tokenHandler.CreateToken (tokenDescriptor);
                result.Token = tokenHandler.WriteToken (token);

                // remove password before returning
                result.password = null;
                return result;
                }
                catch (System.Exception ex)
                {
                    throw new SystemException(ex.Message);
                }
        }

    }







}