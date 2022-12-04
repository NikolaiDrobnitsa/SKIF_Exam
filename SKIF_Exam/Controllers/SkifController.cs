using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SKIF_Exam.Data;
using SKIF_Exam.Models;

namespace SKIF_Exam.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SkifController : Controller
    {
        private readonly DbContextClass _context;
        public SkifController(DbContextClass context)
        {
            _context = context;
        }
        [HttpGet]
        [Route("KnifesList")]
        public async Task<ActionResult<IEnumerable<Skif>>> Get(int page)
        {
            List<Skif> list = await _context.skifs.ToListAsync();
            
            List<Skif> pageList = new();

            for (int i = 0; i < list.Count; i++)
            {
                if (i < (page * 6) && i >= ((page * 6) - 6))
                {
                    pageList.Add(list[i]);
                }
            }
            return pageList;
        }
        [HttpGet]
        [Route("GetPages")]
        public async Task<ActionResult<int>> GetPages()
        {
            List<Skif> list = await _context.skifs.ToListAsync();
            int products = list.Count;
            if (products % 6 == 0) return products / 6;
            else return products / 6 + 1;
        }

        

        [HttpPost, Authorize]
        [Route("CreateKnife")]
        public async Task<ActionResult> POST([FromForm] Skif skif)
        {
            if (!TryValidateModel(skif, nameof(Skif)))
                return BadRequest();
            ModelState.ClearValidationState(nameof(Skif));
            await _context.skifs.AddAsync(skif);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete, Authorize]
        [Route("DeleteKnife")]
        public async Task<ActionResult> Delete(int id)
        {
            var knife = await _context.skifs.FindAsync(id);
            if (knife == null)
            {
                return NotFound();
            }
            _context.skifs.Remove(knife);
            await _context.SaveChangesAsync();
            return Ok();
        }

       
    }
}
