using Entidades.Anuncios;
using Negocio.Conexion;
using Negocio.Resultados;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Negocio.Registro
{
    public class Registro_BL
    {
        public DataTable  get_verificacionCorreo(string email)
        {
            DataTable dt_detalle = new DataTable();
            try
            {
                using (SqlConnection cn = new SqlConnection(bdConexion.cadenaBDcx()))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("WEB_S_REGISTRO_VERIFICAR_EMAIL", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@email", SqlDbType.VarChar).Value = email;

                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(dt_detalle);
                        }
                    }
                }
                return dt_detalle;
            }
            catch (Exception )
            {
                throw;
            }
        }


        public object set_actualizarRegistro(int idUsuario, string nombre, string contra)
        {
            Resultado res = new Resultado();
            DataTable dt_detalle = new DataTable();

            try
            {
                using (SqlConnection cn = new SqlConnection(bdConexion.cadenaBDcx()))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("WEB_U_REGISTRO", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@idUsuario", SqlDbType.Int).Value = idUsuario;
                        cmd.Parameters.Add("@nombreUsuario", SqlDbType.VarChar).Value = nombre;
                        cmd.Parameters.Add("@contasenia", SqlDbType.VarChar).Value = contra;
                        cmd.ExecuteNonQuery();

                        res.ok = true;
                        res.data = "OK";
                        res.totalpage = 0;
          
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


        public object set_grabarCoordinadasMapa(int idAnuncio, string latitud, string longitud)
        {
            Resultado res = new Resultado();
            DataTable dt_detalle = new DataTable();

            try
            {
                using (SqlConnection cn = new SqlConnection(bdConexion.cadenaBDcx()))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("WEB_U_ANUNCIO_COORDENADAS", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@idAnuncio", SqlDbType.Int).Value = idAnuncio;
                        cmd.Parameters.Add("@latitud_anuncio", SqlDbType.VarChar).Value = latitud;
                        cmd.Parameters.Add("@longitud_anuncio", SqlDbType.VarChar).Value = longitud;
                        cmd.ExecuteNonQuery();

                        res.ok = true;
                        res.data = "OK";
                        res.totalpage = 0;
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
        

        public object get_listadoPublicaciones(int idUsuario, int pageindex, int pageSise)
        {
            Resultado res = new Resultado();
            int totalPage = 0;
            List<Anuncios_E> obj_List = new List<Anuncios_E>();
            try
            {
                using (SqlConnection cn = new SqlConnection(bdConexion.cadenaBDcx()))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("WEB_S_PUBLICACION_ANUNCIO_LISTAR", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@idusuario", SqlDbType.Int).Value = idUsuario;
                        cmd.Parameters.Add("@Pageindex", SqlDbType.Int).Value = pageindex;
                        cmd.Parameters.Add("@Pagesize", SqlDbType.Int).Value = pageSise;
                        DataTable dt_detalle = new DataTable();

                        using (SqlDataReader dr = cmd.ExecuteReader())
                        {
                            while (dr.Read())
                            {

                                Anuncios_E Entidad = new Anuncios_E();

                                Entidad.id_Anuncio = Convert.ToInt32(dr["id_Anuncio"].ToString());             
                      
                                Entidad.nombre_anuncio = dr["nombre_anuncio"].ToString();
                                Entidad.titulo_anuncio = dr["titulo_anuncio"].ToString();
                                Entidad.telefono_Anuncion = dr["telefono_Anuncion"].ToString();
                                Entidad.url_fotoPortada = dr["url_fotoPortada"].ToString();
                                Entidad.descripcion_tipo = dr["descripcion_tipo"].ToString();
                                Entidad.colorFondo_tipo = dr["colorFondo_tipo"].ToString();
                                Entidad.colorLetra_tipo = dr["colorLetra_tipo"].ToString();
                                Entidad.totalvistas = dr["totalvistas"].ToString();
                                Entidad.terminoDias = dr["terminoDias"].ToString();

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



    }
}
