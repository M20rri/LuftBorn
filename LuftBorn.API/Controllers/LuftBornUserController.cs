using LuftBorn.API.IService;
using LuftBorn.API.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace LuftBorn.API.Controllers
{
    [ApiController]
    public class LuftBornUserController : Controller
    {
        private readonly IUserService _user;
        public LuftBornUserController(IUserService user)
        {
            _user = user;
        }

        [HttpPost , Route("api/LuftBornUser/Login") ]
        public IActionResult Login(LoginVM model)
        {
            return Ok(_user.GetLogin(model.Email , model.Password));
        }

        [HttpGet, Route("api/LuftBornUser/UsersGrid")]
        public IActionResult UsersGrid()
        {
            return Ok(_user.GetUsers());
        }



    }
}