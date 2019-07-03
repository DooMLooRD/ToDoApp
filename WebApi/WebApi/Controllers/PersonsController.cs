﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi.Model;
using WebApi.Services;

namespace WebApi.Controllers
{

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
         
    }
}