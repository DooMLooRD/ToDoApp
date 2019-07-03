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
        private IRepository<Todo> _repository;

        public TodoService(IRepository<Todo> repository)
        {
            _repository = repository;
        }

        public async Task<Todo> AddNewTodo(Todo todo)
        {
            return await _repository.AddItemAsync(todo);

        }

        public async Task<List<ToDoDTO>> GetAllTodoDTOs()
        {
            List<ToDoDTO> toDoDTOs = new List<ToDoDTO>();
            List<Todo> toDos = (await _repository.GetAllItemsAsync()).Where(t=>t.Parent==null).ToList();

            foreach (Todo toDo in toDos)
            {
                toDoDTOs.Add(await ConvertToDTO(toDo));
            }

            return toDoDTOs;
        }

        public async Task DeleteTodo(int id)
        {
            await _repository.RemoveItemAsync(id);
        }

        public async Task<Todo> UpdateTodo(int id, Todo todo)
        {
            return await _repository.UpdateItemAsync(id, todo);
        }

        public async Task<ToDoDTO> ConvertToDTO(Todo toDo)
        {
            ToDoDTO dto = new ToDoDTO {Todo = toDo, Todos=new List<ToDoDTO>(), FullName = (toDo.Person.Name + " " +toDo.Person.Surname)};
            foreach (Todo todo in  await _repository.GetAllChildItemsAsync(toDo))
            {
                dto.Todos.Add(await ConvertToDTO(todo));
            }

            return dto;
        }
    }
}
