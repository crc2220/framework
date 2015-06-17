jQuery(document).ready(function($) {
    
    // don't forget to install/load 
    // history.js
    // greensock max

    var $window = $(window);
    var $winWidth = $(window).width();
    var $winHeight = $(window).height();
    var $document = $(document);
    var $html = $('html');
    var $body = $('body');
    var $content = $('#content');
    var $footer = $('.footer');
    
    // regular page load animation
    

    //determine which links shouldn't be pjaxed
    $('#menu-main-menu li.scroll a').addClass('scroll-link');
    function ie_ver(){  
        var iev=0;
        var ieold = (/MSIE (\d+\.\d+);/.test(navigator.userAgent));
        var trident = !!navigator.userAgent.match(/Trident\/7.0/);
        var rv=navigator.userAgent.indexOf("rv:11.0");

        if (ieold) iev=new Number(RegExp.$1);
        if (navigator.appVersion.indexOf("MSIE 10") != -1) iev=10;
        if (trident&&rv!=-1) iev=11;

        return iev;         
    }

    function msieversion() {    
        var msie = ie_ver();
        if (msie != 0)      
              $('a, hr').addClass('ie');    
        else     
        return false;
    }

    msieversion();

    // css you want to change upon pjax'in
    var state = {
        'home':{
            bgColor: '#fff',
            menuColor: '#004890'
        }
    }
    
    // if History doesn't exist exit?
    if (!History.enabled) {
        return false;
    }
    
    // http://wmidevsite.com/
    var root = History.getRootUrl();

    // custom filter called internal that returns true if link's href hostname == window's hostname
    $.expr.filters.internal = function (elem) {
        return (elem.hostname == window.location.hostname) || false;
    };
    
    // used later in parse_response to elements within the head tag and elements within the body tag
    // filter through dom and return it's dom node object
    function find_all($html, selector) {
        return $html.filter(selector).add($html.find(selector));
    }
    
    // takes a string and creates dom nodes
    function parse_html(html) {
        return $($.parseHTML(html, document, true));
    }
    
    // parsing the ajax response
    function parse_response(html) {
        // the exec() method simply tests for a match in a string and returns the matched text if it finds a match, otherwise it returns null.
        var head = /<head[^>]*>([\s\S]+)<\/head>/.exec(html),
            body = /<body[^>]*>([\s\S]+)<\/body>/.exec(html),
            
            // get the string representation of the dom node then turn it into a dom object otherwise return empty jquery object
            $head = head ? parse_html(head[1]) : $(),
            $body = body ? parse_html(body[1]) : $(),
            
            // get the content you want to load in
            title = $.trim(find_all($head, 'title').last().html()),
            $content = $.trim(find_all($body, '#content').first().html());  
        
        return {
            'title': title,
            '$content': $content
        }
    }

    // content parsing and loading  
    $(window).on('statechange', function () {
        // url  = http://wmidevsite.com/
        // root = http://wmidevsite.com/
        // rel = /axim/fringe

        var url = History.getState().url,
            rel = url.replace(root, '/'),
            getUrl = url.split("#")[0],
            state = History.getState().title || 'home';

        console.log(url);
        console.log(rel);
        console.log(getUrl);
        console.log(state);
            
        // spin up ajax loader animation
        $('.svg-loader').fadeIn();
        // get /axim/fringe
        $.get(url).done(function (data) {
            
            // parse response store it in var response
            var response = parse_response(data);
            // if response's content is empty, exit and stay on page origin
            if (!response.$content.length) {
                document.location.href = url;
                return false;
            }
            // get a reference to where you want to load the data
            var $content = $('#content');

            // update page title if one is found
            if (response.title.length) {
                $('title').last().html(response.title);
            }

            // remove ajax loader animation
            $('.svg-loader').fadeOut();

            if(state == 'home'){
              showHome();  
            }
            if(state == 'global' || state == 'fringe'){
              showGlobal();
            }

            function loadContent(){

                $content.html(response.$content);

            }

            // home state transition
            function showHome(){

            // 1.) hide content, 
            // 2.) load it in, 
            // 3.) fade it into view

              // PART 2
              function showHomeContent(){
                $content.promise().done(function () {
                    loadContent();
                    TweenMax.fromTo($content, 1, {opacity: 0, display: 'block', transform: 'scale(1.1)'},{opacity:1 , transform: 'scale(1)', ease: Back.easeBack, delay: .5}); 
                    TweenMax.fromTo($footer, 1, {opacity: 0, display: 'flex', transform: 'scale(1.1)'},{opacity:1 , transform: 'scale(1)', ease: Back.easeBack, delay: .5}); 

                    //run scripts for this section
                    // make sure they're attached to window or some global module
                    codeAddress();
                }); 
                
              }
              // PART 1
              // hide content
              TweenMax.to([$content, $footer], .01, { opacity: 0, ease: Back.easeIn, onComplete: showHomeContent});

            }
           
            // global state transition
           function showGlobal(){ 

              $content.promise().done(function () {

                  loadContent(); 
                  
              }); 
              
            }
            
        }).fail(function (){
            document.location.href = url;
            alert('failed fetch');
            return false;
        });

    });

  // initial page transition animations
  // notice a:internal:not(.download, a.ie)
  // a.ie -- the .ie class is added for ie browsers pjax won't work well with ie browsers so we skip over pjax and use
  // the default way of accessing pages
  $document.on('click', 'a:internal:not(.download, a.ie, .scroll-link, .no-transition)', function (e) {

        console.log("HREF: " + window.location.href);

        if (e.which == 2 || e.ctrlKey || e.metaKey) {
          return true;
        }

        // set custom pjax attributes for next page to transition to
        window.ajaxTo = $(this).data('ajax-to');

        // initial pjax transitions

        // future state is used to determine which css prop/values to change so we can
        // so any css differences between pages are animated elegantly upon pjax-ing
        var futureState = $(this).data('state') || 'home';

        History.pushState(null, futureState, $(this).attr('href'));
        e.preventDefault();

        $content.fadeOut();
        $footer.fadeOut();

      return false;
  });

});