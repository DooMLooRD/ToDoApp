using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebApi.Model;
using WebApi.Services;

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
        public async Task<ActionResult<Todo>> PostTodo(Todo todo)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _todoService.AddNewTodo(todo);

            return Ok(todo);
        }

        [Route("api/Tasks")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Todo>>> GetAllTodo()
        {
            return Ok(await _todoService.GetAllTodos());
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
        }

    }
}
