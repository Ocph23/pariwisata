using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using PariwisataWamena.Helpers;
using PariwisataWamena.Models;
using PariwisataWamena.Services;

namespace PariwisataWamena.Controllers {
    [Authorize]
    [ApiController]
    [Route ("[controller]")]
    public class AccountController : ControllerBase {
        private IUserService _userService;
        //  private IMapper _mapper;
        private readonly AppSettings _appSettings;

        public AccountController (IUserService userService,
            IOptions<AppSettings> appSettings) {
            _userService = userService;
            _appSettings = appSettings.Value;
        }

        [AllowAnonymous]
        [HttpPost ("authenticate")]
        public async Task<IActionResult> Authenticate ([FromBody] User userDto) {
            try {
                Console.WriteLine (userDto.username + " Ok");
                var user = await _userService.Authenticate (userDto.username, userDto.password);

                if (user == null)
                   throw new SystemException("Username or password is incorrect");

                var tokenHandler = new JwtSecurityTokenHandler ();
                var key = Encoding.ASCII.GetBytes (_appSettings.Secret);
                var tokenDescriptor = new SecurityTokenDescriptor {
                    Subject = new ClaimsIdentity (new Claim[] {
                    new Claim (ClaimTypes.Name, user.iduser.ToString ())
                    }),
                    Expires = DateTime.UtcNow.AddDays (7),
                    SigningCredentials = new SigningCredentials (new SymmetricSecurityKey (key), SecurityAlgorithms.HmacSha256Signature)
                };
                var token = tokenHandler.CreateToken (tokenDescriptor);
                var tokenString = tokenHandler.WriteToken (token);

                // return basic user info (without password) and token to store client side
                return Ok (new User {
                    iduser = user.iduser, roles=user.roles, 
                        username = user.username,
                        token = tokenString, avatar = user.avatar
                });
            } catch (System.Exception ex) {
                 return BadRequest (new { message = ex.Message });
            }
        }

        [AllowAnonymous]
        [HttpPost ("register")]
        public async Task<IActionResult> Register ([FromBody] User userDto) {
            // map dto to entity
            try {
                // save 
                var result = await _userService.Create (userDto, userDto.password);
                return Ok (result);
            } catch (AppException ex) {
                // return error message if there was an exception
                return BadRequest (new { message = ex.Message });
            }
        }

        [HttpGet]
        public IActionResult GetAll () {
            var users = _userService.GetAll ();
            return Ok (users);
        }

        [HttpGet ("{id}")]
        public IActionResult GetById (int id) {
            var user = _userService.GetById (id);
            return Ok (user);
        }

        [HttpPut ("{id}")]
        public IActionResult Put (int id, [FromBody] User userDto) {
            // map dto to entity and set id

            try {
                // save 
                _userService.Update (userDto, userDto.password);
                return Ok ();
            } catch (AppException ex) {
                // return error message if there was an exception
                return BadRequest (new { message = ex.Message });
            }
        }

        [HttpDelete ("{id}")]
        public IActionResult Delete (int id) {
            _userService.Delete (id);
            return Ok ();
        }
    }

}