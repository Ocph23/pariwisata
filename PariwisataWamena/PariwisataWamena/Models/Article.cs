using System.Collections.Generic;
namespace PariwisataWamena.Models
{
    public class Article
    {
        public string Title{get;set;}
        public List<string> Categories { get; set; }

        public string Content { get; set; }

        public string Foto { get; set; }

        
    }
}