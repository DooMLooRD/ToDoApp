using System.Collections.Generic;
using WebApi.Model;

namespace WebApi.Services.DTOs
{
    public class ToDoDTO 
    {
        public Todo Todo { get; set; }
        public string FullName { get; set; }
        public List<ToDoDTO> Todos { get; set; }
    }
}
