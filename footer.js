// Shared site footer: <site-footer></site-footer> on every page.
// A plain classic script (no fetch, no modules) so it also works on file://.
// Renders into light DOM, so it picks up each page's CSS custom properties
// (--ink, --line, ...). Include with: <script src="footer.js" defer></script>
(function(){
  const REPO = 'https://github.com/scardinoandrea/crucial-conversations-dojo';

  // Bottom-pinning: on short pages the footer sits flush against the bottom
  // edge of the window; on long ones it just follows the content. Requires
  // the page to wrap its content in a .wrap that is a direct child of <body>
  // and the direct parent of <site-footer> (true for every page today).
  // The page's own bottom padding is dropped so nothing sits below the footer;
  // a page with fixed bottom UI can reserve room via site-footer padding-bottom.
  const CSS = `
    body:has(> .wrap > site-footer){display:flex;flex-direction:column;padding-bottom:0;}
    .wrap:has(> site-footer){flex:1 0 auto;width:100%;display:flex;flex-direction:column;}
    site-footer{display:block;line-height:1.55;margin-top:auto;padding-bottom:16px;}
    site-footer .site-foot{margin-top:28px;padding-top:18px;border-top:1px dashed var(--line);display:flex;flex-direction:column;align-items:center;gap:6px;text-align:center;font-family:'Inter',sans-serif;font-size:13px;color:var(--ink-soft);}
    site-footer .site-name{font-family:'Special Elite',cursive;font-size:16px;color:var(--ink);}
    site-footer a{color:var(--ink);text-decoration:underline;text-underline-offset:3px;}
    site-footer a:hover{text-decoration-thickness:2px;}
    site-footer a:focus-visible{outline:2px solid var(--safety-teal);outline-offset:3px;border-radius:2px;}
    site-footer .gh-link{display:inline-flex;padding:8px;margin-top:2px;color:var(--ink-soft);border-radius:50%;}
    site-footer .gh-link:hover{color:var(--ink);}
    site-footer .gh-link svg{width:20px;height:20px;fill:currentColor;display:block;}
  `;

  const HTML = `
    <footer>
      <div class="site-foot">
        <div class="site-name">Crucial Conversations Dojo</div>
        <div><a href="about.html">About &amp; privacy</a></div>
        <div>Found a mistake? <a href="${REPO}/issues/new">Let me know!</a></div>
        <div>Made with love by Andrea 🌻</div>
        <a class="gh-link" href="${REPO}" aria-label="Source code on GitHub" title="Source code on GitHub"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg></a>
      </div>
    </footer>
  `;

  if(!document.getElementById('site-footer-css')){
    const style = document.createElement('style');
    style.id = 'site-footer-css';
    style.textContent = CSS;
    document.head.appendChild(style);
  }

  customElements.define('site-footer', class extends HTMLElement {
    connectedCallback(){ if(!this.childElementCount) this.innerHTML = HTML; }
  });
})();
