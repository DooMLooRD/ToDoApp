using System.Collections.Generic;
using WebApi.Model;

namespace WebApi.Services.DTOs
{
    public class ToDoDTO 
    {
        public int TodoId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public bool IsDone { get; set; }
        public string PersonId { get; set; }
        public int? ParentId { get; set; }

        public string PersonFullName { get; set; }
        public List<ToDoDTO> Todos { get; set; }
    }
}
