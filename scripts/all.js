var plugins = [
  {
      name: "Adguard",
      url: "https://raw.githubusercontent.com/thewebtube/webtube/main/scripts/adguard.js",
      enabled: true,
      injectOnUrlChange: false

  },
  {
      name: "AgeBypasser",
      url: "https://raw.githubusercontent.com/thewebtube/webtube/main/scripts/nsfbypass.js",
      enabled: true,
      injectOnUrlChange: false

  },
  {
      name: "AntiClickBait",
      url: "https://raw.githubusercontent.com/thewebtube/webtube/main/scripts/Clickbait-Buster.js",
      enabled: true,
      injectOnUrlChange: false

  },
  {
      name: "SponsorBlock",
      url: "https://raw.githubusercontent.com/thewebtube/webtube/main/scripts/sponsorblock.js",
      enabled: true,
      injectOnUrlChange: true

  },
  {
      name: "Return Dislikes",
      url: "https://raw.githubusercontent.com/thewebtube/webtube/main/scripts/ryd.js",
      enabled: true,
      injectOnUrlChange: true
  }


]

var cache = {};

function injectAll(mode = "all") {
  for (var i = 0; i < plugins.length; i++) {
      if (plugins[i].enabled && (plugins[i].injectOnUrlChange || mode == "all")) {
          injectScript(plugins[i].url);
      }
  }
}


function injectScript(url) {
  if (cache[url]) {
      console.log("Injecting " + url + " from cache");
      eval(cache[url]);
  } else {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.onreadystatechange = function () {
          if (xhr.readyState == 4) {
              if (xhr.status == 200) {
              cache[url] = xhr.responseText;
              eval(xhr.responseText);
              }
          }
      }
      xhr.send();
  }
}

// on page change 

oldurl = window.location.href;

setInterval(function () {
  if (oldurl != window.location.href) {
      oldurl = window.location.href;
      injectAll("page change");
  }
}
  , 1000);

injectAll("all")