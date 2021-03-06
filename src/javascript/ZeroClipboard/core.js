ZeroClipboard.version = "<%= version %>";
// ZeroClipboard options defaults
var _defaults = {
  moviePath:         "ZeroClipboard.swf",        // URL to movie
  trustedDomains:    [window.location.host],     // Page domains that the SWF should trust (single string or array of strings)

  /** @private */
  text:              null,                       // The text to be copied
  token:             null,                       // The nonce token for security in emulating click events

  useNoCache:        true,                       // Include a nocache query parameter on requests for the SWF
  forceHandCursor:   false,                      // Forcibly set the hand cursor ("pointer") for all glued elements
  zIndex:            999999999,                  // The z-index used by the Flash object. Max value (32-bit): 2147483647
  debug:             true                        // Debug enabled: send `console` messages with deprecation warnings, etc.
};

/*
 * Set defaults.
 *
 * returns nothing
 */
ZeroClipboard.setDefaults = function (options) {
  _extend(_defaults, options);
};

/*
 * Self-destruction and clean up everything
 *
 * returns nothing
 */
ZeroClipboard.destroy = function () {
  // If there is an existing singleton
  if (ZeroClipboard.prototype._singleton) {
    // unglue all the elements
    ZeroClipboard.prototype._singleton.unglue(gluedElements);

    var bridge = ZeroClipboard.prototype._singleton.htmlBridge;

    // remove the bridge
    if (bridge && bridge.parentNode) {
      bridge.parentNode.removeChild(bridge);
    }

    // delete the client object
    delete ZeroClipboard.prototype._singleton;
  }
};