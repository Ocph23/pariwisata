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
            using (var db = new DbContext ()) {
                try
                {
                    var user = db.Users.Where (O => O.username == username && O.password == password).FirstOrDefault ();

                if (user == null)
                    return null;

                // authentication successful so generate jwt token
                var tokenHandler = new JwtSecurityTokenHandler ();
                var key = Encoding.ASCII.GetBytes (_appSettings.Secret);
                var tokenDescriptor = new SecurityTokenDescriptor {
                    Subject = new ClaimsIdentity (new Claim[] {
                    new Claim (ClaimTypes.Name, user.iduser.ToString())
                    }),
                    Expires = DateTime.UtcNow.AddDays (7),
                    SigningCredentials = new SigningCredentials (new SymmetricSecurityKey (key), SecurityAlgorithms.HmacSha256Signature)
                };
                var token = tokenHandler.CreateToken (tokenDescriptor);
                user.Token = tokenHandler.WriteToken (token);

                // remove password before returning
                user.password = null;
                return user;
                }
                catch (System.Exception ex)
                {
                    throw new SystemException(ex.Message);
                }
            }
        }

    }







}