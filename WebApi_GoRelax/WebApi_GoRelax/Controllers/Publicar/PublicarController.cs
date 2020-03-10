using Entidades;
using Negocio.Registro;
using Negocio.Resultados;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace WebApi_GoRelax.Controllers.Publicar
{
    [EnableCors("*", "*", "*")]
    public class PublicarController : ApiController
    {
        private GoRelaxEntities db = new GoRelaxEntities();

        public object GetPublicar(int opcion, string filtro)
        {
            object resul = null;
            try
            {
                if (opcion == 1)
                {
                    resul = (from a in db.tbl_Categoria
                             where a.estado == 1
                             select new
                             {
                                 a.id_Categoria,
                                 a.nombre_Categoria
                             }).ToList();

                }
                else if (opcion == 2)
                {
                    resul = (from a in db.tbl_Departamentos
                             where a.estado == 1
                             select new
                             {
                                 a.id_departamento,
                                 a.descripcion_departamento



                             }).ToList();

                }
                else if (opcion == 3)
                {
                    string[] parametros = filtro.Split('|');
                    int idDepartamento = Convert.ToInt32(parametros[0].ToString());

                    resul = (from a in db.tbl_Distritos
                             where a.id_departamento == idDepartamento 
                             select new
                             {
                                 a.id_distrito,
                                 a.nombre_distrito
                             }).ToList();

                }
                else if (opcion == 4)
                {
                    resul = (from a in db.tbl_Nacionalidad
                             where a.estado == 1
                             select new
                             {
                                 a.id_nacionalidad,
                                 a.descripcion_nacionalidad
                             }).ToList();

                }
                else if (opcion == 5)
                {
                    string[] parametros = filtro.Split('|');
                    int idGrupo = Convert.ToInt32(parametros[0].ToString());

                    resul = (from a in db.tbl_Caracteristicas
                             where a.grupo_caracteristica == idGrupo && a.estado == 1
                             select new
                             {
                                 a.id_caracteristica,
                                 a.descripcion_caracteristica
                             }).ToList();

                }
                else if (opcion == 6)
                {
                    var ListGrupo = new string[] { "8", "9", "10" };
                    resul = (from x in db.tbl_Caracteristicas
                            where ListGrupo.Contains(x.grupo_caracteristica.ToString())
                            select new
                            {
                                x.id_caracteristica,
                                x.grupo_caracteristica,
                                x.descripcion_caracteristica,
                                checkeado=false
                            }).ToList();

                }
                else if (opcion == 7)
                {
                    string[] parametros = filtro.Split('|');
                    int idAnuncio = Convert.ToInt32(parametros[0].ToString());
                    string latitud = parametros[1].ToString();
                    string longitud = parametros[2].ToString();

                    Registro_BL obj_negocio = new Registro_BL();
                    resul = obj_negocio.set_grabarCoordinadasMapa(idAnuncio, latitud, longitud);
                }
                else if (opcion == 8)
                {
                    string[] parametros = filtro.Split('|');
                    int idAnuncio = Convert.ToInt32(parametros[0].ToString());
                    string tipoArchivo = parametros[1].ToString();

                    

                    /// eliminando en bloque ------
                    db.tbl_Anuncio_Galeria.RemoveRange(db.tbl_Anuncio_Galeria.Where(c => c.id_Anuncio == idAnuncio  &&  c.tipoArchivo_GaleriaAnuncio == tipoArchivo));
                    db.SaveChanges();
                    /// eliminando en bloque ------

                    resul = "OK";

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


        public object Posttbl_tarifaAnuncio(List<tbl_Anuncio_Tarifa> listAnuncio)
        {
            Resultado res = new Resultado();
            try
            {

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                ///----eliminando todo los detalles,  para agregar en bloque .....                
                if (listAnuncio.Count > 0)
                {
                    int idAnuncio = listAnuncio[0].id_Anuncio;
                    db.tbl_Anuncio_Tarifa.RemoveRange(db.tbl_Anuncio_Tarifa.Where(c => c.id_Anuncio == idAnuncio));
                    db.SaveChanges();
                }

                foreach (var tarifa in listAnuncio)
                {
                    tarifa.fecha_creacion = DateTime.Now;
                    db.tbl_Anuncio_Tarifa.Add(tarifa);
                    db.SaveChanges();
                }

                if (listAnuncio.Count > 0)
                {
                    res.ok = true;
                    res.data = "OK";
                    res.totalpage = 0;
                }
                else {
                    res.ok = false;
                    res.data = "No hay informacion para almacenar";
                    res.totalpage = 0;
                }
            }
            catch (Exception ex)
            {
                res.ok = false;
                res.data = ex.Message;
                res.totalpage = 0;
            }
            return res;
        }


        [HttpPost]
        [Route("api/Publicar/post_horarioAnuncio")]
        public object post_horarioAnuncio(List<tbl_Anuncio_Horarios> listAnuncioHorario)
        {
            Resultado res = new Resultado();
            try
            {

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                ///----eliminando todo los detalles,  para agregar en bloque .....                
                if (listAnuncioHorario.Count > 0)
                {
                    int idAnuncio = Convert.ToInt32(listAnuncioHorario[0].id_Anuncio);
                    db.tbl_Anuncio_Horarios.RemoveRange(db.tbl_Anuncio_Horarios.Where(c => c.id_Anuncio == idAnuncio));
                    db.SaveChanges();
                }

                foreach (var horario in listAnuncioHorario)
                {
                    horario.fecha_creacion = DateTime.Now;
                    db.tbl_Anuncio_Horarios.Add(horario);
                    db.SaveChanges();
                }

                if (listAnuncioHorario.Count > 0)
                {
                    res.ok = true;
                    res.data = "OK";
                    res.totalpage = 0;
                }
                else
                {
                    res.ok = false;
                    res.data = "No hay informacion para almacenar";
                    res.totalpage = 0;
                }
            }
            catch (Exception ex)
            {
                res.ok = false;
                res.data = ex.Message;
                res.totalpage = 0;
            }
            return res;

        }


        [HttpPost]
        [Route("api/Publicar/post_caracteristicaAnuncio")]
        public object post_caracteristicaAnuncio(tbl_Anuncio_Caracteristicas  tbl_Anuncio_Caracteristicas)
        {
            Resultado res = new Resultado();
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                if (db.tbl_Anuncio.Count((a) => a.id_Anuncio == tbl_Anuncio_Caracteristicas.id_Anuncio) == 0) //---- nuevo
                {

                    tbl_Anuncio_Caracteristicas.fecha_creacion = DateTime.Now;
                    db.tbl_Anuncio_Caracteristicas.Add(tbl_Anuncio_Caracteristicas);
                    db.SaveChanges();

                    res.ok = true;
                    res.data = "OK";
                    res.totalpage = 0;

                }
                else {   ///----editar

                    tbl_Anuncio_Caracteristicas objReemplazar;
                    objReemplazar = db.tbl_Anuncio_Caracteristicas.Where(v => v.id_Anuncio == tbl_Anuncio_Caracteristicas.id_Anuncio).FirstOrDefault<tbl_Anuncio_Caracteristicas>();

                    objReemplazar.id_Nacionalidad = tbl_Anuncio_Caracteristicas.id_Nacionalidad;
                    objReemplazar.id_Piel = tbl_Anuncio_Caracteristicas.id_Piel;
                    objReemplazar.id_Cabello = tbl_Anuncio_Caracteristicas.id_Cabello;
                    objReemplazar.id_Estatura = tbl_Anuncio_Caracteristicas.id_Estatura;

                    objReemplazar.id_Cuerpo = tbl_Anuncio_Caracteristicas.id_Cuerpo;
                    objReemplazar.id_Pechos = tbl_Anuncio_Caracteristicas.id_Pechos;
                    objReemplazar.id_Pubis = tbl_Anuncio_Caracteristicas.id_Pubis;

                    objReemplazar.atencion_Mujer = tbl_Anuncio_Caracteristicas.atencion_Mujer;
                    objReemplazar.atencion_Parejas = tbl_Anuncio_Caracteristicas.atencion_Parejas;
                    objReemplazar.atencion_Discapacitados = tbl_Anuncio_Caracteristicas.atencion_Discapacitados;
                    objReemplazar.atencion_Hombres = tbl_Anuncio_Caracteristicas.atencion_Hombres;
                    objReemplazar.medioPago_Efectivo = tbl_Anuncio_Caracteristicas.medioPago_Efectivo;
                    objReemplazar.medioPago_Tarjeta = tbl_Anuncio_Caracteristicas.medioPago_Tarjeta;

                    db.Entry(objReemplazar).State = EntityState.Modified;

                    try
                    {
                        db.SaveChanges();
                        res.ok = true;
                        res.data = "OK";
                        res.totalpage = 0;
                    }
                    catch (DbUpdateConcurrencyException ex)
                    {
                        res.ok = false;
                        res.data = ex.InnerException.Message;
                        res.totalpage = 0;
                    }
                }

            }
            catch (Exception ex)
            {
                res.ok = false;
                res.data = ex.Message;
                res.totalpage = 0;
            }
            return res;

        }


        [HttpPost]
        [Route("api/Publicar/post_serviciosAnuncio")]
        public object post_serviciosAnuncio(List<tbl_Anuncio_Servicio> listAnuncioServices)
        {
            Resultado res = new Resultado();
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                ///----eliminando todo los detalles,  para agregar en bloque .....                
                if (listAnuncioServices.Count > 0)
                {
                    int idAnuncio = Convert.ToInt32(listAnuncioServices[0].id_Anuncio);
                    db.tbl_Anuncio_Servicio.RemoveRange(db.tbl_Anuncio_Servicio.Where(c => c.id_Anuncio == idAnuncio));
                    db.SaveChanges();
                }

                foreach (var serv in listAnuncioServices)
                {
                    serv.fecha_creacion = DateTime.Now;
                    db.tbl_Anuncio_Servicio.Add(serv);
                    db.SaveChanges();
                }

                if (listAnuncioServices.Count > 0)
                {
                    res.ok = true;
                    res.data = "OK";
                    res.totalpage = 0;
                }
                else
                {
                    res.ok = false;
                    res.data = "No hay informacion para almacenar";
                    res.totalpage = 0;
                }
            }
            catch (Exception ex)
            {
                res.ok = false;
                res.data = ex.Message;
                res.totalpage = 0;
            }
            return res;

        }
        

        [HttpPost]
        [Route("api/Publicar/post_lugarAnuncio")]
        public object post_lugarAnuncio(List<tbl_Anuncio_Lugar> listAnuncioLugar)
        {
            Resultado res = new Resultado();
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                ///----eliminando todo los detalles,  para agregar en bloque .....                
                if (listAnuncioLugar.Count > 0)
                {
                    int idAnuncio = Convert.ToInt32(listAnuncioLugar[0].id_Anuncio);
                    db.tbl_Anuncio_Lugar.RemoveRange(db.tbl_Anuncio_Lugar.Where(c => c.id_Anuncio == idAnuncio));
                    db.SaveChanges();
                }


                foreach (var anun in listAnuncioLugar)
                {
                    anun.fecha_creacion = DateTime.Now;
                    db.tbl_Anuncio_Lugar.Add(anun);
                    db.SaveChanges();
                }

                if (listAnuncioLugar.Count > 0)
                {
                    res.ok = true;
                    res.data = "OK";
                    res.totalpage = 0;
                }
                else
                {
                    res.ok = false;
                    res.data = "No hay informacion para almacenar";
                    res.totalpage = 0;
                }
            }
            catch (Exception ex)
            {
                res.ok = false;
                res.data = ex.Message;
                res.totalpage = 0;
            }
            return res;

        }



    }
}
