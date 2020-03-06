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
using Negocio.Anuncios;

namespace WebApi_GoRelax.Controllers.Anuncios
{
    [EnableCors("*", "*", "*")]
    public class tblAnuncioController : ApiController
    {
        private GoRelaxEntities db = new GoRelaxEntities();

        // GET: api/tblAnuncio
        public IQueryable<tbl_Anuncio> Gettbl_Anuncio()
        {
            return db.tbl_Anuncio;
        }

        public object Gettbl_Anuncio(int opcion, string filtro)
        {
            object resul = null;
            try
            {

                if (opcion == 1)
                {
                    string[] parametros = filtro.Split('|');

                    int id_tipoAnuncio = Convert.ToInt32(parametros[0].ToString());
                    int pageindex = Convert.ToInt32(parametros[1].ToString());
                    int pageSise = Convert.ToInt32(parametros[2].ToString());

                    Anuncios_BL obj_negocio = new Anuncios_BL();
                    resul = obj_negocio.get_anuncios(id_tipoAnuncio, pageindex, pageSise);
                }
                else if (opcion == 2)
                {
                    string[] parametros = filtro.Split('|');

                    int id_anuncio = Convert.ToInt32(parametros[0].ToString());
                    Anuncios_BL obj_negocio = new Anuncios_BL();
                    resul = obj_negocio.get_anuncios_detalle(id_anuncio);
                }
                else if (opcion == 3)
                {
                    Anuncios_BL obj_negocio = new Anuncios_BL();
                    resul = obj_negocio.get_categorias();
                }
                else
                {
                    resul = "Opcion seleccionada invalida";
                }
            }
            catch (Exception ex)
            {
                resul = ex.Message;
            }
            return resul;
        }

        // PUT: api/tblAnuncio/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Puttbl_Anuncio(int id, tbl_Anuncio tbl_Anuncio)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tbl_Anuncio.id_Anuncio)
            {
                return BadRequest();
            }

            db.Entry(tbl_Anuncio).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!tbl_AnuncioExists(id))
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

        // POST: api/tblAnuncio
        [ResponseType(typeof(tbl_Anuncio))]
        public IHttpActionResult Posttbl_Anuncio(tbl_Anuncio tbl_Anuncio)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            tbl_Anuncio.fecha_creacion = DateTime.Now;
            db.tbl_Anuncio.Add(tbl_Anuncio);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = tbl_Anuncio.id_Anuncio }, tbl_Anuncio);
        }

        // DELETE: api/tblAnuncio/5
        [ResponseType(typeof(tbl_Anuncio))]
        public IHttpActionResult Deletetbl_Anuncio(int id)
        {
            tbl_Anuncio tbl_Anuncio = db.tbl_Anuncio.Find(id);
            if (tbl_Anuncio == null)
            {
                return NotFound();
            }

            db.tbl_Anuncio.Remove(tbl_Anuncio);
            db.SaveChanges();

            return Ok(tbl_Anuncio);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool tbl_AnuncioExists(int id)
        {
            return db.tbl_Anuncio.Count(e => e.id_Anuncio == id) > 0;
        }
    }
}