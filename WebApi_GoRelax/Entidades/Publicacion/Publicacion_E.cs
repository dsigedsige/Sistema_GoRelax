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
        public string estado { get; set; }
    }



}
