using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PariwisataWamena.DataAccess;
using PariwisataWamena.Models;

namespace PariwisataWamena.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class ServiceController : ControllerBase
    {

        [AllowAnonymous]
        // GET: api/Service
        [HttpGet]
       public async Task<IActionResult> get()
        {
            try
            {
                var userid = Convert.ToInt32(User.Identity.Name);
                if (userid > 0)
                {
                    var agentDa = new AgentDataAccess();
                    var agent = await agentDa.GetByUserId(userid);
                   var idagent = agent.idagent;
                    var context = new LayananDataAccess(idagent);
                    var result = await context.GetLayanan();
                    return Ok(result);
                }
                else
                    return this.Unauthorized();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> post(layanan data)
        {
            try
            {
                var userid =Convert.ToInt32(User.Identity.Name);
                if (userid > 0)
                {
                    var agentDa = new AgentDataAccess();
                    var agent = await agentDa.GetByUserId(userid);
                    data.idagent = agent.idagent;
                    var context = new LayananDataAccess(agent.idagent);
                    var result = await context.CretaLayanan(data);
                    return Ok(result);
                }
                else
                    return this.Unauthorized();
               
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPut]
        public async Task<IActionResult> Put(int id, layanan data)
        {
            try
            {
                var userid = Convert.ToInt32(User.Identity.Name);
                if (userid > 0)
                {
                    var agentDa = new AgentDataAccess();
                    var agent = await agentDa.GetByUserId(userid);
                    data.idagent = agent.idagent;
                    var context = new LayananDataAccess(id);
                    var result = await context.UpdateLayanan(data);
                    return Ok(result);
                }
                else
                    return this.Unauthorized();
              
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        //
        [HttpGet("{id}/{serviceId}")]
        public async Task<IActionResult> GetTransactionByServiceId(int id,int serviceId)
        {
            try
            {
                var context = new LayananDataAccess(id);
                var result = await context.GetTransaction(serviceId);
                return Ok(result);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [HttpGet("confirmtransaction")]
        public async Task<IActionResult> ConfirmTransaction(transaction model)
        {
            try
            {
                var context = new LayananDataAccess();
                var result = await context.ConfirmTransaction(model);
                return Ok(result);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }



    }
}
