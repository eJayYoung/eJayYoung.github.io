/* ============================================================================
   简历站点逻辑（简历内容请编辑 js/resume-data.js）
   - 语言切换：默认中文，支持右上角切换及 ?lang=en / ?lang=zh 直达；
   - 主题切换：默认跟随系统，手动切换后记住偏好；
   - 联系方式保护：邮箱与手机号以 XOR + Base64 密文存储，点击联系或打印时解密。
   ============================================================================ */
(function () {
  "use strict";

  var D = window.RESUME_DATA;

  var ICONS = {
    github: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>',
    mail: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
    mapPin: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
    briefcase: '<rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.33 1.84.56 2.8.69A2 2 0 0 1 22 16.92z"/>',
    star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
    lightbulb: '<path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7V18h8v-3.3A7 7 0 0 0 12 2z"/>',
    cpu: '<rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/>',
    layers: '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
    zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
    external: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>',
    moon: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',
    sun: '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>',
    printer: '<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',
    copy: '<rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
    check: '<polyline points="20 6 9 17 4 12"/>',
    x: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
    send: '<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>',
    eye: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
    eyeOff: '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>',
  };

  function icon(name) {
    return '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[name] || "") + "</svg>";
  }

  function esc(v) {
    return String(v == null ? "" : v)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* 高亮条目前缀（例如「医疗防幻觉约束：...」），全量转义防 XSS */
  function formatBullet(text) {
    var m = String(text).match(/^([^：:]{2,36}[：:])(\s*.*)$/);
    if (!m) return esc(text);
    return '<strong class="bullet-lead">' + esc(m[1]) + "</strong>" + esc(m[2]);
  }

  function encodeCipher(plain) {
    var key = D.contactKey;
    var raw = "";
    for (var i = 0; i < plain.length; i++) {
      raw += String.fromCharCode(plain.charCodeAt(i) ^ key[i % key.length]);
    }
    return btoa(raw);
  }

  function decodeCipher(cipher) {
    var raw = atob(cipher);
    var key = D.contactKey;
    var out = "";
    for (var i = 0; i < raw.length; i++) {
      out += String.fromCharCode(raw.charCodeAt(i) ^ key[i % key.length]);
    }
    return out;
  }

  function storeGet(k) {
    try { return localStorage.getItem(k); } catch (e) { return null; }
  }

  function storeSet(k, v) {
    try { localStorage.setItem(k, v); } catch (e) {}
  }

  var app = document.getElementById("app");
  var qsLang = new URLSearchParams(location.search).get("lang");
  var lang = (qsLang === "zh" || qsLang === "en") ? qsLang
    : (storeGet("resume-lang") === "en" ? "en" : "zh");
  var theme = storeGet("resume-theme") ||
    (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

  function applyTheme() {
    document.documentElement.setAttribute("data-theme", theme);
  }

  function render() {
    var d = D[lang];
    var ui = d.ui;
    var heroIcons = ["briefcase", "mapPin", "layers"];
    var sy = window.scrollY;

    document.documentElement.lang = d.htmlLang;
    document.title = d.title;
    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", d.metaDesc);

    var h = "";

    /* 顶部控制条 */
    h += '<div class="controls">'
      + '<button class="ctl-btn" data-action="lang" aria-label="Switch language">' + esc(ui.langSwitch) + "</button>"
      + '<button class="ctl-btn icon-only" data-action="theme" aria-label="Toggle theme">' + icon(theme === "dark" ? "sun" : "moon") + "</button>"
      + '<button class="ctl-btn" data-action="print" aria-label="' + esc(ui.printBtn) + '">' + icon("printer") + '<span class="print-label">' + esc(ui.printBtn) + "</span></button>"
      + "</div>";

    /* 头部 */
    h += '<header class="hero">'
      + '<div class="hero-top"><div>'
      + '<p class="role">' + esc(d.header.role) + "</p>"
      + "<h1>" + esc(d.header.name) + "</h1></div>"
      + '<div class="hero-actions">'
      + '<a class="btn btn-primary" href="' + esc(D.links.github) + '" target="_blank" rel="noopener noreferrer">' + icon("github") + esc(ui.githubBtn) + "</a>"
      + '<button class="btn btn-ghost" data-action="contact">' + icon("mail") + esc(ui.contactBtn) + "</button>"
      + "</div></div>"
      + '<p class="tagline">' + esc(d.header.tagline) + "</p>"
      + '<p class="hero-summary">' + esc(d.header.summary) + "</p>"
      + '<div class="hero-meta">'
      + d.header.meta.map(function (m, i) {
          return "<span>" + icon(heroIcons[i % heroIcons.length]) + esc(m) + "</span>";
        }).join("")
      + "</div>"
      + '<div class="print-contact">'
      + '<a id="printPhone" href="#"></a>'
      + '<a id="printEmail" href="#"></a>'
      + '<a href="' + esc(D.links.github) + '">' + esc(D.links.github.replace(/^https?:\/\//, "")) + "</a>"
      + "</div></header>";

    /* 核心优势 */
    h += '<section class="about-section"><h2>' + esc(d.about.title) + '</h2><div class="about-grid">'
      + d.about.cards.map(function (c) {
          return '<article class="about-card"><div class="icon-badge">' + icon(c.icon) + "</div><h3>" + esc(c.title) + "</h3><p>" + esc(c.desc) + "</p></article>";
        }).join("")
      + "</div></section>";

    /* 技术能力 */
    h += '<section class="skills-section"><h2>' + esc(d.skills.title) + '</h2><div class="skills">'
      + d.skills.groups.map(function (g) {
          return '<div class="skill-group"><h3>' + esc(g.name) + '</h3><div class="skill-pills">'
            + g.items.map(function (s) { return '<span class="skill">' + esc(s) + "</span>"; }).join("")
            + "</div></div>";
        }).join("")
      + "</div></section>";

    /* 重点项目 */
    h += '<section class="projects-section"><h2>' + esc(d.projects.title) + "</h2>"
      + d.projects.items.map(function (p) {
          var s = '<article class="project' + (p.featured ? " featured" : "") + '">'
            + (p.featured ? '<span class="featured-badge">' + esc(ui.featuredBadge) + "</span>" : "")
            + '<div class="proj-head"><h3>' + esc(p.name) + '</h3><span class="proj-period">' + esc(p.period) + "</span></div>"
            + '<p class="proj-role">' + esc(p.role) + "</p>"
            + '<p class="proj-desc">' + esc(p.desc) + "</p>"
            + '<ul class="proj-bullets">'
            + p.bullets.map(function (b) { return "<li>" + formatBullet(b) + "</li>"; }).join("")
            + "</ul>";
          if (p.tags && p.tags.length) {
            s += '<div class="tags">'
              + p.tags.map(function (t) { return '<span class="tag">' + esc(t) + "</span>"; }).join("")
              + "</div>";
          }
          return s + "</article>";
        }).join("")
      + "</section>";

    /* 工作经历 */
    h += '<section class="experience-section"><h2>' + esc(d.experience.title) + '</h2><div class="timeline">'
      + d.experience.items.map(function (it) {
          var s = '<article class="item"><div class="item-head"><div>'
            + "<h3>" + esc(it.company) + "</h3>"
            + '<p class="item-role">' + esc(it.role) + '</p></div><span class="period">' + esc(it.period) + "</span></div><ul>"
            + it.bullets.map(function (b) { return "<li>" + formatBullet(b) + "</li>"; }).join("")
            + "</ul>";
          if (it.highlights && it.highlights.length) {
            s += '<div class="highlights">'
              + it.highlights.map(function (x) { return '<span class="highlight">' + icon("star") + esc(x) + "</span>"; }).join("")
              + "</div>";
          }
          return s + "</article>";
        }).join("")
      + "</div></section>";

    /* 教育背景与开源参与 */
    h += '<section><div class="duo">'
      + '<div class="duo-card"><h2>' + esc(d.education.title) + "</h2>"
      + d.education.items.map(function (e) {
          return '<p class="edu"><b>' + esc(e.school) + "</b><span>" + esc(e.degree) + " · " + esc(e.period) + "</span></p>";
        }).join("")
      + "</div>"
      + '<div class="duo-card"><h2>' + esc(d.openSource.title) + '</h2><div class="os-list">'
      + d.openSource.items.map(function (o) {
          var renderLink = function (name, urlKey) {
            var href = urlKey && D.links[urlKey];
            return href
              ? '<a href="' + esc(href) + '" target="_blank" rel="noopener noreferrer">' + esc(name) + icon("external") + "</a>"
              : '<span class="os-name">' + esc(name) + "</span>";
          };
          var nameHtml = o.links
            ? o.links.map(function (l) { return renderLink(l.name, l.urlKey); }).join(' <span class="os-desc">/</span> ')
            : renderLink(o.name, o.urlKey);
          return '<div class="os-row"><div>' + nameHtml + ' <span class="os-desc">· ' + esc(o.desc) + "</span></div></div>";
        }).join("")
      + "</div></div></div></section>";

    /* 联系弹窗与提示条（默认脱敏占位，点击眼睛图标可反复解密显示 / 加密隐藏） */
    var eyeIcons = '<span class="eye-closed">' + icon("eyeOff") + '</span><span class="eye-open">' + icon("eye") + "</span>";
    h += '<div class="modal-overlay" id="modalOverlay">'
      + '<div class="modal" role="dialog" aria-modal="true" aria-label="' + esc(ui.contactTitle) + '">'
      + '<button class="modal-close" data-action="close" aria-label="Close">' + icon("x") + "</button>"
      + "<h3>" + icon("mail") + esc(ui.contactTitle) + "</h3>"
      + '<p class="modal-hint">' + esc(ui.modalHint) + "</p>"
      + '<div class="contact-rows">'
      + '<div class="contact-row" id="emailRow"><div class="contact-row-head">'
      + '<div class="contact-row-label">' + icon("mail") + esc(ui.emailLabel) + "</div>"
      + '<button class="eye-btn" id="emailToggle" data-action="toggle-email" aria-pressed="false" aria-label="' + esc(ui.showContact) + '" title="' + esc(ui.showContact) + '">' + eyeIcons + "</button>"
      + "</div>"
      + '<div class="contact-row-main"><span class="contact-val" id="emailBox" data-action="reveal-email">***@***.***</span>'
      + '<div class="contact-row-actions"><div class="contact-revealed-actions">'
      + '<button class="btn btn-primary btn-sm" data-action="copy-email">' + icon("copy") + esc(ui.copyBtn) + "</button>"
      + '<a class="btn btn-ghost btn-sm" id="mailtoLink" href="#">' + icon("send") + esc(ui.mailBtn) + "</a>"
      + "</div></div></div></div>"
      + '<div class="contact-row" id="phoneRow"><div class="contact-row-head">'
      + '<div class="contact-row-label">' + icon("phone") + esc(ui.phoneLabel) + "</div>"
      + '<button class="eye-btn" id="phoneToggle" data-action="toggle-phone" aria-pressed="false" aria-label="' + esc(ui.showContact) + '" title="' + esc(ui.showContact) + '">' + eyeIcons + "</button>"
      + "</div>"
      + '<div class="contact-row-main"><span class="contact-val" id="phoneBox" data-action="reveal-phone">+86 ***-****-****</span>'
      + '<div class="contact-row-actions"><div class="contact-revealed-actions">'
      + '<button class="btn btn-primary btn-sm" data-action="copy-phone">' + icon("copy") + esc(ui.copyBtn) + "</button>"
      + '<a class="btn btn-ghost btn-sm" id="telLink" href="#">' + icon("phone") + esc(ui.callBtn) + "</a>"
      + "</div></div></div></div>"
      + "</div></div></div>"
      + '<div class="toast" id="toast">' + icon("check") + '<span id="toastText"></span></div>';

    app.innerHTML = h;
    window.scrollTo(0, sy);
  }

  var toastTimer = null;

  function showToast(msg) {
    var t = document.getElementById("toast");
    document.getElementById("toastText").textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove("show"); }, 1800);
  }

  function preparePrint() {
    var email = decodeCipher(D.emailCipher);
    var phone = decodeCipher(D.phoneCipher);
    var emailLink = document.getElementById("printEmail");
    var phoneLink = document.getElementById("printPhone");
    if (emailLink) {
      emailLink.textContent = email;
      emailLink.href = "mailto:" + email;
    }
    if (phoneLink) {
      phoneLink.textContent = phone;
      phoneLink.href = "tel:" + phone.replace(/\s+/g, "");
    }
  }

  var CONTACTS = {
    email: {
      rowId: "emailRow", boxId: "emailBox", linkId: "mailtoLink", toggleId: "emailToggle",
      mask: "***@***.***", cipher: D.emailCipher,
      toHref: function (v) { return "mailto:" + v; },
    },
    phone: {
      rowId: "phoneRow", boxId: "phoneBox", linkId: "telLink", toggleId: "phoneToggle",
      mask: "+86 ***-****-****", cipher: D.phoneCipher,
      toHref: function (v) { return "tel:" + v.replace(/\s+/g, ""); },
    },
  };

  function setContactRevealed(kind, show) {
    var cfg = CONTACTS[kind];
    var row = cfg && document.getElementById(cfg.rowId);
    if (!row) return;
    var isShown = row.getAttribute("data-revealed") === "true";
    var box = document.getElementById(cfg.boxId);
    var link = document.getElementById(cfg.linkId);
    var btn = document.getElementById(cfg.toggleId);
    var ui = D[lang].ui;

    if (show && !isShown) {
      var plain = decodeCipher(cfg.cipher);
      box.textContent = plain;
      link.href = cfg.toHref(plain);
      row.setAttribute("data-revealed", "true");
      if (btn) {
        btn.setAttribute("aria-pressed", "true");
        btn.setAttribute("aria-label", ui.hideContact);
        btn.setAttribute("title", ui.hideContact);
      }
    } else if (!show) {
      if (isShown) cfg.cipher = encodeCipher(box.textContent);
      row.removeAttribute("data-revealed");
      box.textContent = cfg.mask;
      link.href = "#";
      if (btn) {
        btn.setAttribute("aria-pressed", "false");
        btn.setAttribute("aria-label", ui.showContact);
        btn.setAttribute("title", ui.showContact);
      }
    }
  }

  function toggleContact(kind) {
    var cfg = CONTACTS[kind];
    var row = cfg && document.getElementById(cfg.rowId);
    if (!row) return;
    setContactRevealed(kind, row.getAttribute("data-revealed") !== "true");
  }

  function resetModalContacts() {
    setContactRevealed("email", false);
    setContactRevealed("phone", false);
  }

  function openModal() {
    resetModalContacts();
    document.getElementById("modalOverlay").classList.add("open");
  }

  function closeModal() {
    var m = document.getElementById("modalOverlay");
    if (m) m.classList.remove("open");
    resetModalContacts();
  }

  function copyText(text, toastMsg) {
    var done = function () { showToast(toastMsg); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(function () { fallbackCopy(text, done); });
    } else {
      fallbackCopy(text, done);
    }
  }

  function fallbackCopy(text, done) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); done(); } catch (e) {}
    document.body.removeChild(ta);
  }

  app.addEventListener("click", function (e) {
    var t = e.target.closest ? e.target.closest("[data-action]") : null;
    if (!t) {
      if (e.target && e.target.id === "modalOverlay") closeModal();
      return;
    }
    var action = t.getAttribute("data-action");
    if (action === "lang") {
      lang = lang === "zh" ? "en" : "zh";
      storeSet("resume-lang", lang);
      try { history.replaceState(null, "", "?lang=" + lang); } catch (err) {}
      render();
    } else if (action === "theme") {
      theme = theme === "dark" ? "light" : "dark";
      storeSet("resume-theme", theme);
      applyTheme();
      render();
    } else if (action === "print") {
      preparePrint();
      window.print();
    } else if (action === "contact") {
      openModal();
    } else if (action === "close") {
      closeModal();
    } else if (action === "toggle-email") {
      toggleContact("email");
    } else if (action === "toggle-phone") {
      toggleContact("phone");
    } else if (action === "reveal-email") {
      setContactRevealed("email", true);
    } else if (action === "reveal-phone") {
      setContactRevealed("phone", true);
    } else if (action === "copy-email") {
      copyText(document.getElementById("emailBox").textContent, D[lang].ui.copiedEmail);
    } else if (action === "copy-phone") {
      copyText(document.getElementById("phoneBox").textContent, D[lang].ui.copiedPhone);
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal();
  });
  window.addEventListener("beforeprint", preparePrint);

  applyTheme();
  render();
})();
