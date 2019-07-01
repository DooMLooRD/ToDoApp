using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Model
{
    public class task
    {
        [Key]
        public int taskId { get; set; }
        public string Title { get; set; }
        public string Decription { get; set; }
        public bool isDone { get; set; }
    }
}
