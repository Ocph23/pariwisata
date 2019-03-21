using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PariwisataWamena.DataAccess;
using PariwisataWamena.Models;

namespace PariwisataWamena.Controllers {

    [Authorize]
    [ApiController]
    [Route ("api/[controller]")]
    public class AgentController : Controller {
        private AgentDataAccess context = new AgentDataAccess ();

        [HttpGet]
        public async Task<IActionResult> Get () {
            try {
                var result = await context.Get ();
                return Ok (result);
            } catch (System.Exception ex) {
                return BadRequest (new { message = ex.Message });
            }
        }

        [HttpGet ("{id}")]
        public async Task<IActionResult> Get (int id) {
            try {
                var result = await context.Get (id);
                return Ok (result);
            } catch (System.Exception ex) {
                return BadRequest (new { message = ex.Message });
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post ([FromBody] agent value) {
            try {
                var userid= Convert.ToInt32(User.Identity.Name);
                if (userid <= 0)
                    throw new SystemException("UnAuthorize");
                value.userid=userid;
                var result = await context.Post (value);
                return Ok (result);
            } catch (System.Exception ex) {
                return BadRequest (new { message = ex.Message });
            }
        }

        [HttpPut ("{id}")]
        public async Task<IActionResult> Put (int id, [FromBody] agent value) {
            try {
                var userid = Convert.ToInt32(User.Identity.Name);
                if (userid <= 0)
                    throw new SystemException("Unauthorize");
                value.userid = userid;
                var result = await context.Put (id, value);
                return Ok (result);
            } catch (System.Exception ex) {
                return BadRequest (new { message = ex.Message });
            }
        }

        [HttpDelete ("{id}")]
        public async Task<IActionResult> Delete (int id) {
            try {
                var result = await context.Delete (id);
                return Ok (result);
            } catch (System.Exception ex) {
                return BadRequest (new { message = ex.Message });
            }
        }

    }
}