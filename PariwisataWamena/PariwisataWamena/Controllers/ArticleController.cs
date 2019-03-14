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

        [HttpGet]
        public async Task<IActionResult> Get () {
            try {
                var result = await context.Get ();

                return Ok (result);
            } catch (System.Exception ex) {

                return BadRequest (ex.Message);
            }
        }

        [HttpGet ("id")]
        public async Task<IActionResult> Get (int id) {
            try {

                var data = User.Identity.Name;
                var result = await context.Get (id);

                return Ok (result);
            } catch (System.Exception ex) {

                return BadRequest (ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post ([FromBody]  article model) {
            try {

                if(model==null)
                 throw new SystemException ("Not Saved");
                var id = Convert.ToInt32(User.Identity.Name);
                user user = await userContext.Get(id);
                model.createdate = DateTime.Now;
                if (user != null) {
                    model.iduser = user.iduser;
                    var result = await context.Post (model);
                    return Ok (result);
                }
                throw new SystemException ("Not Saved");

            } catch (System.Exception ex) {

                return BadRequest (ex.Message);
            }
        }

       [HttpPut("{id}")]
        public async Task<IActionResult> Put (int id,[FromBody] article item) {
            try {
                if(id<=0 || item==null)
                {
                throw new SystemException ("model isnull");
                }

                var user = userContext.GetByUserName (User.Identity.Name);
                item.createdate = DateTime.Now;
                if (user != null) {
                    item.iduser = user.Id;
                    var result = await context.Put(id,item);

                    return Ok (result);
                }
                throw new SystemException ("Not Saved");

            } catch (System.Exception ex) {

                return BadRequest (ex.Message);
            }
        }


        
       
        [Authorize]
         [HttpDelete ("id")]
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