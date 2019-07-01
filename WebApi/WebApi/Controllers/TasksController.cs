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
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private TasksAccessLayer _context;

        public TasksController(TasksAccessLayer context)
        {
            _context = context;
        }

       
    }
}
