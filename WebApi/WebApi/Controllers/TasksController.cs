using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.DataAccessLayer;
using WebApi.Model;

namespace WebApi.Controllers
{
   
    [ApiController]
    public class TasksController : ControllerBase
    {
        private TasksAccessLayer _context;

        public TasksController(TasksAccessLayer context)
        {
            _context = context;
        }

        [Route("api/AddTask")]
        [HttpPost]
        public async Task<ActionResult<task>> PostTask(task Task)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _context.AddNewTask(Task);

            return Ok("New Task Added");
        }

        [Route("api/Tasks")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<task>>> GetAllTasks()
        {
            return Ok(await _context.GetAllTasks());
        }

        [Route("api/RemoveTask")]
        [HttpDelete]
        public async Task<IActionResult> DeleteTask([FromQuery] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                await _context.DeleteTask(id);
            }
            catch (ArgumentNullException exception)
            {
                return BadRequest(exception.ParamName);
            }

            return Ok();
        }
    }
}
