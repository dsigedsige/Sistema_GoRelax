using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entidades.Publicacion
{
    public class Publicacion_E
    {
        public int id_Anuncio { get; set; }
        public string id_Usuario { get; set; }
        public string email_usuario { get; set; }
        public string id_Categoria { get; set; }
        public string CodigoPostal_Usuario { get; set; }
        public string telefono_Anuncion { get; set; }
        public string id_Departemento { get; set; }
        public string id_Distrito { get; set; }
        public string titulo_anuncio { get; set; }
        public string descripcion_anuncio { get; set; }
        public string nombre_anuncio { get; set; }
        public string edad_anuncio { get; set; }
        public string audio_anuncio { get; set; }
        public string contactoWhatsapp { get; set; }
        public string estado { get; set; }
        public string portada { get; set; }
        public string tipo_Anuncio { get; set; }
        public string latitud_anuncio { get; set; }
        public string longitud_anuncio { get; set; }
    }

    public class Tarifa_E
    {

        public string id_tarifaAnuncio { get; set; }
        public int id_Anuncio { get; set; }
        public string descripcion_tarifa { get; set; }
        public string precio_tarifa { get; set; }
        public string estado { get; set; }
 

    }

    public class Horario_E
    {
        public string id_HorarioAnuncio { get; set; }
        public int id_Anuncio { get; set; }
        public string descripcion { get; set; }
        public string horaInicial { get; set; }
        public string horaFinal { get; set; }
        public string estado { get; set; }
    }

    public class Multimedias_E
    {
        public string id_GaleriaAnuncio { get; set; }
        public int id_Anuncio { get; set; }
        public string nombre_GaleriaAnuncio { get; set; }
        public string tipoArchivo_GaleriaAnuncio { get; set; }
        public string url_GaleriaAnuncio { get; set; }
        public string estado { get; set; }
    }
    
    public class Apariencia_E
    {
        public string id_CaracteristicaAnuncio { get; set; }
        public int id_Anuncio { get; set; }
        public string id_Nacionalidad { get; set; }
        public string id_Piel { get; set; }
        public string id_Cabello { get; set; }
        public string id_Estatura { get; set; }
        public string id_Cuerpo { get; set; }
        public string id_Pechos { get; set; }
        public string id_Pubis { get; set; }
        public string atencion_Mujer { get; set; }
        public string atencion_Parejas { get; set; }
        public string atencion_Discapacitados { get; set; }
        public string atencion_Hombres { get; set; }
        public string medioPago_Efectivo { get; set; }
        public string medioPago_Tarjeta { get; set; }
        public string otro_Servicio { get; set; }
        public string otro_ServicioEspecial { get; set; }
        public string otro_Lugar { get; set; }
        public string estado { get; set; }
    }

    public class Servicios_E
    {
        public string id_AnuncioServicio { get; set; }
        public int id_Anuncio { get; set; }
        public string idGrupoServicio { get; set; }
        public string id_servicio { get; set; }
        public string otro_AnuncioServicio { get; set; }
        public string estado { get; set; }
    }

    public class Lugar_E
    {
        public string id_AnuncioLugar { get; set; }
        public int id_Anuncio { get; set; }
        public string id_lugar { get; set; }
        public string otro_AnuncioLugar { get; set; }
        public string estado { get; set; }
    }

    public class Publicacion_List
    {
        public List<Publicacion_E> list_anuncio { get; set; }
        public List<Tarifa_E> list_tarifa { get; set; }
        public List<Horario_E> list_horario { get; set; }
        public List<Multimedias_E> list_multimedia { get; set; }

        public List<Apariencia_E> list_apariencia { get; set; }
        public List<Servicios_E> list_servicios { get; set; }
        public List<Lugar_E> list_lugar { get; set; }
    }



}
