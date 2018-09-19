hljs.initHighlightingOnLoad();

// Make URLs clickable
document.querySelectorAll('.http').forEach((element) => {
  element.onclick = () => {
    if (element.innerHTML.indexOf('json') > -1) {
      const output = element.innerHTML.match(/^(.*)\n/)[1];
      element.innerHTML = output;
    } else {
      const url = element.innerHTML.match(/(https:\/\/[^<]+)</)[1];
      fetch(url)
        .then((resp) => {
          const host = resp.url.match(/\/\/([^:/]+)/)[1];
          element.insertAdjacentHTML('beforeend', `\nHost: ${host}\nContent-Type: ${resp.headers.get('Content-Type')}\nContent-Length: ${resp.headers.get('Content-Length')}\n\n`);
          return resp.json();
        })
        .then((data) => {
          element.insertAdjacentHTML('beforeend', `${JSON.stringify(data, undefined, 4)}`);
          hljs.highlightBlock(element);
        });
    }
  };
});

// Cookie consent
window.addEventListener("load", function(){
  window.cookieconsent.initialise({
    "palette": {
      "popup": {
        "background": "#0178cf",
        "text": "#ffffff"
      },
      "button": {
        "background": "#272454",
        "text": "#ffffff"
      }
    },
    "content": {
      "message": "This site uses cookies for analytics. By continuing to browse this site, you agree to this use."
    }
  })});
