using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entidades.Publicar
{
    public class Multimedia_E
    {
        public int id_GaleriaAnuncio { get; set; }
        public int id_Anuncio { get; set; }
        public string nombre_GaleriaAnuncio { get; set; }
        public string tipoArchivo_GaleriaAnuncio { get; set; }
        public int estado { get; set; }
        public int usuario_creacion { get; set; }
        public DateTime fecha_creacion { get; set; }

    }
}
