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





    }
}
