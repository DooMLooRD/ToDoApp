using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi.Model;
using WebApi.Services;

namespace WebApi.Controllers
{
    [Authorize]
    [ApiController]
    public class PersonsController : ControllerBase
    {
        private PersonService _personService;

        public PersonsController(PersonService personService)
        {
            _personService = personService;
        }


        [Route("api/Person/{pesel}")]
        [HttpGet]
        public async Task<ActionResult<Person>> GetPerson(string pesel)
        {
            return Ok(await _personService.FindPerson(pesel));
        }


        [Route("api/AddPerson")]
        [HttpPost]
        public async Task<ActionResult<Person>> PostPerson(Person person)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                await _personService.AddNewPerson(person);
                return Ok(person);

            }
            catch (Exception exception)
            {
                return BadRequest(exception);

            }


            


           
        }

        [AllowAnonymous]
        [HttpPost("api/Authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] Person person)
        {
            var user = await _personService.Authenticate(person.Login, person.Password);
            if (user == null)
                return BadRequest(new {message = "Login or password is incorrect"});
            return Ok(user);
        }

        [Route("api/UsersWithoutPassword")]
        [HttpGet]
        public async Task<IActionResult> GetAllWithoutPassword()
        {
            var users = await _personService.GetAllWithoutPassword();
            return Ok(users);
        }

    }
}