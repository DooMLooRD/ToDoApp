using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Model;
using WebApi.Repository;
using WebApi.Services.DTOs;

namespace WebApi.Services
{
    public class TodoService
    {
        private IRepository<Todo> _todoRepository;

        public TodoService(IRepository<Todo> repository)
        {
            _todoRepository = repository;
        }

        public async Task<ToDoDTO> AddNewTodo(Todo todo)
        {
            return await ConvertToDTO(await _todoRepository.AddItemAsync(todo));
        }

        public async Task<List<ToDoDTO>> GetAllTodoDTOs()
        {
            List<ToDoDTO> toDoDTOs = new List<ToDoDTO>();
            List<Todo> toDos = (await _todoRepository.GetAllItemsAsync()).Where(t=>t.Parent==null).ToList();

            foreach (Todo toDo in toDos)
            {
                toDoDTOs.Add(await ConvertToDTO(toDo));
            }

            return toDoDTOs;
        }

        public async Task DeleteTodo(int id)
        {
            await _todoRepository.RemoveItemAsync(id);
        }

        public async Task<Todo> UpdateTodo(int id, Todo todo)
        {
            return await _todoRepository.UpdateItemAsync(id, todo);
        }

        public async Task<ToDoDTO> ConvertToDTO(Todo toDo)
        {
            toDo.Person.Todos = null;
            ToDoDTO dto = new ToDoDTO {Todo = toDo, Todos=new List<ToDoDTO>(), PersonFullName = (toDo.Person.Name + " " +toDo.Person.Surname)};
            foreach (Todo todo in  await _todoRepository.GetAllChildItemsAsync(toDo))

            {
                dto.Todos.Add(await ConvertToDTO(todo));
            }

            return dto;
        }
    }
}
