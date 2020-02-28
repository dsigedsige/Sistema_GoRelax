import { Component, OnInit , HostListener} from '@angular/core';
import { AnunciosService } from '../../services/anuncios/anuncios.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-anuncios',
  templateUrl: './anuncios.component.html',
  styleUrls: ['./anuncios.component.css']
})
export class AnunciosComponent implements OnInit {

  imagenes:any[] = [];
  mensajes:any[] = [];
  ofertas:any[] = [];

    
  anunciosTop:any[] = [];
  anunciosPremium:any[] = [];
  anunciosVip:any[] = [];
  anunciosSolicitadas:any[] = [];
  anunciosGratuitas:any[] = [];


  /// infinite scroll
  productos:any=[];

  private finishPage = 3;
  private actualPage: number;
   

  private actualPageP: number;
  private actualPageV  : number;
  private actualPageS  : number;
  private actualPageG  : number;

  private finishPageP = 1;
  private finishPageV = 1;
  private finishPageS = 1;
  private finishPageG = 1;

 
  constructor(private anunciosService:AnunciosService, private spinner: NgxSpinnerService) {

    this.actualPage = 1;
    this.actualPageP = 1;
    this.actualPageV = 1;
    this.actualPageS = 1;
    this.actualPageG = 1;
 
    // 1- Top
    // 2- Premium
    // 3- Vip
    // 4- Solicitadas
    // 5- Gratis

  this.getAnunciosTop();

  this.getAnuncioPremium();

  this.getAnuncioVip();

  this.getAnuncioSolicitadas();

  this.getAnuncioGratuitas();
 
     this.mensajes.push({
      url_img:'https://secureservercdn.net/198.71.233.197/7vr.231.myftpupload.com/wp-content/uploads/2017/06/Janet-Valencia-lima-vedettes-47.jpg',
      desc:'Soy una chica muy pervertida, con ganas de portarme mal, quien se prende? LLamame o escribeme al whatsapps',
      url_page : "/anuncios"
     },
     {
      url_img:'data:image/jpeg;base64,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',
      desc:'linda kinesiologa debutante, recien llegada, dispuesta a complacerte y entregarse al sexo.',
      url_page : "/anuncios"
     })


     this.ofertas.push({
      url_img:'https://cdn.photokinesiologas.com/pkpe/2019/10/01/10/26/21/epk7k/foto/book/13.jpg',
      desc:'Soy una chica muy pervertida, con ganas de portarme mal, quien se prende? LLamame o escribeme al whatsapps',
      url_page : "/anuncios"
     },
     {
      url_img:'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhUSEhIVFRUXFRUXFRYVFRcVFRcXFRUWFxUVFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQGi0fHSAtLS0tLS0tLS0tKy0tLS0tLS0tLS0tLS0tLS0tKy0tLS0tLS0tLS0rLTctLSstLTctLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAEAAECAwUGBwj/xABEEAABAwEFBQYDAwkHBQEAAAABAAIRAwQFEiExBkFRYZETInGBobHB0fAyQmIUIzNScoKS4fEHFlNzorLCNDVDY4Qk/8QAGQEAAwEBAQAAAAAAAAAAAAAAAAECBAMF/8QAIxEBAQACAgICAwADAAAAAAAAAAECEQMhMUEEEiIyURMUYf/aAAwDAQACEQMRAD8A8cSBSCQQaWJRcU6YhAIKisrwqKqA6LZS3MpnvFS2nt7KjhhXPUSn3oLQhVVFeFXVCDVtARFow4dyGFOVdaKENmUAO1m9X0nyqqdUAKsvJOQQQirSzyVNUHep0WvOhKsNlfPe45ycx4ykYWm6CDwzXVWLbN7GhuE+i511kcBJHz6KvsZ0TGnaUtujObSrn7cj9X0XCEFuoUHOlG6NR3P99m8PRP8A3xYdy4NJGy+ruztZTKx7+vhlVsNXOJI2NGCsCgFYEGcJ0mpIBJJJIC4hMAnUZzQE8Ki4KZKiUBFD1UUhaqAlRUxqjrouw1WkjcntN3PpjE4QglQTVGpwiKdGRKRs7Ockq9UnJPVMGAqiEwiGK2i3OIPgFHCSiLE0YpImN2XxQNNBrcDMUEHdiyEaeeqEpNfVdPmSchHNXW0Oe8NaZBOWY8hyR1qshoUO8M3xOkgRI6pWqxxYtseJDW6DLxULOVUTJlXNZoU0tBtAOaQQZAmDv8CsmrSg8VvWUFzYmCOnXog7VNN4qBu/Np05tKD0ykl6jYListek2qwCHCYjQ7weYKhV2Ro8B0RpO3mCS9FqbIU+XRcrtHdbaLoHFGhtiBWqtWINJqRCcJigGSSToC1Q3q1QSBBJJIJg6FqopDVUg3tlL0bSMO0KN2lvdlUBrFylEq9hTJeFrWV4bRc52g+oCywFOtU0YdAZI57gkcVUqBdLjqd2gA5lVOpOecLBPEjTyVrC6q4U26HU8V3V0XKGNAiFx5eWYNPFw3Nyli2ZrOzg+Rz6I9+z1XIFuY0OhGS9Eu6yQFrMpZLL/tZVq/1sI8osOzzi8Y2kCdTB8o1JU9uLKcQIbADQOYz3/XBesMotaCYz4rmtprlD6b8Opz9D8/QLpjz3faLwTXTxsBGWIGcPHSdFG0WctkR9k+2qnZNfb5LZvbDcdXTZsVPLSDmRrMjX6+aHvBpIxeEjef5/zR9nyJzgQHT45A8+KBqPBDmnUHKOIyOfhPUIh1G5NoalmYaYzaTI89VoDbd/Arl6xn1lDlNGnZN22O8HosO+bzNocDCyFayRmEtiYnq0i05pJVahJzSQKluTKSYpg0JJ4SQFwUYUwqi5IHMJi5LEmIlMEx6pqK8MVFVAKiFeGkRIRdw2bGVqbRCm1rQ2J3wgmKasIR9UnIKVd0o67ru7UtAmSPoz9aJW6VjN3Uaez3ZUXYqsk7wBv5ldnZdpbMYH2fH5rjz2dCcNWo106DC4E82vUG3lTqfpKbST9+lDH+JpHuv8is2fFM+2zHk/xzT1y7a7HiWkGeBlatOlOi8Tui830agAqS2YBzGXNu5eu3fbMTARwB9Fmz45hdNGOf3mxlSkhrRSynkUz71a12F2uR6z8ikL7s7wQHtkfiCn677V9tPItorNhrWgfWa5+gcwV1207muq1y0yO6CuTdTz6R5yFv4b+LDz/ttuWp4NEGBIZGvNse4WL2sOB5AnnOqOe8tAbucBrpvj1Cynu3Hw9QQurhUa40I3z6KLrO7UNMHkmcd3P6+C9C2OoU6lmbiAkOIz5FNNed9g79U9FOF60+6KEEwF5ztDTa2qQ0ZJWHjdsjepKI1UggqnCYhSlMUwZJShJAWhUxmr1SUgWSdigFYxMHKFqopyFqJBZY7S5h7phPVqk5kyqKaslMI1Ny7jZCi4OJY1pjuguJAyEZAZlcQ7jy/kvRNjqstGYnIujcSBK4c9swafiyXNbfOzNSocXc8GtMeMLHtFxvpFrnnutyBawAtB3nc7U6leq2NsjMJ7ZQaAZAjgc/RZcObKRrz4ca8d2hu4U6dOtSfjaThJ3l0TJacxof5rZuLb40aeCrZySGxLXYeAzDlbd91tr2zGwHsKTyW8HvGscWg71qf2hWJhZZ+43vV2Nc6O8GukRK7XPHLKY5duP+LLHG5Y3TMtt8V7SO0pWWo1pESXsaCJ/ERIz9Vl1bA+C6qy0tETLWsqNH8J0XbW2y2plMsY8EA904QH6ZTkZELjr3s9qhrwamQOMiqSDwy+7vyS47PXSuSXX9ZtiY1zagDyZdvEEZGJB8EHaKDsIy4ieJzcCr7oc52IO3YfifrxRrLGRDXZjvEE8JIjykBaJ1Wa3cAXkwdk1w3OHHR7cQPo5Y1TPNdPeFAdgWtMwIkfgP8AXquWdoukcqi5HWa86lJuFjoBJPmgFZW0nn7j+iEtNm0VfTEgrTXLzidqhWq1ymqkQapBRYpNTStKZOUyYSSTpJBYFQQiIVBQEQpsUFZTCYO9CP1RVRCHVIEArmifrw+arCIs408+kZ+iZzya0sjLw89/x9F1VzFjC0PDpgFuCcY/ZLcx7LmKjZLBzj+q7u47OGEOGsCSdfrks/PlrFr+Nju10FhvGq0dw1T/AJtmL/8AUxzT1lCbR2uvVZhqPNNhDsWGmaReAM2jE9zo6a+S6CxWqRl1WFtjclSvFSk84mtIwcRM907isWOfevDbljHSbIWej2TACAA0RwyGiy9vaM2d+DM0yyqP3KjT7SsPZ2tbGs7IUHYwPvSweJMLbuq2urB9nrMLargWxq0gg94HgOaXcuxqWadFYC2rTbUbBDmhwPIiQszaO7G9lUc0Q7CdMtVG561SzjscIMTNJzgxwO91Bzu69pP3SWxJz3LRvK9rOaLxUmkSCMNdjqR6uhp8QSukx9xz3rqvM7Rd3ZFjgD3mZ5clmXnaWOwtZk4Riy+84+oj3XSXveNNzabWua4jDOAh0fbBmNNQuUveg1jGkfbLjiPHhluyAWnjy8bcOXHzpC7bRia5pjV3ljafRYFQZxzR9iqBrzO8j45oa8mYajhzPutEY6GHxC0rDdVSswln1uQEBdjsNbqdNjsZGc/D5Jpc+7Z+s3Mt0QFVsZFepW29qJpuAInyXmVtdL3HmUqePgOxTYM1FgU6ZgoJJwSCd9QJB4TBJJdoEkguCociQEOdUBBW0woSp0tUwVXVBnVGVdUIdUgcI2wNBcwHQk+qCRlhMOafD3zRfB4zs73HG3r0Xf3U6WiN4XA2zKP2SB0aR7rqdlrdiaOX0Vm58d47bPjZaysbVe8K9BgLKfaNnPDJcPIahFUNo6rSO1pYWkAgua4NP4cRGqtbRL2kDyUrHeb7P3a7C6n+sBOXBwHusn43qxujoLBe9KoQ6YMRBGk8/JajCJmB4rmuxu+sMVMhhP8AhnBrxaPkoUqlooHDTBtFPdmBUb1yISsnoWOltDWPGGo0OG6d3gdyxL5s9RlJ/ZV3YQ09yp3xEfddqEXRtReAYLTvadQg79qHsan7JUfawSOMp0SaYJzLmkAfqjtB6rnb8fJAGhz8F01UFtnaTuAPrK5+20mvr02uOEHKeeYHWG/xLXw3cZ+ea8e3Ptd8PipW8y4HiBPjv9UqzIc8cHexKatGEcltjz7NKYgTzI9B80sRjhr7qZ+z+9PpmoOGnmhJU6h4nqnqKFFSqKfap4MxIhJmiRVIRhIBOnTCKSdOkB4Qr9UU1DEZoCKtphQU6WqAatqhDqjKqD3oBwi7Ke83y/3IRFWV3eH14ovhWPlZeEjD+97Ae0JXTbOyMzq7LpmfZStYlg+uX/FZjtVOtzVVu45bj2S4LaHNB4rrrG2m4Q8A+IC8OuO930jGZHsvQLs2mpuiXQei87k47hluPTwzmeLra9y0QS5jQ3w0VJp4ck1K9GuGTh1VFa3t4hccslyVewgLNv547Cp+yVXa75ptBJcOq5O/NpBUGBgJG9PHG07dJX/awyg1p1OAdAJ9VgXvSNQswCS5jTAyIgAnM6IG+K7nuaCS5xzIG4nQAfFaluBlrWguIbmAGkkABsiQcgRuzW/jw+umLlz+9v8AxhW2jDnDPUASQTEneNVTWbkBP0FoVW4szAJc52Zk5knODy4BZ9d2Q8yfOYXeVlyhN+yR9awoPGnipR8EXTogtz5+kFPZaBUqOZVtazcCnr0YKpxkJpMWkKuVd2vFMcJQSmU5covVcphbiSVadAazUM4IpgQ7kjVq2jqqwraWqAjV1QhGaMqaoVwQRlbROf1wUKbZV3Zxmi30qY+172ywjfr8f+RWc0SfNaLd/h7Zj4oSmwF7QOXoM1Mqsp3Blnp95aYZAVVnoZrQZSnIZlZ+TJt4sdQ1Ks4DJxHgSpuqO3uPVbV3bOVXwTDBxOvRdLd+y9FmbhjPPTos2WcaHnwu2rUBfhOEakzHUrbtN2UrNZnuiXkRiPPcAur2haG0CAI0yC5nap5c1jBoagnwH0EpnbZCsmtuBsTu/Uec3NblPF1RjJ6OKMvwEvBgwd8cSTHiJ9Ah6DCyvyJIPMDX2B8lZa57QkH7IG+DOEDqt++4wSfjVeGN0QCPPSf9RKz6x/l9eaNeSKck5mDMzxKz6pVYuefpbOnkVpUqZc3wPoQPks6Mh4ewldHcFOZmPsj+XsU6JOmTa6RHRZ7wuivijlPj8/iufeM09psVlibArJTlyadBntUcKvcFCEErwpKyEkBqMQrtSu7bsQP8V3QKo7CNn9K7oEG4dW0V2n9w2/4rug+Sc7CtGlV3QfJAcTU1KVksjqrsLRJ1XYP2Ecfs1R5hZN3U+wrPYTJa4tkcQYkSpzy1F8eP2y1Wa+iKczlGqDAxd45DOAty8af5RWLQQGt+08aOdqG/XNBWyyuaQ0DkI0KjHL++XXLD+eFFIxB5H69SrLmsfa2hrW5STzjKVKx2Vz3tYNZIPlqV1OwF2NNsfBns2nOImSASB5FTllqU8cN2NH+7bWnvOJ8MlrXbY6bD3WjxOvVat60YlDXZRJzXn5ZWt81pqWdqJVTKauYxTIVYl/tLsDeLh7rKv6xj82zeZ6n+i3b3c1tSmTpO7M9FmV6BqWoSO6GjI8fLSZ5o72qXrTzmtSxV3Hdp5uOfoT1QFudmfxOLucAwPWei6S8LPFd1MD7xGQ8h8FkW67ntquxiAIAng0j3+K3YZxm5OP8AjOvMw0N8ugE+srPfqjLzkmeJJ8zqgpzlacPDHyfsLYMh0K27ird1vgR/CcvdYtmMgjfIK0LlOZGmfQHVKqngXedXu+fusSQtK3gyR4+n9FkkJpqZpqtzYTgpF6EIJYU6dUSEJJ0kB712PJP2XJFBqfAggfYJ+xRgalhCAD7GF41fNQtq1QPtGq8D+I5r2q112U2Oe9waxoJcTuAXit4h1SvUe5pYS8uwO1bizAPPNTlF4b9NC5rfSp0uzqDnI1lC1bwL3/m2kk5Nni7IQOKtu+4zU7zjktu7bA2kZYIcASDqZ0Ge7M+iz5ZYzttxxys16Ns7c5biZrVcM/wtmSfGZ6Lsdkbk/NVKjSWONUljh+ABuY3gkExockPY7N2VGG/pXwGnfiOU+q2b0tLrLQbRp4ScIaCJxzvJGnms/wB99uv11qRmWy8X1TgdQfkYcaYxt15wdDz0PJa1htNENGbmxH2mPBzjcR+IKViu9hpNBk6E5670ZVtOcDM+g8VGp5Hfg1O00jIDpLYmATEiRopG0j7oH7xj01VIpTrnx5+KLpWRvBEm/AvTn7zrtFSm93GYMGDpkqLttjXVKjyePSd62L+srA2SBx9Vl2Km1zXkwGkRwGeZ90rNLxs104WpWc+tUrgH7U5SYgmJ6Lar31ZizFWA0yxCZMZhvFCVrS+zduaXZuYXF5eQXASJgGQNZEc1RspdT7Y82m0DE0HC2QBiIOeQEYRpzK7fSWfa+EXPX4+3OWqoys5xpUw1uIloIBdBEECMoymN3FZlosBGrXNO/EDHkQvdrLdTGiA0Acgp1bra7cqnPZ4jnlw45ea+fKFQtcCf6rTsr4qcj8MwvUb42NoVQcTIP6wyd1Gq8/vvZyvZTiIx0wZDwNBweN3jou2PLjl/yuV4bhP6GthhwPCOmnssqoIJHDLpktC0uQFY5rtGeq0xSKcBNJk6UJyEyQSTpID6IDUyqqVAMyYXN3ztU1hhmZTEm3VGFHENF5ra9rKztDHggKu0toGQecR05c/JLZ6d9aG/lVbs/wDwUXA1OFSqM20+YaCHHnA3FcVeN2OqW+uTOHtJPPutWhcF81uzFKk2APvnPM5ucf1nEknPeVtWWyYWkmSTmSdSTqSVn5uWTqNXBw290C2hhEBV2Ks0VXB2mWcd0ETIJ3atK0BTMEwTyjy94zVrKDcctYAcg4j7xAiSd6xb/rYKslZuIOxNMaZjqrXvDzObzx3eGLRSoWcDOB0CIDFI2LsrDhhxy4D4nf6IltLlkq6RRTHK5EVAUkRTMJm5pw1dJNJoe8bN2jSJgrmXXJ+tMbxMN6Lr9y5bbm+xZaBII7R/dp+JGvgNUXHdEy+scPtHUNptLLDQgNa784RpI1J5NBPmV6TdNibSptpsENaAAFx39n9ymnT7eoDjqZidQ2Znxce90XcU3wnndfjPSMJb+V9r3QFCm8p2iUTZqIUSbXvUVupys63WUOBBAIIgg5jzC6V9EBsrHtY4I5MNDDLbxbay6vyerDf0bpLOUfab5ZdVzldvpl8l6ht/Y8dAuGrCHDw0d6FeY2gz6e3zWvgz+2LLz4fXIOphQKkF2cDpFJMmRkk6SA9K2qv8yabD4lcZUqE5p61aSSd6oc5CtpOfvRtyXW6q7E6QD7cApXTdDqzgT9gf6j8l6HdV2NYBks3Nza6jTw8PvI103aGgAABa35HlojLNQRrbOskxtarlpyrgWuIGhEes+SvoMAy3oq8rPDpQllEuUVUaLBknAUXO3IihCcJbTZkr2hOCAmD10RVrFaFWwqYKqEjXeGgkmABJJ3DivJ6TTe14FxB/J6efLADk3xcfQHgt/wDtOvwtYLJSzfUjGBmcJMBoAzJcREeK39jdn/ySztpkd93eqkfrHdPAAAeXNdZ+M37cbd3Ql1njTRRLVpVKaGLFxsdpVdMoujVQj2qvEQlLo9ba9S0ZRKzbQ5QD0zilnns8cdMa+aGNjmne0jqF47Ws4mNCJHQle1Wtq8ivmlhr1R/7Hnyc4uHuuvxL3Y5fKnUrHq0COagEeCoPpgrcwA0zirH0iFS5APKShKSA1nFGXRYDVfH3Rr8kEGyQBvXd7PWANaMs1x5uT6xo4OP7Xd9Ni67AGgACPguhslmAVNhoQAtWzU1ik22ZZLqNFFiknoU0QW5LvMenG5duVvvJCWSnlKIvky9ZdvvEUmxvOg3rNfLRPAuvaADqpWa0rCsjH1Did0W7ZqMKfZ6FsqkomkFVSYjKTFUTU2IW+LyZZ6L6zzk0dSdAOZKOheY7e3g+12plhoGYdDoORfvnk1sk+B4LvhjuuOeWu0/7P7vfa7U+318w1xwzoX8uTWnqQvVGjJZtzXeyhRZRYO6wAcyd7jzJk+a0gU8st0scdQzwhqjQiXOQldyjKrxilzVS5in2maYulRe1SKwFF5U3OVL3KKqBLXvXlO0w/wD0VOZb1AC9Stb8ivKL2qYq9b/MI6NA+C7fF/eufyf0Z4CeFKFGF6LzSVNagDpkrimQAX5I5JHQkgL7D+kb4r0a6tG+CSSx/K9N/wAbxXU2PRadDVJJcMHTIcxXP0KSS0enC+XHXh+k81yt+f8AUN/Z+SSSye2uNmw6Ba9BJJT7OjaeqKYkkrxRUnLybYP/ALpU/wDq/wB7kklq4/bPyvXGfXRWBJJcXVW5A2hJJRmrEOU4SSU4qReqikklkIz7foV5NX/S1/8AOf8A7inSXb4v7VHyf0DnVLekkvReaYpkkkEdJJJAf//Z',
      desc:'Soy una chica muy pervertida, con ganas de portarme mal, quien se prende? LLamame o escribeme al whatsapps',
      url_page : "/anuncios"
     })

   }

