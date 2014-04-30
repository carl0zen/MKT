<link rel="stylesheet" href="https://sites.accenture.com/publishing/Mexico/MKTDev/assets/css/main.css">
<link rel="stylesheet" href="https://sites.accenture.com/publishing/Mexico/MKTDev/assets/css/app.css">


<link href="https://sites.accenture.com/publishing/Mexico/MKTDev/assets/css/bootstrap.css" rel="stylesheet">
<link href="https://sites.accenture.com/publishing/Mexico/MKTDev/assets/css/LF_Main.css" rel="stylesheet">


<!--[if IE]>
 	<link href="/stylesheets/ie.css" media="screen, projection" rel="stylesheet" type="text/css" />
<![endif]-->


  <!--[if lt IE 7]>
  <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
  <![endif]-->
<div id="LF-Wrapper">
  <!--EMPIEZA HEADER-->
    <div class="LF-Head">
      <div class="header">
        <div class="container">
          <div class="col-xs-3 nav-brand">
            <div class="logo"><a href="../"><img src="https://sites.accenture.com/publishing/Mexico/MKTDev/assets/img/logo.png"></a></div>
            <h1>M&eacute;xico</h1>
          </div>
          <div class="col-xs-9">
            <div class="navbar" role="navigation">
              <ul class="nav navbar-nav">
                <li><a href="#bio"><span class="glyphicon svmico-lf"></span>Luiz Ferezin</a></li>
                <li><a href="#miopinion"><span class="glyphicon svmico-op"></span>Mi opini&oacute;n</a></li>
                <li><a href="#accentureennumeros"><span class="glyphicon svmico-st"></span>Accenture en n&uacute;meros</a></li>
                <li><a href="#miexperiencia"><span class="glyphicon svmico-ex"></span>Mi experiencia</a></li>
                <li><a href="#contacto"><span class="glyphicon svmico-co"></span>Contacto</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="TopTitle">
      <div class="container">
        The Leadership Corner
      </div>
    </div>
  <!--TERMINA HEADER-->

  <script type="text/template" id="aboutLFTemplate">
    <h1>{{=header}}</h1>
    <h4>{{=subheader}}</h4>
    <div class="quote">{{=quote}}</div>
    <div>{{=content}}</div>
  </script>

  <!--EMPIEZA BIO-->
   <div class="container LF-Bio" id="bio">
      <div class="fl col-xs-4">
        <div class="Pic"></div>
      </div>
      <div class="fl col-xs-8">
        <div id="aboutLF"></div>
      </div>
      <div class="clear"></div>
   </div>


  <script type="text/template" id="opinionSlideTemplate">
    <div class = 'item' >          
      <div class = 'text'>  
        <div class="col-xs-4 Heading">
          <h3>{{=title}}</h3>
          <span class="date"> {{=date}} | <a href="#">{{=author}}</a></span>   
        </div>
        <div class="col-xs-8">
          {{=content}}
          {{if(linkUrl){ }}
          <a type="button" target="_blank" href="{{=linkUrl}}" class="btn btn-outlined pull-right">Conoce m&aacute;s</a>
          {{ } }} 
        </div>  
      </div>
    </div>
  </script>


  <!--EMPIEZA MI OPINION-->
  <div class="LF-Opinion" id="miopinion">
    <div class="container">
      <h2>Mi Opini&oacute;n</h2>
      <div class="sliderContainer">
        <div class="iosSlider">
          <div class="slider"></div>

          <div class = 'prevButton'></div>
          <div class = 'nextButton'></div>
        
        </div>
        <div class = 'slideSelectors'>
          <div class = 'item selected'></div>
          <div class = 'item'></div>
        </div>
      </div>
    </div>
  </div>
  <!--TERMINA MI OPINION-->

  <script type="text/template" id="numbersTemplate">
    <div class="col-xs-4">
      <div class="grafico">
        {{if(type === 'number'){ }}
        <div class="stnmb">
          <span class="glyphicon svmico-up"></span>
          <span class="numb">{{=value}}</span>
          <span class="mm">MM</span>
        </div>
        {{ }else{ }}
          <span class="chart" data-percent="{{=value}}">
            <span class="percent" ></span>
          </span>
        {{ } }}
        <h4>{{=title}}</h4>
        <div class="extract">{{=extract}}</div>
      </div>
    </div>
  </script>

  <!--EMPIEZA ACCENTURE EN NÃƒÅ¡MEROS-->
    <div class="LF-Statics" id="accentureennumeros">
      <div class="container">
        <h2>Accenture en n&uacute;meros</h3>
        <h3>M&eacute;xico debe invertir y explotar tecnologías digitales de manera inteligente para elevar  la productividad y el bienestar social</h4>

        <div class="graphs"></div>
      </div>
    </div>
  <!--TERMINA ACCENTURE EN NÃƒÅ¡MEROS-->
  
    <script id="timelineIssueTemplate" type="text/template">
    <div class="event">
      <div class="date">
        <span class="month">{{=month}}</span>
        <span class="year">{{=year}}</span>
      </div>
      <div class="extract">
        <p>{{=extract}}</p>
      </div>
    </div>
  </script>
  <!--EMPIEZA EXPERIENCIA-->
    <div class="LF-Exp" id="miexperiencia">
      <div class="container">
        <h2>Mi experiencia</h2>
        <h3>Conoce los retos que he tenido durante mi vida que me han llevado a dirigir a Accenture.</h3>
 
        <div id="timeline">

            <ul id="dates">
              <li><a href="#1980">1980-1990</a></li>
              <li><a href="#1990">1990-2000</a></li>
              <li><a href="#2000">2000-2010</a></li>
              <li><a href="#2010">2010-2014</a></li>
            </ul>
            <ul id="issues">
              <li id="1980"></li>
              <li id="1990"></li>
              <li id="2000"></li>
              <li id="2010"></li>
            </ul>
            <a href="#" id="next">+</a>
            <a href="#" id="prev">-</a>
        </div>
        <div class="tline"></div>
      </div>
    </div>
  <!--TERMINA EXPERIENCIA-->

  <!--EMPIEZA CONTACTO-->
  <div class="LF-Cont" id="contacto">
    <div class="container ">
      <h2>Quiero saber de ti</h2>
      <div class="col-xs-5">
        <div class="form-html">            
          <label>Escribeme un mensaje</label>
          <div class="form-group">
              <div class="form-group">
                  <input type="text" class="form-control" placeholder="Nombre" id="Nombre">
              </div>
              <div class="form-group">
                  <textarea  class="form-control" rows="3" name="Mensaje" id="Mensaje" placeholder="Mensaje"></textarea>
              </div>
              <div class="form-group">
                <button id="send" type="submit" class="btn btn-outlined">Enviar</button>
              </div>
          </div>
        </div>
      </div>
      <div class="col-xs-7">
        <div class="quote">
          <p id="footerquote"></p>
        </div>
        <a href="../" class="readmore">Conoce m&aacute;s sobre Accenture M&eacute;xico <span class="glyphicon glyphicon-circle-arrow-right"></span></a>
      </div>
    </div>
  </div>




<!-- jQuery -->
<script   src="../assets/js/vendor/json2.js"></script>
<script   src="../assets/js/vendor/jquery2.js"></script>
<script   src="../assets/js/vendor/underscore.js"></script>
<script   src="../assets/js/vendor/backbone.js"></script>
<script   src="../assets/js/vendor/backbone.sharepoint.soap.js"></script>
<script   src="../assets/js/vendor/backbone.filtered.collection.js"></script>
<script   src="../assets/js/vendor/backbone.sorting.js"></script>
<script   src="../assets/js/vendor/backbone.viewOptions.js"></script>
<script   src="../assets/js/vendor/cycle.js"></script>
<script   src="../assets/js/vendor/moment.js"></script>
<script   src="../assets/js/_config.js"></script>



<script src="../assets/js/vendor/bootstrap.min.js"></script>
<script src="../assets/js/vendor/jquery.iosslider.js"></script>
<script src="../assets/js/vendor/excanvas.compiled.js"></script>
<script src="../assets/js/vendor/jquery.easypiechart.js"></script>
<script src="../assets/js/vendor/jquery.timelinr-0.9.54.js"></script>
<script  src="../assets/js/luisferezin.js"></script>