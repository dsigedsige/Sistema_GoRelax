using Entidades;
using Negocio.Resultados;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;

namespace WebApi_GoRelax.Controllers.upload
{

    [EnableCors("*", "*", "*")]
    public class UploadsController : ApiController
    {                     
        private Entidades.GoRelaxEntities db = new Entidades.GoRelaxEntities();


        public object Post_UploadImage()
        {
            Resultado res = new Resultado();
            var nombreFile = "";
            string sPath = "";

            try
            {
                //--- obteniendo los parametros que vienen por el FormData

                var file = HttpContext.Current.Request.Files["file"];
                var objMultimedia = HttpContext.Current.Request.Params["objMultimedia"];
                //--- obteniendo los parametros que vienen por el FormData

                string extension = Path.GetExtension(file.FileName);

                //-----generando clave unica---
                var guid = Guid.NewGuid();
                var guidB = guid.ToString("B");
                nombreFile = Guid.Parse(guidB) + extension;

                //--------
                tbl_Anuncio_Galeria obj_files = JsonConvert.DeserializeObject<tbl_Anuncio_Galeria>(objMultimedia);
                obj_files.nombre_GaleriaAnuncio = nombreFile;

                //-------almacenando la archivo---
                //sPath = System.Web.Hosting.HostingEnvironment.MapPath("~/Multimedia/" + nombreFile);
                sPath = HttpContext.Current.Server.MapPath("~/Multimedia/" + nombreFile);
                file.SaveAs(sPath);

                //-------almacenando la archivo---

                if (File.Exists(sPath))
                {
                    obj_files.fecha_creacion = DateTime.Now;
                    db.tbl_Anuncio_Galeria.Add(obj_files);
                    db.SaveChanges();
                    res.ok = true;
                    res.data = "Archivo guardado correctamente..";
                    res.totalpage = 0;

                }
                else
                {
                    res.ok = false;
                    res.data = "No se pudo guardar en el servidor el archivo";
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


        public void agregarMarcaAgua(string path) {
            try
            {     
                using (Image image = Image.FromFile(path))
                using (Image watermarkImage = Image.FromFile(HttpContext.Current.Server.MapPath("~/Multimedia/watermark.bmp")))

                using (Graphics imageGraphics = Graphics.FromImage(image))

                using (TextureBrush watermarkBrush = new TextureBrush(watermarkImage))
                {
                    int x = (image.Width / 2 - watermarkImage.Width / 2);
                    int y = (image.Height / 2 - watermarkImage.Height / 2);

                    watermarkBrush.TranslateTransform(x, y);
                    imageGraphics.FillRectangle(watermarkBrush, new Rectangle(new Point(x, y), new Size(watermarkImage.Width + 1, watermarkImage.Height)));
                    image.Save(HttpContext.Current.Server.MapPath("~/Multimedia/julio.jpg"));
                }     
            }
            catch (Exception)
            {
                throw;
            }
        }


    }
}
