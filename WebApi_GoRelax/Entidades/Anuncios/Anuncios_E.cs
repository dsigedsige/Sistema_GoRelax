using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entidades.Anuncios
{
    public class Anuncios_E
    {
        public int id_Anuncio { get; set; }
        public string idAnuncio_idCategoria { get; set; }
        public string descripcion_departamento { get; set; }
        public string nombre_distrito { get; set; }
        public string telefono_Anuncion { get; set; }
        public string titulo_anuncio { get; set; }
        public string descripcion_anuncio { get; set; }
        public string nombre_anuncio { get; set; }
        public string edad_anuncio { get; set; }
        public string audio_anuncio { get; set; }
        public string contactoWhatsapp { get; set; }
        public string estado { get; set; }
        public string url_fotoPortada { get; set; }

        public string latitud_anuncio { get; set; }
        public string longitud_anuncio { get; set; }
    }

    public class AnunciosFoto_E
    {
        public string url_foto { get; set; }
    }

    public class AnunciosVideo_E
    {
        public string url_video { get; set; }
    }


    public class AnunciosCaracteristica_E
    {
        public int  Grupo { get; set; }
        public string dato1 { get; set; }
        public string dato2 { get; set; }

    }

    public class Anuncios_List
    {
        public List<Anuncios_E> list_anuncios { get; set; }
        public List<AnunciosFoto_E> list_fotos { get; set; }
        public List<AnunciosVideo_E> list_videos { get; set; }
        public List<AnunciosCaracteristica_E> list_caracteristica { get; set; }
    }

}
