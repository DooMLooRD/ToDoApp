using System.Collections.Generic;
using WebApi.Model;

namespace WebApi.Services.DTOs
{
    public class ToDoDTO 
    {
        Todo Todo { get; set; }
        string FullName;
        List<Todo> Todos;
    }
}
