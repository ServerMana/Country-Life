/*:
 * @plugindesc <PixelateFont>
 * @author mogwai, KisaiTenshi
 * @help
 * https://forums.rpgmakerweb.com/index.php?threads/removing-font-blur.75294/
 */

var Imported = Imported || {};
Imported.PixelateFont = true;

(function () {

  Graphics.loadFont = function(name, url) {
    "use strict"
    var style = document.createElement('style');
    var head = document.getElementsByTagName('head');
    var rule = `@font-face {
      font-family: "${name}";
      image-rendering: pixelated;
      font-smooth: none 0px !important;
      src: url("${url}");
      CANVAS{
        image-rendering: pixelated;
      }      
    }`;
    style.type = 'text/css';
    head.item(0).appendChild(style);
    style.sheet.insertRule(rule, 0);
    this._createFontLoader(name);
  };
  
  Object.defineProperty(Bitmap.prototype, 'smooth', {
      get: function() {
          return false; // this._smooth;
      },
      set: function(value) {
          if (this._smooth !== value) {
              this._smooth = value;
              if(this.__baseTexture){
                if (0) {//(this._smooth) {
                    this._baseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR;
                } else {
                    this._baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
                }
              }              
          }
      },
      configurable: true
  });  
    
  // Bitmap.prototype._drawTextOutline = function() { // only use to get rid of text stroke
     // return;
  // };
  
  Bitmap.prototype._drawTextBody = function(text, tx, ty, maxWidth) {
      var context = this._context;
      context.imageSmoothingEnabled = false;
      context.fillStyle = this.textColor;
      for(var i = 0; i < 12; i++)
         context.fillText(text, tx, ty, maxWidth);
  };
    
})();
