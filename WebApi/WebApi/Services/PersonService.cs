using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using WebApi.Helpers;
using WebApi.Model;
using WebApi.Repository;
using WebApi.Services.DTOs;

namespace WebApi.Services
{
    public class PersonService:ToDoDTO
    {
        private IPersonRepository<Person> _personRepository;

        private readonly AppSettings _appSettings;

        public PersonService(IPersonRepository<Person> personRepository, IOptions<AppSettings> appSettings)
        {

            _personRepository = personRepository;
            _appSettings = appSettings.Value;
        }

        public async Task<Person> FindPerson(string pesel)
        {
   
            return await _personRepository.GetItem(pesel);
        }

        public async Task<Person> AddNewPerson(Person person)
        {

            string currentYear = DateTime.Now.Year.ToString();
            int numberCurrentYear = Int32.Parse(currentYear);
            string textdateOfBirth = person.Pesel.Substring(0,2);
            int numberdateOfBirth = Int32.Parse(textdateOfBirth);
            person.Age = numberCurrentYear - (numberdateOfBirth + 1900);
            return await _personRepository.AddPerson(person);

        }
        public async Task<Person> Authenticate(string login, string password)
        {
            var user = (await _personRepository.GetAllItems()).SingleOrDefault(t => t.Login == login && t.Password == password);
            if (user == null)
                return null;

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Pass);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Pesel.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.Token = tokenHandler.WriteToken(token);

            user.Password = null;

            return user;
        }

        public async Task<IEnumerable<Person>> GetAllWithoutPassword()
        {
            return (await _personRepository.GetAllItems()).Select(t =>
            {
                t.Password = null;
                return t;
            });
        }

    }


   
   


}
