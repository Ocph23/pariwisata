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

namespace PariwisataWamena.Controllers
{
//    [Route("[controller]/[action]")]
//     public class AccountController : Controller
//     {
//         private readonly SignInManager<IdentityUser> _signInManager;
//         private readonly UserManager<IdentityUser> _userManager;
//         private readonly IConfiguration _configuration;

//         public AccountController(
//             UserManager<IdentityUser> userManager,
//             SignInManager<IdentityUser> signInManager,
//             IConfiguration configuration
//             )
//         {
//             _userManager = userManager;
//             _signInManager = signInManager;
//             _configuration =     configuration;
//         }
        
//         [HttpPost]
//         public async Task<object> Login([FromBody] LoginDto model)
//         {
//             var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, false, false);
            
//             if (result.Succeeded)
//             {
//                 var appUser = _userManager.Users.SingleOrDefault(r => r.Email == model.Email);
//                 return GenerateJwtToken(model.Email, appUser);
//             }
            
//             throw new ApplicationException("INVALID_LOGIN_ATTEMPT");
//         }
       
//         [HttpPost]
//         public async Task<object> Register([FromBody] RegisterDto model)
//         {
//             var user = new IdentityUser
//             {
//                 UserName = model.Email, 
//                 Email = model.Email
//             };
//             var result = await _userManager.CreateAsync(user, model.Password);

//             if (result.Succeeded)
//             {
//                 await _signInManager.SignInAsync(user, false);
//                 return GenerateJwtToken(model.Email, user);
//             }
            
//             throw new ApplicationException("UNKNOWN_ERROR");
//         }

//         private object GenerateJwtToken(string email, IdentityUser user)
//         {
//             var claims = new List<Claim>
//             {
//                 new Claim(JwtRegisteredClaimNames.Sub, email),
//                 new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
//                 new Claim(ClaimTypes.NameIdentifier, user.Id)
//             };

//             var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtKey"]));
//             var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
//             var expires = DateTime.Now.AddDays(Convert.ToDouble(_configuration["JwtExpireDays"]));

//             var token = new JwtSecurityToken(
//                 _configuration["JwtIssuer"],
//                 _configuration["JwtIssuer"],
//                 claims,
//                 expires: expires,
//                 signingCredentials: creds
//             );

//             var jwts = new JwtSecurityTokenHandler();
//             return jwts.WriteToken(token);
//         }

//         public class LoginDto
//         {
//             [Required]
//             public string Email { get; set; }

//             [Required]
//             public string Password { get; set; }

//         }
        
//         public class RegisterDto
//         {
//             [Required]
//             public string Email { get; set; }

//             [Required]
//             [StringLength(100, ErrorMessage = "PASSWORD_MIN_LENGTH", MinimumLength = 6)]
//             public string Password { get; set; }
//         }
//     }


    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class AccountController : ControllerBase
    {
        private IUserService _userService;
      //  private IMapper _mapper;
        private readonly AppSettings _appSettings;

        public AccountController(IUserService userService,
            IOptions<AppSettings> appSettings)
        {
            _userService = userService;
            _appSettings = appSettings.Value;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody]User userDto)
        {
            Console.WriteLine(userDto.username+" Ok");
            var user = _userService.Authenticate(userDto.username, userDto.password);

            if (user == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[] 
                {
                    new Claim(ClaimTypes.Name, user.iduser.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            // return basic user info (without password) and token to store client side
            return Ok(new User{
                iduser = user.iduser,
                username = user.username,
                token = tokenString,avatar=user.avatar
            });
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public IActionResult Register([FromBody]User userDto)
        {
            // map dto to entity
            try 
            {
                // save 
                _userService.Create(userDto, userDto.password);
                return Ok();
            } 
            catch(AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var users =  _userService.GetAll();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var user =  _userService.GetById(id);
            return Ok(user);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody]User userDto)
        {
            // map dto to entity and set id

            try 
            {
                // save 
                _userService.Update(userDto, userDto.password);
                return Ok();
            } 
            catch(AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _userService.Delete(id);
            return Ok();
        }
    }

}