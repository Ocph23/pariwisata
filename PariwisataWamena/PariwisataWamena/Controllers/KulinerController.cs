
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using PariwisataWamena.Models;

namespace PariwisataWamena.Controllers
{
       [Route("api/[controller]")]
    public class KulinerController:Controller
    {
          [HttpGet("[action]")]
        public IEnumerable<Article> Kuliners()
        {
            return new List<Article>(){ new Article{ Title="Papeda", Categories=new List<string>(){"Kuliner","Jajanan"},
             Content=$"Makanan khas Papua adalah makanan ini yang selalu membawa kebahagiaan"  }};
        }
    }
}