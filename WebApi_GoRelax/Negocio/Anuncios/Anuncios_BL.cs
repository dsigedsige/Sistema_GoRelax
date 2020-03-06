using Entidades.Anuncios;
using Entidades.Publicar;
using Negocio.Conexion;
using Negocio.Resultados;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Negocio.Anuncios
{
    public class Anuncios_BL
    {
        public object get_anuncios(int tipoAnuncio, int pageindex, int  pageSise)
        {
            Resultado res = new Resultado();
            int totalPage = 0;
            List<Anuncios_E> obj_List = new List<Anuncios_E>();
            try
            {
                using (SqlConnection cn = new SqlConnection(bdConexion.cadenaBDcx()))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("WEB_S_ANUNCIOS", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@tipo_anuncio", SqlDbType.Int).Value = tipoAnuncio;
                        cmd.Parameters.Add("@Pageindex", SqlDbType.Int).Value = pageindex;
                        cmd.Parameters.Add("@Pagesize", SqlDbType.Int).Value = pageSise;
                        DataTable dt_detalle = new DataTable();

                        using (SqlDataReader dr = cmd.ExecuteReader())
                        {
                             while (dr.Read())
                            {

                                Anuncios_E Entidad = new Anuncios_E();                          

                                Entidad.id_Anuncio = Convert.ToInt32(dr["id_Anuncio"].ToString());
                                Entidad.idAnuncio_idCategoria = dr["idAnuncio_idCategoria"].ToString();
                                Entidad.descripcion_departamento = dr["descripcion_departamento"].ToString();
                                Entidad.nombre_distrito = dr["nombre_distrito"].ToString();
                                Entidad.telefono_Anuncion = dr["telefono_Anuncion"].ToString();
                                Entidad.titulo_anuncio = dr["titulo_anuncio"].ToString();
                                Entidad.nombre_anuncio = dr["nombre_anuncio"].ToString();
                                Entidad.edad_anuncio = dr["edad_anuncio"].ToString();
                                Entidad.audio_anuncio = dr["audio_anuncio"].ToString();
                                Entidad.contactoWhatsapp = dr["contactoWhatsapp"].ToString();
                                Entidad.estado = dr["estado"].ToString();
                                Entidad.url_fotoPortada = dr["url_fotoPortada"].ToString();

                                obj_List.Add(Entidad);


                            }
                            dr.NextResult();

                            while (dr.Read())
                            {
                                totalPage = Convert.ToInt32(dr["totalcount"]);
                            }

                            dr.Close();

                             res.ok = true;
                             res.data = obj_List;
                             res.totalpage = totalPage;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                res.ok = false;
                res.data = ex.Message;
            }
            return res;
        }

        public object get_anuncios_detalle(int idAnuncio)
        {
            Resultado res = new Resultado();
            Anuncios_List listaAnuncios = new Anuncios_List();

            List<Anuncios_E> obj_List = new List<Anuncios_E>();
            List<AnunciosFoto_E> obj_ListFoto = new List<AnunciosFoto_E>();
            List<AnunciosVideo_E> obj_ListVideo = new List<AnunciosVideo_E>();
            List<AnunciosCaracteristica_E> obj_ListCaract = new List<AnunciosCaracteristica_E>();

            try
            {

                using (SqlConnection cn = new SqlConnection(bdConexion.cadenaBDcx()))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("WEB_S_ANUNCIOS_DETALLE", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@id_Anuncio", SqlDbType.Int).Value = idAnuncio;

                        DataTable dt_detalle = new DataTable();

                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(dt_detalle);

                            foreach (DataRow row in dt_detalle.Rows)
                            {
                                Anuncios_E Entidad = new Anuncios_E();

                                Entidad.id_Anuncio = Convert.ToInt32(row["id_Anuncio"].ToString());
                                Entidad.idAnuncio_idCategoria = row["idAnuncio_idCategoria"].ToString();
                                Entidad.descripcion_departamento = row["descripcion_departamento"].ToString();
                                Entidad.nombre_distrito = row["nombre_distrito"].ToString();
                                Entidad.telefono_Anuncion = row["telefono_Anuncion"].ToString();
                                Entidad.titulo_anuncio = row["titulo_anuncio"].ToString();
                                Entidad.descripcion_anuncio = row["descripcion_anuncio"].ToString();
                                Entidad.nombre_anuncio = row["nombre_anuncio"].ToString();
                                Entidad.edad_anuncio = row["edad_anuncio"].ToString();
                                Entidad.audio_anuncio = row["audio_anuncio"].ToString();
                                Entidad.contactoWhatsapp = row["contactoWhatsapp"].ToString();
                                Entidad.estado = row["estado"].ToString();
                                Entidad.url_fotoPortada = row["url_fotoPortada"].ToString();

                                Entidad.latitud_anuncio = row["latitud_anuncio"].ToString();
                                Entidad.longitud_anuncio = row["longitud_anuncio"].ToString();

                                obj_List.Add(Entidad);
                            }
                        }
                    }

                    using (SqlCommand cmd = new SqlCommand("WEB_S_ANUNCIOS_DETALLE_FOTO", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@id_Anuncio", SqlDbType.Int).Value = idAnuncio;

                        DataTable dt_detalleFoto = new DataTable();

                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(dt_detalleFoto);

                            foreach (DataRow row in dt_detalleFoto.Rows)
                            {
                                AnunciosFoto_E EntidadFoto = new AnunciosFoto_E();
                                EntidadFoto.url_foto = row["url_foto"].ToString();

                                obj_ListFoto.Add(EntidadFoto);
                            }
                        }
                    }

                    using (SqlCommand cmd = new SqlCommand("WEB_S_ANUNCIOS_DETALLE_VIDEO", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@id_Anuncio", SqlDbType.Int).Value = idAnuncio;

                        DataTable dt_detalleVideo = new DataTable();

                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(dt_detalleVideo);

                            foreach (DataRow row in dt_detalleVideo.Rows)
                            {
                                AnunciosVideo_E EntidadVideo = new AnunciosVideo_E();
                                EntidadVideo.url_video = row["url_video"].ToString();

                                obj_ListVideo.Add(EntidadVideo);
                            }
                        }
                    }

                    using (SqlCommand cmd = new SqlCommand("WEB_ANUNCIOS_CARACTERISTICAS", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@id_Anuncio", SqlDbType.Int).Value = idAnuncio;

                        DataTable dt_detalleVideo = new DataTable();

                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(dt_detalleVideo);

                            foreach (DataRow row in dt_detalleVideo.Rows)
                            {
                                AnunciosCaracteristica_E EntidadCaract = new AnunciosCaracteristica_E();

                                EntidadCaract.Grupo = Convert.ToInt32(row["Grupo"].ToString());
                                EntidadCaract.dato1  = row["dato1"].ToString();
                                EntidadCaract.dato2 = row["dato2"].ToString();


                                obj_ListCaract.Add(EntidadCaract);
                            }
                        }
                    }

                    listaAnuncios.list_anuncios = obj_List;
                    listaAnuncios.list_fotos = obj_ListFoto;
                    listaAnuncios.list_videos = obj_ListVideo;
                    listaAnuncios.list_caracteristica = obj_ListCaract;

                    res.ok = true;
                    res.data = listaAnuncios;
                    res.totalpage = 0;

                }
            }
            catch (Exception ex)
            {
                res.ok = false;
                res.data = ex.Message;
            }
            return res;
        }


        public object get_categorias()
        {
            Resultado res = new Resultado();
            DataTable dt_detalle = new DataTable();

            try
            {
                using (SqlConnection cn = new SqlConnection(bdConexion.cadenaBDcx()))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("WEB_S_CATEGORIAS", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;

                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(dt_detalle);

                            res.ok = true;
                            res.data = dt_detalle;
                            res.totalpage = 0;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                res.ok = false;
                res.data = ex.Message;
            }
            return res;
        }
               




    }
}
