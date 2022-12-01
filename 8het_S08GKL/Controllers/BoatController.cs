using _8het_S08GKL.Models;
using Microsoft.AspNetCore.Mvc;

namespace _8het_S08GKL.Controllers
{
    public class BoatController : Controller
    {
        [HttpGet]
        [Route("questions/all")]
        public IActionResult MindegyHogyHivjak()
        {
            HajoContext context = new HajoContext();
            var kérédesek = from x in context.Questions select x.Question1;

            return Ok(kérédesek);
        }
    }
}
