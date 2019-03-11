using System.Net;
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PariwisataWamena.DataAccess;
using PariwisataWamena.Models;
using Microsoft.AspNetCore.Authorization;

namespace PariwisataWamena.Controllers {
    [Route ("api/[controller]")]
    public class ArticleController : Controller {
        private ArticleDTO context = new ArticleDTO ();
        private UserDTO userContext = new UserDTO ();

        [HttpGet ("[action]")]
        public async Task<IActionResult> Get () {
            try {
                var result = await context.Get ();

                return Ok (result);
            } catch (System.Exception ex) {

                return BadRequest (ex.Message);
            }
        }

        [HttpGet ("[action]")]
        public async Task<IActionResult> Get (int id) {
            try {

                var data = User.Identity.Name;
                var result = await context.Get (id);

                return Ok (result);
            } catch (System.Exception ex) {

                return BadRequest (ex.Message);
            }
        }

        [HttpPost ("[action]")]
        public async Task<IActionResult> Post (article model) {
            try {

                var user = userContext.GetByUserName (User.Identity.Name);
                model.createdate = DateTime.Now;
                if (user != null) {
                    model.iduser = user.Id;
                    var result = await context.Post (model);

                    return Ok (result);
                }

                throw new SystemException ("Not Saved");

            } catch (System.Exception ex) {

                return BadRequest (ex.Message);
            }
        }

        [HttpPut ("[action]")]
        public async Task<IActionResult> Put (int id,article model) {
            try {

                var user = userContext.GetByUserName (User.Identity.Name);
                model.createdate = DateTime.Now;
                if (user != null) {
                    model.iduser = user.Id;
                    var result = await context.Put(id,model);

                    return Ok (result);
                }
                throw new SystemException ("Not Saved");

            } catch (System.Exception ex) {

                return BadRequest (ex.Message);
            }
        }


        
        [HttpDelete ("[action]")]
        [Authorize]
        public async Task<IActionResult> Delete (int id) {
            try {
                var deleted = await context.Delete(id);
                if (deleted) {
                    return Ok (deleted);
                }
                throw new SystemException ("Not Saved");

            } catch (System.Exception ex) {

                return BadRequest (ex.Message);
            }
        }
    }
}