using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Model
{
    public class Person
    {
        [Key]
        public string Pesel { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }

        public string Login { get; set; }
        public string Password { get; set; }
        public string Token { get; set; }
        
        [NotMapped]
        public int Age { get; set; }
        public ICollection<Todo> Todos { get; set; }
    }
}
