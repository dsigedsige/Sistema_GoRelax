using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using Entidades;

namespace WebApi_GoRelax.Controllers.AnuncioCaracteritica
{
    [EnableCors("*", "*", "*")]
    public class tblAnuncio_CaracteristicasController : ApiController
    {
        private GoRelaxEntities db = new GoRelaxEntities();

        // GET: api/tblAnuncio_Caracteristicas
        public IQueryable<tbl_Anuncio_Caracteristicas> Gettbl_Anuncio_Caracteristicas()
        {
            return db.tbl_Anuncio_Caracteristicas;
        }

        // GET: api/tblAnuncio_Caracteristicas/5
        [ResponseType(typeof(tbl_Anuncio_Caracteristicas))]
        public IHttpActionResult Gettbl_Anuncio_Caracteristicas(int id)
        {
            tbl_Anuncio_Caracteristicas tbl_Anuncio_Caracteristicas = db.tbl_Anuncio_Caracteristicas.Find(id);
            if (tbl_Anuncio_Caracteristicas == null)
            {
                return NotFound();
            }

            return Ok(tbl_Anuncio_Caracteristicas);
        }

        // PUT: api/tblAnuncio_Caracteristicas/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Puttbl_Anuncio_Caracteristicas(int id, tbl_Anuncio_Caracteristicas tbl_Anuncio_Caracteristicas)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tbl_Anuncio_Caracteristicas.id_CaracteristicaAnuncio)
            {
                return BadRequest();
            }

            db.Entry(tbl_Anuncio_Caracteristicas).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!tbl_Anuncio_CaracteristicasExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/tblAnuncio_Caracteristicas
        [ResponseType(typeof(tbl_Anuncio_Caracteristicas))]
        public IHttpActionResult Posttbl_Anuncio_Caracteristicas(tbl_Anuncio_Caracteristicas tbl_Anuncio_Caracteristicas)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            tbl_Anuncio_Caracteristicas.fecha_creacion = DateTime.Now;
            db.tbl_Anuncio_Caracteristicas.Add(tbl_Anuncio_Caracteristicas);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = tbl_Anuncio_Caracteristicas.id_CaracteristicaAnuncio }, tbl_Anuncio_Caracteristicas);
        }

        // DELETE: api/tblAnuncio_Caracteristicas/5
        [ResponseType(typeof(tbl_Anuncio_Caracteristicas))]
        public IHttpActionResult Deletetbl_Anuncio_Caracteristicas(int id)
        {
            tbl_Anuncio_Caracteristicas tbl_Anuncio_Caracteristicas = db.tbl_Anuncio_Caracteristicas.Find(id);
            if (tbl_Anuncio_Caracteristicas == null)
            {
                return NotFound();
            }

            db.tbl_Anuncio_Caracteristicas.Remove(tbl_Anuncio_Caracteristicas);
            db.SaveChanges();

            return Ok(tbl_Anuncio_Caracteristicas);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool tbl_Anuncio_CaracteristicasExists(int id)
        {
            return db.tbl_Anuncio_Caracteristicas.Count(e => e.id_CaracteristicaAnuncio == id) > 0;
        }
    }
}