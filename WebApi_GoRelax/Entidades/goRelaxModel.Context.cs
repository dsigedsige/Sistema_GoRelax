﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class GoRelaxEntities : DbContext
    {
        public GoRelaxEntities()
            : base("name=GoRelaxEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<tbl_Anuncio> tbl_Anuncio { get; set; }
        public virtual DbSet<tbl_Anuncio_Caracteristicas> tbl_Anuncio_Caracteristicas { get; set; }
        public virtual DbSet<tbl_Anuncio_Galeria> tbl_Anuncio_Galeria { get; set; }
        public virtual DbSet<tbl_Anuncio_Horarios> tbl_Anuncio_Horarios { get; set; }
        public virtual DbSet<tbl_Anuncio_Lugar> tbl_Anuncio_Lugar { get; set; }
        public virtual DbSet<tbl_Anuncio_Servicio> tbl_Anuncio_Servicio { get; set; }
        public virtual DbSet<tbl_Anuncio_Tarifa> tbl_Anuncio_Tarifa { get; set; }
        public virtual DbSet<tbl_Caracteristicas> tbl_Caracteristicas { get; set; }
        public virtual DbSet<tbl_Categoria> tbl_Categoria { get; set; }
        public virtual DbSet<tbl_CodigoVerificacion> tbl_CodigoVerificacion { get; set; }
        public virtual DbSet<tbl_Departamentos> tbl_Departamentos { get; set; }
        public virtual DbSet<tbl_Distritos> tbl_Distritos { get; set; }
        public virtual DbSet<tbl_Grupo_Detalle> tbl_Grupo_Detalle { get; set; }
        public virtual DbSet<tbl_Grupos> tbl_Grupos { get; set; }
        public virtual DbSet<tbl_Lugares> tbl_Lugares { get; set; }
        public virtual DbSet<tbl_Mensajes_Anuncio> tbl_Mensajes_Anuncio { get; set; }
        public virtual DbSet<tbl_Nacionalidad> tbl_Nacionalidad { get; set; }
        public virtual DbSet<tbl_Oferta_Anuncio> tbl_Oferta_Anuncio { get; set; }
        public virtual DbSet<tbl_Provincia> tbl_Provincia { get; set; }
        public virtual DbSet<tbl_Servicios> tbl_Servicios { get; set; }
        public virtual DbSet<tbl_Tipo_Anuncio> tbl_Tipo_Anuncio { get; set; }
        public virtual DbSet<tbl_Usuarios> tbl_Usuarios { get; set; }
        public virtual DbSet<back_modelo> back_modelo { get; set; }
        public virtual DbSet<tbl_Caracteristicas_Model> tbl_Caracteristicas_Model { get; set; }
    }
}
