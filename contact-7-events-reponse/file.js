!function(){
  /**
  -- WordPress Plugin
  */

  function createCookie(name, value, minutes) {
    if (minutes) {
      var date = new Date();
      date.setTime(date.getTime()+(minutes*60*1000));
      var expires = "; expires="+date.toGMTString();
    } else {
      var expires = "";
    }
    document.cookie = name+"="+value+expires+"; path=/";
  }

  // onLoad
  document.addEventListener('load', () => {
    const strictTo = document.querySelector('.conteudo');
    if ( !strictTo ) return

    const $form = strictTo.querySelector('.wpcf7');
    const cookieLifeTime = Math.round(72 * 60); // Value must be in minutes


    let cookie = document.cookie;
    cookie = cookie.slice(cookie.indexOf('newsletter'));
    cookie = cookie.includes('newsletter-status=true') ? true : false;

    if (cookie){
      deliver('https://unitech-rio.com.br/wp-content/uploads/2019/07/ITT_3rd_ESG_The_Role_of_Converged_and_Hyper_Converged_Infrastructure_Brief_BR.pdf');
    } else {
      console.warn('Usuário ainda não preencheu o formulário');
    }

    $form.addEventListener('wpcf7mailsent', e => {
      createCookie( 'newsletter-status', 'true', cookieLifeTime);
      deliver('https://unitech-rio.com.br/wp-content/uploads/2019/07/ITT_3rd_ESG_The_Role_of_Converged_and_Hyper_Converged_Infrastructure_Brief_BR.pdf');
    })

    function deliver(download){
      const p = document.createElement('div');

      let content =   `<p>`;
      content +=      `  <a href="${download}" download>`;
      content +=      '    Faça o download do pdf aqui';
      content +=      '  </a>';
      content +=      '</p>';

      p.className = 'nestedElement';
      p.innerHTML = content;

      jQuery('.conteudo').find('.contato').after(p);
      jQuery('.conteudo').find('.contato').addClass('off');
      console.warn('Deliverd PDF')
    }
  })
}()
