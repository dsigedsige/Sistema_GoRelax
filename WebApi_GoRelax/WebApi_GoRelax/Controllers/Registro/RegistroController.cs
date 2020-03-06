using Entidades;
using Negocio.Registro;
using Negocio.Resultados;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;

namespace WebApi_GoRelax.Controllers.Registro
{
    [EnableCors("*", "*", "*")]
    public class RegistroController : ApiController
    {
        private GoRelaxEntities db = new GoRelaxEntities();


        public object Getregistro(int opcion, string filtro)
        {
            object resul = null;
            try
            {

                if (opcion == 1)
                {
                    string[] parametros = filtro.Split('|');
                    string codVerificacion = parametros[0].ToString();
                    
                    resul = db.tbl_Usuarios.Count(u => u.codigo_verification == codVerificacion && u.estado == 1);       
                }
                else if (opcion == 2)
                {
                    string[] parametros = filtro.Split('|');

                    int idUsuario = Convert.ToInt32(parametros[0].ToString());
                    string nombre = parametros[1].ToString();
                    string contra = parametros[2].ToString();

                    Registro_BL obj_negocio = new Registro_BL();
                    resul = obj_negocio.set_actualizarRegistro(idUsuario, nombre, contra);
                }
                else
                {
                    resul = "Opcion seleccionada invalida";
                }
            }
            catch (Exception ex)
            {
                resul = ex.Message;
            }
            return resul;
        }


        public object PostRegistro(string email)
        {
            Resultado res = new Resultado();
            object resul = null;
            DataTable dt_Verifica = new DataTable(); 
            try
            {
                Registro_BL obj_negocio = new Registro_BL();
                dt_Verifica = obj_negocio.get_verificacionCorreo(email);

                if (Convert.ToInt32(dt_Verifica.Rows[0]["cantidad"].ToString()) == 0)
                {

                    var message = new MailMessage();
                    message.To.Add(new MailAddress(email));
                    message.From = new MailAddress("gorelax.contacto@gmail.com");
                    message.Subject = "GooRelax codigo de Verificación";
                    message.Body = MensajeHtml(dt_Verifica.Rows[0]["dato"].ToString());
                    message.IsBodyHtml = true;
                    message.Priority = MailPriority.Normal;

                    using (var smtp = new SmtpClient())
                    {
                        var credential = new NetworkCredential("gorelax.contacto@gmail.com", "Go,123456");
                        smtp.Credentials = credential;
                        smtp.Host = "smtp.gmail.com";
                        smtp.Port = 587;
                        smtp.EnableSsl = true;
                        smtp.Send(message);

                        res.ok = true;
                        res.data = dt_Verifica;
                        res.totalpage = 0;
                    }
                }
                else {
                    res.ok = true;
                    res.data = dt_Verifica;
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

        public static string MensajeHtml(string code)
        {
            return "<!DOCTYPE html><html><head><title>GooRelax</title> <meta charset='UTF-8'> <meta name='viewport' content='width=device-width, initial-scale=1.0'></head><body><div style='background-color:#ececec'> <table bgcolor='#ececec' align='center' style='width:100%!important;table-layout:fixed'> <tbody> <tr> <td style='padding-bottom:20px'> <table bgcolor='#353e4a' style='max-width:600px;margin:auto;background-color:#353e4a' align='center' border='0' cellpadding='0' cellspacing='0'> <tbody> <tr> <td> <table width='100%' cellspacing='0' cellpadding='0' border='0' align='left' bgcolor='#353e4a' style='background-color:#353e4a;width:100%'> <tbody> <tr> <td align='left' style='padding-top:15px;padding-bottom:15px;text-align:left;background-color:#000000;padding-left:15px'> <a href=''><b><i style='padding-top:0;padding-right:0;padding-bottom:0;padding-left:0'><img src='http://www.dsige.com/webApiDemo/logo.png' alt='logo' width='180' height='45'/></i></b></a> </td><td align='right' style='text-align:right;color:#ffffff;text-decoration:none;font-family:Arial;font-size:14px;padding-top:10px;padding-bottom:8px;background-color:#000000;padding-right:15px;padding-left:15px'> </td></tr></tbody> </table> </td></tr><tr> <td width='100%' height='80' valign='middle' style='border-top:1px solid #d3d3d3;border-right:1px solid #d3d3d3;background-color:#ffffff;border-left:1px solid #d3d3d3;padding-top:10px;padding-bottom:10px;padding-left:10px;padding-right:10px;height:80px'> <a href='#'> <table cellspacing='0' cellpadding='0' border='0' align='left' bgcolor='#ffffff' style='color:#353e4a;font-family:Arial,sans-serif;font-size:15px;margin:auto'> <tbody> <tr> <td style='padding-left:10px;padding-right:10px'> <table width='100%' cellspacing='0' cellpadding='0' border='0' align='center' bgcolor='#ffffff' style='color:#353e4a;font-family:Arial,sans-serif;font-size:15px;margin:auto;table-layout:fixed'> <tbody> <tr> <td style='color:#666666;text-align:center;font-size: 20px'> Codigo de Verificación <strong>" + code +
                   "</strong> </td></tr></tbody> </table> </td></tr></tbody> </table> </a> </td></tr></tbody> </table> </td></tr></tbody> </table></div></body></html>";
        }

    }
}
