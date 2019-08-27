// !-- Cookie plugin
class CookieAviso {
  constructor(){
    this.body = `
    <div id="cookie">
      <div class="container">
        <p class="aviso"></p>
        <p><button class="fireCookie" onClick="cookieAviso.send()">Ok</button></p>
      </div>
    </div>
    `
    this.content = '';
  }

  createCookie = function(name, value, min){
    if (min) {
      var date = new Date();
      date.setTime(date.getTime()+(min*60*1000));
      var expires = "; expires="+date.toGMTString();
    } else {
      var expires = "";
    }
    document.cookie = name+"="+value+expires+"; path=/";
  }

  generate = function(){
    const currentLocation = jQuery('html').attr('lang');
    let msg = '';

    if ( document.cookie.includes('granted=1') ){
      console.warn('Você está utilizando cookies.')
      return
    }

    // !-- Específico para um site com multi línguas
    if ( currentLocation === 'pt-br' ){
      msg = `A Medilab usa cookies próprios e de terceiros para melhorar o funcionamento do site, personalizar sua experiência de navegação, analisá-la para fins estatísticos e mostrar publicidade, incluindo anúncios com base em seus interesses com base em um perfil desenvolvido em relação à sua navegação.`
      this.content = msg;
    } else {
      msg = `Medilab utiliza cookies propias y de terceros para mejorar el funcionamiento técnico de la web, personalizar tu experiencia de navegación, analizarla con fines estadístico, así como para mostrarte publicidad, incluidos anuncios basados en tus intereses a partir de un perfil elaborado con respecto a tu navegación.`
      this.content = msg;
    }

    jQuery('body').append(this.body);
    jQuery('#cookie').find('.aviso').append(msg)
  }

  send = function(){
    this.createCookie('granted', '1', 10080)
    jQuery('#cookie').remove()
  }
}