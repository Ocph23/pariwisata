using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PariwisataWamena.Models;

namespace PariwisataWamena.Controllers {
    [Route ("api/[controller]")]
    public class KulinerController : Controller {
        [HttpGet]
        public async Task<IActionResult> Get () {
            var data = new List<article> () {
                new article {
                type = "Kuliner", title = "Papeda", tags = new List<string> () { "Kuliner", "Jajanan" },
                content = $"Makanan khas Papua adalah makanan ini yang selalu membawa kebahagiaan"
                },
                new article {
                   type= "Kuliner",   title = "Sayur", tags = new List<string> () { "Kuliner", "Jajanan" },
                content = $"Makanan khas Papua adalah makanan ini yang selalu membawa kebahagiaan"
                },
                new article {
                   type= "Kuliner",   title = "Nasi Apa", tags = new List<string> () { "Kuliner", "Jajanan" },
                content = $"Makanan khas Papua adalah makanan ini yang selalu membawa kebahagiaan"
                },
                new article {
                  type= "Kuliner",    title = "Tumis", tags = new List<string> () { "Kuliner", "Jajanan" },
                content = $"Makanan khas Papua adalah makanan ini yang selalu membawa kebahagiaan"
                },
                new article {
                    type= "Destinasi",  title = "Danau Gram", tags = new List<string> () { "Kuliner", "Jajanan" },
                content = $"Makanan khas Papua adalah makanan ini yang selalu membawa kebahagiaan"
                },
                new article {
                 type= "Destinasi",     title = "Cartens Montain", tags = new List<string> () { "Kuliner", "Jajanan" },
                content = $"Makanan khas Papua adalah makanan ini yang selalu membawa kebahagiaan"
                },
                new article {
                    type= "Akomodasi",  title = "Hotel A", tags = new List<string> () { "Kuliner", "Jajanan" },
                content = $"Makanan khas Papua adalah makanan ini yang selalu membawa kebahagiaan"
                }
            };
            return Ok (await Task.FromResult(data));
        }

    }
}