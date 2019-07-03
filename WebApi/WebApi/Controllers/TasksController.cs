using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using WebApi.Model;
using WebApi.Services;
using WebApi.Services.DTOs;

namespace WebApi.Controllers
{
   
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly ILogger<TasksController> _logger;
        private TodoService _todoService;

        public TasksController( ILogger<TasksController> logger,TodoService todoService)
        {
            _logger = logger;
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
                _logger.LogError(exception.Message);
                return BadRequest(exception.Message);
            }
            catch (Exception exception)
            {
                _logger.LogCritical(exception.Message);
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
                _logger.LogError(exception.Message);
                return BadRequest(exception.Message);
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
                _logger.LogError(exception.Message);
                return BadRequest(exception.Message);
            }
            catch( Exception exception)
            {
                _logger.LogCritical(exception.Message);
                return BadRequest(exception.Message);
            }
        }

    }
}
