using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebApi.Model;
using WebApi.Services;
using WebApi.Services.DTOs;

namespace WebApi.Controllers
{
   
    [ApiController]
    public class TasksController : ControllerBase
    {
        private TodoService _todoService;

        public TasksController(TodoService todoService)
        {
            _todoService = todoService;
        }

        [Route("api/AddTask")]
        [HttpPost]
        public async Task<ActionResult<ToDoDTO>> PostTodo(Todo todo)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                return Ok(await _todoService.AddNewTodo(todo));

            }
            catch(ArgumentException exception)
            {
                return BadRequest(exception.Message);
            }
            catch (Exception exception)
            {
                return BadRequest(exception.Message);

            }

        }

        [Route("api/Tasks")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ToDoDTO>>> GetAllToDos()
        {
            return Ok(await _todoService.GetAllTodoDTOs());
        }

        [Route("api/RemoveTask")]
        [HttpDelete]
        public async Task<IActionResult> DeleteTodo([FromQuery] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                await _todoService.DeleteTodo(id);
            }
            catch (ArgumentNullException exception)
            {
                return BadRequest(exception.ParamName);
            }

            return Ok();
        }

        [Route("api/UpdateTask")]
        [HttpPut]
        public async Task<ActionResult<Todo>> UpdateTodo([FromQuery] int id, [FromBody] Todo todo)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                return Ok(await _todoService.UpdateTodo(id, todo));
            }
            catch (ArgumentNullException exception)
            {
                return BadRequest(exception.ParamName);
            }
            catch( Exception exception)
            {
                return BadRequest(exception.Message);
            }
        }

    }
}
