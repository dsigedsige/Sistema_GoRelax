//------------------------------------------------------------------------------
// <auto-generated>
//     Este código se generó a partir de una plantilla.
//
//     Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//     Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Entidades
{
    using System;
    using System.Collections.Generic;
    
    public partial class tbl_Anuncio_Horarios
    {
        public int id_HorarioAnuncio { get; set; }
        public Nullable<int> id_Anuncio { get; set; }
        public string descripcion { get; set; }
        public string horaInicial { get; set; }
        public string horaFinal { get; set; }
        public Nullable<int> estado { get; set; }
        public Nullable<int> usuario_creacion { get; set; }
        public Nullable<System.DateTime> fecha_creacion { get; set; }
    
        public virtual tbl_Anuncio tbl_Anuncio { get; set; }
    }
}