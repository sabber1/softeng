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

        [HttpGet]
        [Route("question/{sorszam}")]
        public IActionResult GetQuestionFromId(int sorszam)
        {
            HajoContext ctx = new HajoContext();
            var kerdes = (from x in ctx.Questions
                          where x.QuestionId == sorszam
                          select x).FirstOrDefault();

            if (kerdes == null) return BadRequest("Nincs ilyen sorszámmal rendelkező kérdése");

            return new JsonResult(kerdes);
        }
        [HttpGet]
        [Route("questions/count")]
        public IActionResult GetQuestionsCount()
        {
            HajoContext context = new HajoContext();
            return Ok(context.Questions.Count());
        }
    }
}
