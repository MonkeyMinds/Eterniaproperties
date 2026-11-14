/* =====================================================================
   ETERNIA PROPERTIES — SITE SCRIPT
   Works without a server: all listings come from data.js.
   ===================================================================== */
(function () {
  "use strict";

  var PHONE = "9989759596";
  var EMAIL = "Eterniaproperty@gmail.com";
  var PER_PAGE = 6;

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };

  /* ---------- Formatting ---------- */
  function money(lakh) {
    if (lakh >= 100) {
      var cr = Math.round((lakh / 100) * 100) / 100;
      return "₹" + cr + " Cr";
    }
    return "₹" + Math.round(lakh * 100) / 100 + " L";
  }
  function priceText(p) { return money(p.price) + (p.priceMax ? " – " + money(p.priceMax) : "") + " Onwards"; }
  function bhkText(p) {
    if (!p.bhk || !p.bhk.length) return p.type === "Plot" ? "Open Plot" : "Office / Retail";
    var list = p.bhk.slice();
    var last = list.pop();
    return (list.length ? list.join(", ") + " & " : "") + last + " BHK";
  }
  function areaText(p) { return p.areaMax && p.areaMax !== p.areaMin ? p.areaMin + " - " + p.areaMax + " sq ft" : p.areaMin + " sq ft"; }
  function typeLabel(t) { return { Apartment: "Apartments", Villa: "Villas", Plot: "Plots", Commercial: "Commercial" }[t] || t; }
  function zoneName(z) { return ZONES[z] ? ZONES[z].name : ""; }
  function waLink(p) {
    var msg = "Hello Eternia Properties, I am interested in " + (p ? p.title + " (" + p.locality + ")" : "a property in Hyderabad") + ". Please share details.";
    return "https://wa.me/91" + PHONE + "?text=" + encodeURIComponent(msg);
  }

  /* ---------- Card templates ---------- */
  function sampleTag(p) { return p.sample ? '<span class="tag-sample">Sample listing</span>' : ""; }

  function cardH(p) {
    return '<article class="prop-card">' +
      '<div class="prop-media"><img src="images/' + esc(p.image) + '" alt="' + esc(p.title) + '" loading="lazy">' + sampleTag(p) + '</div>' +
      '<div class="prop-body">' +
        '<h3>' + esc(p.title) + '</h3>' +
        '<p class="desc">' + esc(p.desc) + '</p>' +
        '<span class="start">Starting at</span>' +
        '<span class="price">' + priceText(p) + '</span>' +
        '<div class="prop-info">' +
          '<div><span class="lbl">' + typeLabel(p.type) + '</span><span class="val">' + bhkText(p) + '</span></div>' +
          '<div><span class="lbl">Area</span><span class="val">' + areaText(p) + '</span></div>' +
          '<div><span class="lbl">Status</span><span class="val">' + esc(p.status) + '</span>' +
               '<span class="lbl">Location</span><span class="val">' + esc(p.locality) + ', ' + ZONES[p.zone].short + ' Hyderabad</span></div>' +
        '</div>' +
        '<div class="prop-actions">' +
          '<a class="btn btn-sm btn-light" href="' + waLink(p) + '" target="_blank" rel="noopener">View Details</a>' +
          '<a class="btn btn-sm" href="tel:+91' + PHONE + '">Contact us</a>' +
        '</div>' +
      '</div></article>';
  }

  function cardV(p) {
    return '<article class="vcard">' +
      '<div class="media"><img src="images/' + esc(p.image) + '" alt="' + esc(p.title) + '" loading="lazy">' + sampleTag(p) + '</div>' +
      '<div class="body">' +
        '<span class="vprice">' + priceText(p) + '</span>' +
        '<h3>' + esc(p.title) + '</h3>' +
        '<span class="lbl">Location</span><span class="small">' + esc(p.locality) + ', ' + zoneName(p.zone) + '</span>' +
        '<span class="lbl">' + typeLabel(p.type) + ' <span class="small">' + bhkText(p) + '</span></span>' +
        '<a class="btn btn-sm" href="tel:+91' + PHONE + '">Contact us</a>' +
      '</div></article>';
  }

  /* ---------- Search matching ---------- */
  function haystack(p) {
    var words = [p.title, p.locality, zoneName(p.zone), p.zone, p.type, p.type + "s", typeLabel(p.type), p.status];
    if (p.type === "Apartment") words.push("flat flats");
    if (p.type === "Plot") words.push("open plot land");
    if (p.type === "Commercial") words.push("office shop retail");
    (p.bhk || []).forEach(function (b) { words.push(b + " bhk", b + "bhk"); });
    return words.join(" ").toLowerCase();
  }
  function matchesQuery(p, q) {
    if (!q) return true;
    var hay = haystack(p);
    q = q.toLowerCase().replace(/(\d)\s*bhk/g, "$1bhk");
    return q.split(/[\s,]+/).filter(Boolean).every(function (t) { return hay.indexOf(t) !== -1; });
  }

  /* ---------- Header behaviour ---------- */
  function initHeader() {
    var toggle = $(".menu-toggle"), nav = $(".main-nav");
    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        var open = nav.classList.toggle("open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
    }
    var topBtn = $(".fb-top");
    if (topBtn) {
      window.addEventListener("scroll", function () { topBtn.classList.toggle("show", window.scrollY > 500); });
      topBtn.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
    }
  }

  /* ---------- Contact form (no server: opens email app) ---------- */
  function initForms() {
    $$(".enquiry-form").forEach(function (f) {
      f.addEventListener("submit", function (e) {
        e.preventDefault();
        var d = new FormData(f);
        var body = "Name: " + d.get("name") + "\nPhone: " + d.get("phone") + "\nEmail: " + d.get("email") + "\n\n" + (d.get("message") || "");
        window.location.href = "mailto:" + EMAIL + "?subject=" + encodeURIComponent("Website enquiry from " + d.get("name")) + "&body=" + encodeURIComponent(body);
        var note = $(".form-note", f);
        if (note) note.style.display = "block";
      });
    });
  }

  /* ---------- Shared select fillers ---------- */
  function fillZoneSelect(sel) {
    Object.keys(ZONES).forEach(function (z) { sel.insertAdjacentHTML("beforeend", '<option value="' + z + '">' + ZONES[z].name + "</option>"); });
  }
  function fillLocalitySelect(sel, zone, firstLabel) {
    sel.innerHTML = '<option value="">' + (firstLabel || "All Locations") + "</option>";
    Object.keys(ZONES).forEach(function (z) {
      if (zone && z !== zone) return;
      ZONES[z].localities.forEach(function (l) { sel.insertAdjacentHTML("beforeend", '<option value="' + esc(l) + '">' + esc(l) + "</option>"); });
    });
  }

  /* ---------- HOME ---------- */
  function initHome() {
    var form = $("#heroSearch");
    if (!form) return;
    var zoneSel = $("#heroZone"), locSel = $("#heroLoc");
    fillZoneSelect(zoneSel);
    fillLocalitySelect(locSel, "");
    zoneSel.addEventListener("change", function () { fillLocalitySelect(locSel, zoneSel.value); });

    var chosenType = "";
    $$(".hero .chip").forEach(function (c) {
      c.addEventListener("click", function () {
        var params = new URLSearchParams();
        if (c.dataset.type) params.set("type", c.dataset.type);
        if (c.dataset.status) params.set("status", c.dataset.status);
        if (zoneSel.value) params.set("zone", zoneSel.value);
        window.location.href = "properties.html?" + params.toString();
      });
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var params = new URLSearchParams();
      if (zoneSel.value) params.set("zone", zoneSel.value);
      if (locSel.value) params.set("loc", locSel.value);
      var q = $("#heroQ").value.trim();
      if (q) params.set("q", q);
      if (chosenType) params.set("type", chosenType);
      window.location.href = "properties.html" + (params.toString() ? "?" + params.toString() : "");
    });

    // Featured properties: first listing of each type per zone, max 6
    var featured = $("#featured");
    if (featured) {
      var pick = [1, 7, 14, 19, 10, 4].map(function (id) { return PROPERTIES.filter(function (p) { return p.id === id; })[0]; }).filter(Boolean);
      if (pick.length < 6) pick = PROPERTIES.slice(0, 6);
      featured.innerHTML = pick.map(cardH).join("");
    }

    // Locality strip (auto-advancing, like the reference's partner carousel)
    var strip = $("#locStrip");
    if (strip) {
      var all = [];
      Object.keys(ZONES).forEach(function (z) { ZONES[z].localities.forEach(function (l) { all.push({ l: l, z: z }); }); });
      strip.innerHTML = all.map(function (o) {
        return '<a class="strip-tile" href="' + ZONES[o.z].page + "?loc=" + encodeURIComponent(o.l) + '"><strong>' + esc(o.l) + "</strong><span>" + ZONES[o.z].name + "</span></a>";
      }).join("");
      var idx = 0, counter = $("#locCount");
      var step = function () {
        var tile = strip.children[0];
        var gap = parseFloat(getComputedStyle(strip).columnGap || getComputedStyle(strip).gap) || 0;
        var visible = Math.max(1, Math.floor(strip.parentElement.clientWidth / (tile.offsetWidth + gap)));
        var max = all.length - visible;
        idx = idx >= max ? 0 : idx + 1;
        strip.style.transform = "translateX(" + (-idx * (tile.offsetWidth + gap)) + "px)";
        if (counter) counter.textContent = (idx + 1) + " / " + all.length;
      };
      if (counter) counter.textContent = "1 / " + all.length;
      setInterval(step, 2600);
    }

    // Promo slider
    var slides = $$(".promo-slide"), dots = $(".promo .dots");
    if (slides.length && dots) {
      var cur = 0;
      slides.forEach(function (_, i) { dots.insertAdjacentHTML("beforeend", '<button aria-label="Slide ' + (i + 1) + '"></button>'); });
      var btns = $$("button", dots);
      var show = function (i) {
        cur = (i + slides.length) % slides.length;
        slides.forEach(function (s, k) { s.classList.toggle("active", k === cur); });
        btns.forEach(function (b, k) { b.classList.toggle("active", k === cur); });
      };
      btns.forEach(function (b, k) { b.addEventListener("click", function () { show(k); }); });
      show(0);
      setInterval(function () { show(cur + 1); }, 5000);
    }
  }

  /* ---------- LISTING (properties.html and the four zone pages) ---------- */
  function initListing() {
    var grid = $("#results");
    if (!grid) return;
    var fixedZone = document.body.getAttribute("data-zone") || "";
    var params = new URLSearchParams(window.location.search);

    var state = {
      zone: fixedZone || params.get("zone") || "",
      loc: params.get("loc") || "",
      q: params.get("q") || "",
      type: params.get("type") || "",
      bhk: params.get("bhk") || "",
      status: params.get("status") || "",
      sort: params.get("sort") || "",
      page: 1
    };

    var zoneSel = $("#fZone"), locSel = $("#fLoc"), qIn = $("#fQ"), typeSel = $("#fType"), bhkSel = $("#fBhk"), sortSel = $("#fSort");

    if (zoneSel) { fillZoneSelect(zoneSel); zoneSel.value = state.zone; zoneSel.addEventListener("change", function () { state.zone = zoneSel.value; state.loc = ""; fillLocalitySelect(locSel, state.zone, "All Locations"); run(); }); }
    fillLocalitySelect(locSel, state.zone, fixedZone ? "All " + ZONES[fixedZone].short + " Localities" : "All Locations");
    locSel.value = state.loc;
    qIn.value = state.q;
    typeSel.value = state.type;
    bhkSel.value = state.bhk;
    sortSel.value = state.sort;

    locSel.addEventListener("change", function () { state.loc = locSel.value; run(); });
    typeSel.addEventListener("change", function () { state.type = typeSel.value; run(); });
    bhkSel.addEventListener("change", function () { state.bhk = bhkSel.value; run(); });
    sortSel.addEventListener("change", function () { state.sort = sortSel.value; run(); });
    var submit = function (e) { if (e) e.preventDefault(); state.q = qIn.value.trim(); run(); };
    $("#filterForm").addEventListener("submit", submit);
    var find = $("#findBtn"); if (find) find.addEventListener("click", submit);

    // Quick-filter chips
    var chips = $$(".filter-chips .chip, .loc-list .chip");
    chips.forEach(function (c) {
      c.addEventListener("click", function () {
        var k = c.dataset.key, v = c.dataset.val;
        state[k] = state[k] === v ? "" : v;
        if (k === "type") typeSel.value = state.type;
        if (k === "bhk") bhkSel.value = state.bhk;
        if (k === "loc") locSel.value = state.loc;
        run();
      });
    });

    function filtered() {
      var list = PROPERTIES.filter(function (p) {
        if (state.zone && p.zone !== state.zone) return false;
        if (state.loc && p.locality !== state.loc) return false;
        if (state.type && p.type !== state.type) return false;
        if (state.bhk) {
          var b = parseInt(state.bhk, 10);
          if (!p.bhk || !p.bhk.some(function (x) { return state.bhk === "4" ? x >= 4 : x === b; })) return false;
        }
        if (state.status && p.status !== state.status) return false;
        return matchesQuery(p, state.q);
      });
      if (state.sort === "low") list.sort(function (a, b) { return a.price - b.price; });
      if (state.sort === "high") list.sort(function (a, b) { return (b.priceMax || b.price) - (a.priceMax || a.price); });
      return list;
    }

    function syncChips() {
      chips.forEach(function (c) { c.classList.toggle("active", state[c.dataset.key] === c.dataset.val); });
    }

    function updateUrl() {
      var p = new URLSearchParams();
      ["zone", "loc", "q", "type", "bhk", "status", "sort"].forEach(function (k) { if (state[k] && !(k === "zone" && fixedZone)) p.set(k, state[k]); });
      var url = window.location.pathname + (p.toString() ? "?" + p.toString() : "");
      try { history.replaceState(null, "", url); } catch (e) { /* file:// in some browsers */ }
    }

    function render() {
      var list = filtered();
      var pages = Math.max(1, Math.ceil(list.length / PER_PAGE));
      if (state.page > pages) state.page = pages;
      var start = (state.page - 1) * PER_PAGE;
      var slice = list.slice(start, start + PER_PAGE);
      $("#count").textContent = list.length
        ? (start + 1) + " to " + (start + slice.length) + " out of " + list.length + " properties"
        : "0 properties found";
      grid.innerHTML = slice.length ? slice.map(cardH).join("")
        : '<div class="empty">No properties match your search. Try another locality or clear a filter, or call us on <a class="accent" href="tel:+91' + PHONE + '">' + PHONE + "</a>.</div>";

      var pag = $("#pagination");
      pag.innerHTML = "";
      if (pages > 1) {
        for (var i = 1; i <= pages; i++) pag.insertAdjacentHTML("beforeend", '<button data-p="' + i + '"' + (i === state.page ? ' class="active"' : "") + ">" + i + "</button>");
        pag.insertAdjacentHTML("beforeend", '<button data-p="next" aria-label="Next page"' + (state.page === pages ? " disabled" : "") + ">»</button>");
        $$("button", pag).forEach(function (b) {
          b.addEventListener("click", function () {
            state.page = b.dataset.p === "next" ? state.page + 1 : parseInt(b.dataset.p, 10);
            render();
            $(".list-head").scrollIntoView({ behavior: "smooth" });
          });
        });
      }
      syncChips();
      updateUrl();
    }
    function run() { state.page = 1; render(); }
    render();
  }

  /* ---------- Carousel of one property type (properties page) ---------- */
  function initCarousels() {
    $$("[data-carousel]").forEach(function (wrap) {
      var type = wrap.getAttribute("data-carousel");
      var list = PROPERTIES.filter(function (p) { return p.type === type; });
      var track = $(".carousel", wrap);
      track.innerHTML = list.map(cardV).join("");
      var badge = $(".badge-red", wrap); if (badge) badge.textContent = list.length + " Projects";
      $$(".arrows button", wrap).forEach(function (b) {
        b.addEventListener("click", function () {
          var card = track.children[0];
          var dist = card ? card.offsetWidth + 32 : 300;
          track.scrollBy({ left: b.dataset.dir === "prev" ? -dist : dist, behavior: "smooth" });
        });
      });
    });
  }

  /* ---------- Private sheet links (hidden behind the © in the footer) ---------- */
  var SHEETS = [
    { label: "Sheet 1", url: "https://docs.google.com/spreadsheets/d/1DRRd6kRznlstZfs09YSZWHtqfTZDu6XS5W4-DkK1uck/edit?pli=1&gid=0#gid=0" },
    { label: "Sheet 2", url: "https://docs.google.com/spreadsheets/d/16wOxXMd3rTrOaagPb6Nz2m7OcMSrbIMwG13vdoMv6EE/edit?gid=0#gid=0" }
  ];
  function initSheetLinks() {
    var cp = $(".copyright");
    if (!cp) return;
    var node = Array.prototype.filter.call(cp.childNodes, function (n) { return n.nodeType === 3 && n.nodeValue.indexOf("©") !== -1; })[0];
    if (!node) return;
    var i = node.nodeValue.indexOf("©");
    var after = node.splitText(i);
    after.nodeValue = after.nodeValue.slice(1);
    var trig = document.createElement("span");
    trig.textContent = "©";
    trig.style.cssText = "position:relative;cursor:text;";
    cp.insertBefore(trig, after);

    var box = document.createElement("span");
    box.style.cssText = "display:none;position:absolute;bottom:130%;left:50%;transform:translateX(-50%);background:#fff;border:1px solid #ddd;border-radius:4px;box-shadow:0 4px 12px rgba(0,0,0,.12);padding:4px 0;white-space:nowrap;z-index:50;font-weight:400;font-size:13px;text-align:left;";
    box.innerHTML = SHEETS.map(function (s) {
      return '<a href="' + s.url + '" target="_blank" rel="noopener noreferrer" style="display:block;padding:4px 14px;color:#333;">' + s.label + "</a>";
    }).join("");
    trig.appendChild(box);

    trig.addEventListener("click", function (e) {
      if (e.target.tagName === "A") return;
      e.stopPropagation();
      box.style.display = box.style.display === "block" ? "none" : "block";
    });
    document.addEventListener("click", function () { box.style.display = "none"; });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initHeader();
    initSheetLinks();
    initForms();
    if (typeof PROPERTIES !== "undefined") { initHome(); initListing(); initCarousels(); }
  });
})();
