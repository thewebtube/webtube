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


fetchInject("https://raw.githubusercontent.com/thewebtube/webtube/main/scripts/adguard.js")
fetchInject("https://raw.githubusercontent.com/thewebtube/webtube/main/scripts/ryd.js")
fetchInject("https://raw.githubusercontent.com/thewebtube/webtube/main/scripts/nsfbypass.js")
fetchInject("https://raw.githubusercontent.com/thewebtube/webtube/main/scripts/Clickbait-Buster.js")