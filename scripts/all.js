function fetchInject(url){
  (() => {
    async function runShortcut() {
      try {
        const response = await fetch(url);
        const text = await response.text();
        try {
          eval(text);
        } catch (ex) {
          completion(ex);
        }
      } catch (ex) {
        completion(ex.toString());
      }
    }
    runShortcut();
  })();
}


fetchInject("https://raw.githubusercontent.com/andronedev/webtube/main/scripts/adguard.js")
fetchInject("https://github.com/Anarios/return-youtube-dislike/raw/main/Extensions/UserScript/Return%20Youtube%20Dislike.user.js")