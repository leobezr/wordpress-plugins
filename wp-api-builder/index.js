// **
// * WP - Buscar posts por API
// * Versão: 1.0.0
// * 
// * 
// * Como usar:

!function(){
  $(document).ready(() => {
    blogAPI = new BlogApiBuilder({
      target: '#blog_find',
      count: 6,
      excerpt: 120,
      slick: true,
    })
  })
}

// *
// **

// **
// *
// @option target: tipo STRING => id, classe ou atributo do elemento isolador
// @option count: tipo INT => quantos posts irá chamar, 1 a 10. Default = 10
// @option excerpt: tipo INT => Quantos espaços vai aceitar. Default = 80
// @option slick: tipo Boolean => rodar em carrosel ou não.
// *
// * Voce precisa usar o elemento padrão do wordpress bloco de texto, ele vai procurar por ".wpb_text_column"
// * Essa função não é ativada por shortcode mas ela vai procurar pelo shortcode dentro do isolador
// *
// @shortcode: <span id="blog_find" style="opacity: 0 !important;">[find_blog_post_form="http://medilab.net.br"]</span>
// * Troca somente a url do blog em WORDPRESS
// *
// **

class BlogApiBuilder {
    constructor(dat){
      this.all = dat;
      this.dat = dat.target;
      if ( !this.dat.length ) return
  
      this.element = $(this.dat);
      this.count = dat.count !== undefined ? dat.count : 10;
      this.maxExcerpt = dat.excerpt !== undefined ? dat.excerpt : 80;
  
      // **
      // * Slick Carrousel
      this.slick = dat.slick === true ? dat.slick : false;
  
      // **
      // * Filtrar link do shortcode
      this.link = this.doFilter(this.element.text());
  
      // **
      // * Handle API
      this.fetch = this.doAPI(this.link);
    }
  
    doFilter = function(arg){
      let temp = arg.slice(arg.indexOf('=')+2);
      temp = temp.slice(0, -2);
      return temp;
    }
  
    obliterate = function(){
      let $parent, $target, cont;
  
      $parent = 'wpb_text_column';
      $target = this.element;
  
      while( !$target.hasClass($parent) ){
        $target = $target.parent();
      }
  
      cont = '<div class="lds-dual-ring"></div>';
      $target.addClass('reciever')
      .html(cont);
    }
  
    doAPI = function(link){
      this.obliterate()
  
      let _link = link + '/wp-json/wp/v2/posts?_embed';
      $.get(_link)
      .then(response => {
        this.fetched(response)
        return response
      })
    }
  
    doSlick = function(){
  
      $('.reciever.articles').slick({
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 3,
        dots: true,
        autoplay: true,
        autoplaySpeed: 3500,
        infinite: true,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: '40px',
              slidesToShow: 1
            }
          },
          {
            breakpoint: 480,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: '20px',
              slidesToShow: 1
            }
          }
        ],
      })
    }
  
    fetched = function(resp){
      let array, myBuilder, postBody;
  
      array = resp;
      array = array.slice(0, this.count);
  
      array.map((item, i) => {
        myBuilder = {}
        myBuilder.id = item.id;
        myBuilder.title = item.title.rendered;
        myBuilder.page = item.link;
        myBuilder.excerpt = item.excerpt.rendered;
        myBuilder.excerpt = myBuilder.excerpt.slice(0, this.maxExcerpt) + '...</p>';
        myBuilder.img = item._embedded['wp:featuredmedia'][0].source_url
  
        postBody = `
        <div class="post_wrap">
        <div class="post-header">
        <a href="${myBuilder.page}" target="_blank" rel="nofollow">
          <figure>
            <img src="${myBuilder.img}" alt="${myBuilder.title}">
          </figure>
        </a>
        </div>
        <div class="post-title">
          <h3><a href="${myBuilder.page} target="_blank" rel="nofollow">${myBuilder.title}<a/></h3>
        </div>
        <div class="post-body">${myBuilder.excerpt}</div>
          <div class="post-footer">
            <a href="${myBuilder.page}" class="btn-blog" target="_blank" rel="noreferrer nofollow">Continuar lendo</a>
          </div>
        </div>
        `
  
        if ( !$('.wpb_text_column.reciever').hasClass('articles') ){
          $('.wpb_text_column.reciever')
          .addClass('articles')
          .html(postBody)
        } else {
          $('.wpb_text_column.reciever')
          .append(postBody)
        }
      })
  
      if ( !!this.slick ){
        this.doSlick()
      }
    }
  }
  