using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PariwisataWamena.DataAccess;
using PariwisataWamena.Models;

namespace PariwisataWamena.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServiceController : ControllerBase
    {
        // GET: api/Service
        [HttpGet("{id}")]
       public async Task<IActionResult> GetServices(int id)
        {
            try
            {
                var context = new LayananDataAccess(id);
                var result = await context.GetLayanan();
                return Ok(result);
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
                var context = new LayananDataAccess(id);
                var result = await context.UpdateLayanan(data);
                return Ok(result);
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
