using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SKIF_Exam.Data;
using SKIF_Exam.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace SKIF_Exam.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly DbContextClass _context;
        public AuthenticationController(DbContextClass context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login([FromForm] User user)
        {

            if (!TryValidateModel(user, nameof(Login)))
                return BadRequest();
            ModelState.ClearValidationState(nameof(Login));
            if (user is null)
            {
                return BadRequest("Invalid user!");
            }
            if (await _context.users.AnyAsync(item => item.Login == user.Login && item.Password == user.Password))
            {
                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(ConfigurationManager.AppSetting["JWT:Secret"]));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                var tokeOptions = new JwtSecurityToken(
                    issuer: ConfigurationManager.AppSetting["JWT:ValidIssuer"],
                    audience: ConfigurationManager.AppSetting["JWT:ValidAudience"],
                    claims: new List<Claim>(),
                    expires: DateTime.Now.AddMinutes(6),
                    signingCredentials: signinCredentials
                );
                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                return Ok(new JWTTokenResponse { Token = tokenString });
            }
            return Unauthorized();



        }

        [HttpPost("Reg")]
        public async Task<ActionResult> Add([FromForm] User user)
        {
            if (!TryValidateModel(user, nameof(Login)))
                return BadRequest();
            ModelState.ClearValidationState(nameof(Login));

            if (await _context.users.AnyAsync(item => item.Login == user.Login))
            {
                return Conflict();
            }
            else
            {
                await _context.users.AddAsync(user);
                await _context.SaveChangesAsync();
                string uri = $"/api/Reg/{user.Id}";
                return Created(uri, user);
            }


        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetID(int id)
        {
            var val = await _context.users.FindAsync(id);
            return Ok(val);
        }
    }
}
