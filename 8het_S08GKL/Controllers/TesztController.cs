using Microsoft.AspNetCore.Mvc;

namespace _8het_S08GKL.Controllers
{
    [ApiController]
    public class TesztController : Controller
    {
        [HttpGet]
        [Route("corvinus/szerveridő")]
        public IActionResult M1()
        {
            string pontosIdő = DateTime.Now.ToShortTimeString();

            return new ContentResult
            {
                ContentType = System.Net.Mime.MediaTypeNames.Text.Plain, //"text/plain
                Content = pontosIdő
            };
        }
        [HttpGet]
        [Route("corvinus/nagybetus/{szoveg}")]
        public IActionResult M2(string szoveg)
        {
            if (string.IsNullOrEmpty(szoveg))
            {
                return BadRequest("Nem megfelelő a bemenő adat");
            }

            return Ok(szoveg.ToUpper());
        }
    }
}
