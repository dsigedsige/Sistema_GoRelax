using Entidades;
using Negocio.Resultados;
using System;
using System.Collections.Generic;
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

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
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

                tbl_Anuncio_Caracteristicas.fecha_creacion = DateTime.Now;
                db.tbl_Anuncio_Caracteristicas.Add(tbl_Anuncio_Caracteristicas);
                db.SaveChanges();
 
                res.ok = true;
                res.data = "OK";
                res.totalpage = 0;

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

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
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

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
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
