using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace PariwisataWamena.Controllers
{
    [Route("api/[controller]")]
    public class ImageController : ControllerBase
    {
        public static IHostingEnvironment _environment;
        public ImageController(IHostingEnvironment environment)
        {
            _environment = environment;
        }
        public class FIleUploadAPI
        {
            public IFormFile files { get; set; }
        }

        [HttpPost("[action]"), DisableRequestSizeLimit]
        public object Upload()
        {
            try
            {
                var file = Request.Form.Files[0];

                if (!Directory.Exists(_environment.WebRootPath + "\\uploads\\"))
                {
                    Directory.CreateDirectory(_environment.WebRootPath + "\\uploads\\");
                }
                using (FileStream filestream = System.IO.File.Create(_environment.WebRootPath + "\\uploads\\" + file.FileName))
                {
                    file.CopyTo(filestream);
                    filestream.Flush();
               
                }

                var result = new { imageUrl = $"\\uploads\\{file.FileName}",ok=true };

                return result;


            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }
    }
}
