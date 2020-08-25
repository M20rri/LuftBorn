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

        [HttpPost, Route("api/LuftBornUser/AddUser")]
        public IActionResult AddUser(UserVM model)
        {
            return Ok(_user.AddUser(model));
        }

        [HttpPost, Route("api/LuftBornUser/EditUser")]
        public IActionResult EditUser(UserVM model)
        {
            return Ok(_user.EditUser(model));
        }

        [HttpGet, Route("api/LuftBornUser/UsersGrid")]
        public IActionResult UsersGrid()
        {
            return Ok(_user.GetUsers());
        }

        [HttpGet, Route("api/LuftBornUser/DeleteUser/{id}")]
        public IActionResult DeleteUser(int id)
        {
            return Ok(_user.DeleteUser(id));
        }

    }
}