  ngOnInit() {
 
  }

  getAnunciosTop (){
    this.spinner.show();
    this.anunciosService.getObtenerAnuncios('1', -1, 10)
        .subscribe(
          (res:any) => {
            this.spinner.hide();
            if (res.ok==true) { 
                this.anunciosTop=res.data;    
            }else{
              alert(res.data);
            }                                         
          },
          error => {
            this.spinner.hide();
            alert(error)
          },
        )
  }

  getAnuncioPremium(){

    this.spinner.show();
    this.anunciosService.getObtenerAnuncios('2', this.actualPageP, 10)
    .subscribe(
      (res:any) => {
        this.spinner.hide();
        if (res.ok==true) {
         
          for (let obj of res.data ){
            this.anunciosPremium.push(obj);
          }

          let totalPage= (res.totalpage/ 10);
          this.finishPageP =Math.ceil(totalPage) ;
        }else{
          alert(res.data);
        }                                         
      },
      error => {
        this.spinner.hide();
        alert(error)
      },
    )
  }
 
  getAnuncioVip(){
    this.spinner.show();
    this.anunciosService.getObtenerAnuncios('3', this.actualPageV, 10)
    .subscribe(
      (res:any) => {
        this.spinner.hide();
        if (res.ok==true) {

          for (let obj of res.data ){
            this.anunciosVip.push(obj);
          }

          let totalPage= (res.totalpage/ 10);
          this.finishPageV =Math.ceil(totalPage) ;
        }else{
          alert(res.data);
        }                                         
      },
      error => {
        this.spinner.hide();
        alert(error)
      },
    )
  }

