//To prevent the site from being framed (recommended)
    BrowserPolicy.framing.disallow(); 
//To prevent inline scripts (recommended)
    BrowserPolicy.content.disallowInlineScripts();
//To prevent eval (strongly recommended)
    BrowserPolicy.content.disallowEval();
//To allow inline styles (we found this necessary for Google Fonts to work)
    BrowserPolicy.content.allowInlineStyles();
//To allow fonts to be loaded via data URLs (we load our icon font this way)
    BrowserPolicy.content.allowFontDataUrl();
//To trust external scripts only from Google Analytics, Mixpanel, and Zendesk
    var trusted = [
              '*.google-analytics.com',
              '*.mxpnl.com',
              '*.zendesk.com',
              '*.ets.org'
                 ];
//External scripts must be loaded over HTTPS

    _.each(trusted, function(origin) {
          origin = "https://" + origin;
          BrowserPolicy.content.allowOriginForAll(origin);
    });