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
    
    public partial class tbl_Anuncio_Servicio
    {
        public int id_AnuncioServicio { get; set; }
        public Nullable<int> id_Anuncio { get; set; }
        public Nullable<int> idGrupoServicio { get; set; }
        public Nullable<int> id_servicio { get; set; }
        public string otro_AnuncioServicio { get; set; }
        public Nullable<int> estado { get; set; }
        public Nullable<int> usuario_creacion { get; set; }
        public Nullable<System.DateTime> fecha_creacion { get; set; }
    
        public virtual tbl_Anuncio tbl_Anuncio { get; set; }
        public virtual tbl_Caracteristicas tbl_Caracteristicas { get; set; }
    }
}