  getAnuncioSolicitadas(){
    this.spinner.show();
    this.anunciosService.getObtenerAnuncios('4', this.actualPageS, 10)
    .subscribe(
      (res:any) => {
        this.spinner.hide();
        if (res.ok==true) {

          for (let obj of res.data ){
            this.anunciosSolicitadas.push(obj);
          }


          let totalPage= (res.totalpage/ 10);
          this.finishPageS =Math.ceil(totalPage) ;
        }else{
          alert(res.data);
        }                                         
      },
      error => {
        this.spinner.hide();
        alert(error)
      },
    )
  }
  
  getAnuncioGratuitas(){

    console.log(this.actualPageG + ' : ' +  this.finishPageG )
    this.spinner.show();
    this.anunciosService.getObtenerAnuncios('5', this.actualPageG, 10)
    .subscribe(
      (res:any) => {
        this.spinner.hide();
        if (res.ok==true) {
          
          for (let obj of res.data ){
            this.anunciosGratuitas.push(obj);
          }

          let totalPage= (res.totalpage/ 10);
          this.finishPageG =Math.ceil(totalPage) ;
        }else{
          alert(res.data);
        }                                         
      },
      error => {
        this.spinner.hide();
        alert(error)
      },
    )
  }

  onScroll(tipo:string) {
    switch(tipo) { 
      case 'P': { 
          if (this.actualPageP < this.finishPageP) { 
            this.actualPageP += 1;
            this.getAnuncioPremium();        
          }
         break; 
      } 
      case 'V': { 
        if (this.actualPageV < this.finishPageV) { 
          this.actualPageV += 1;
          this.getAnuncioVip();        
        }
         break; 
      } 
      case 'S': { 
        if (this.actualPageS < this.finishPageS) { 
          this.actualPageS += 1;
          this.getAnuncioSolicitadas();        
        }
        break; 
     } 
     case 'G': { 
      if (this.actualPageG < this.finishPageG) { 
        this.actualPageG += 1;
        this.getAnuncioGratuitas();        
      }
      break; 
   } 
      default: { 
         //statements; 
         break; 
      } 
   } 


  }

  scrollTop() {
    document.body.scrollTop = 0; // Safari
    document.documentElement.scrollTop = 0; // Other
  } 


}
