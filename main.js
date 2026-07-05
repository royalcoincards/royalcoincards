/* ═══════════════════════════════════════════════════════════
   ROYAL COIN CARDS — main.js
   Lenis smooth scroll · GSAP ScrollTrigger · Three.js hero
   Vanilla-tilt · nav · gallery filters · WhatsApp form
   ═══════════════════════════════════════════════════════════ */
(function () {
  "use strict";
  document.body.classList.remove("no-js");

  var isMobile = window.matchMedia("(max-width: 768px)").matches;
  var isTouch = window.matchMedia("(hover: none)").matches;
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) document.body.classList.add("reduced-motion");

  /* ── Lenis smooth scroll ─────────────────────────────── */
  var lenis = null;
  if (window.Lenis && !reduced && !isTouch) {
    lenis = new Lenis({
      duration: 1.4,
      easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
      smooth: true
    });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
  }

  /* ── Header state + mobile nav ───────────────────────── */
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (header) header.classList.toggle("scrolled", window.scrollY > 40);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var burger = document.querySelector(".hamburger");
  var mnav = document.querySelector(".mobile-nav");
  if (burger && mnav) {
    burger.addEventListener("click", function () {
      var open = mnav.classList.toggle("open");
      burger.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    mnav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        mnav.classList.remove("open");
        burger.classList.remove("open");
      });
    });
  }

  /* ── GSAP reveals, staggers, counters ────────────────── */
  if (window.gsap && window.ScrollTrigger && !reduced) {
    gsap.registerPlugin(ScrollTrigger);
    if (lenis) lenis.on("scroll", ScrollTrigger.update);

    gsap.utils.toArray(".reveal").forEach(function (el, i) {
      gsap.fromTo(el,
        { y: 50, opacity: 0, scale: 0.97 },
        {
          y: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out",
          delay: (el.dataset.delay ? +el.dataset.delay : (i % 4) * 0.1),
          scrollTrigger: { trigger: el, start: "top 88%" }
        });
    });

    // Counters
    gsap.utils.toArray("[data-count]").forEach(function (el) {
      var target = parseFloat(el.dataset.count);
      var suffix = el.dataset.suffix || "";
      var obj = { v: 0 };
      ScrollTrigger.create({
        trigger: el, start: "top 90%", once: true,
        onEnter: function () {
          gsap.to(obj, {
            v: target, duration: 2, ease: "power2.out",
            onUpdate: function () {
              el.textContent = Math.round(obj.v).toLocaleString() + suffix;
            }
          });
        }
      });
    });

    // Timeline line draw
    var tl = document.querySelector(".timeline");
    if (tl) {
      gsap.utils.toArray(".step-num").forEach(function (n) {
        gsap.from(n, {
          scale: 0.4, opacity: 0, duration: 0.7, ease: "back.out(2.2)",
          scrollTrigger: { trigger: n, start: "top 85%" }
        });
      });
    }
  } else {
    // No GSAP / reduced motion: show everything
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.style.opacity = 1; el.style.transform = "none";
    });
    document.querySelectorAll("[data-count]").forEach(function (el) {
      el.textContent = (+el.dataset.count).toLocaleString() + (el.dataset.suffix || "");
    });
  }

  /* ── Vanilla-tilt on cards (desktop only) ────────────── */
  if (window.VanillaTilt && !isTouch && !reduced) {
    VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
      max: 10, speed: 400, glare: true, "max-glare": 0.18,
      gyroscope: false, scale: 1.02
    });
  }

  /* ── Three.js hero: 3D coin card + gold dust ─────────── */
  var canvas = document.getElementById("hero-canvas");
  if (canvas) {
    var webglOK = false;
    try {
      var testGl = document.createElement("canvas").getContext("webgl");
      webglOK = !!testGl && !!window.THREE && !isMobile && !reduced;
    } catch (e) { webglOK = false; }

    if (!webglOK) {
      document.body.classList.add("no-webgl");
    } else {
      var scene = new THREE.Scene();
      var camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
      camera.position.set(0, 0, 8.5);

      var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      function resize() {
        var w = canvas.clientWidth, h = canvas.clientHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      }
      window.addEventListener("resize", resize);

      // Lights — warm gold key top-left (matches the neumorphic light source)
      scene.add(new THREE.AmbientLight(0xfff6e0, 0.75));
      var key = new THREE.DirectionalLight(0xffe9b8, 1.05);
      key.position.set(-4, 5, 6);
      scene.add(key);
      var fill = new THREE.PointLight(0xb8bfc6, 0.5, 30);
      fill.position.set(4, -4, 4);
      scene.add(fill);
      var goldPt = new THREE.PointLight(0xd4af37, 0.8, 20);
      goldPt.position.set(0, 2, 5);
      scene.add(goldPt);

      // The card: thin box, real product photo on the front, silver back
      var group = new THREE.Group();
      scene.add(group);

      var loader = new THREE.TextureLoader();
      var frontTex = loader.load("1_tola_gold_card.png", function () { renderer.render(scene, camera); });
      var goldMat = new THREE.MeshStandardMaterial({ color: 0xb8862f, metalness: 0.85, roughness: 0.35 });
      var silverMat = new THREE.MeshStandardMaterial({ color: 0x8e959c, metalness: 0.9, roughness: 0.3 });
      var frontMat = new THREE.MeshStandardMaterial({ map: frontTex, metalness: 0.25, roughness: 0.5 });

      // 86×54 mm ratio, portrait
      var card = new THREE.Mesh(
        new THREE.BoxGeometry(2.4, 3.64, 0.09),
        [goldMat, goldMat, goldMat, goldMat, frontMat, silverMat]
      );
      group.add(card);

      // Gold dust particles
      var COUNT = 200;
      var pos = new Float32Array(COUNT * 3);
      var speeds = [];
      for (var i = 0; i < COUNT; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 10;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 9;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 4 - 1;
        speeds.push(0.002 + Math.random() * 0.006);
      }
      var pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      var pMat = new THREE.PointsMaterial({
        color: 0xd4af37, size: 0.045, transparent: true, opacity: 0.75,
        depthWrite: false
      });
      var dust = new THREE.Points(pGeo, pMat);
      scene.add(dust);

      // Mouse parallax
      var mx = 0, my = 0, tx = 0, ty = 0;
      window.addEventListener("mousemove", function (e) {
        tx = (e.clientX / window.innerWidth - 0.5) * 2;
        ty = (e.clientY / window.innerHeight - 0.5) * 2;
      }, { passive: true });

      var clock = new THREE.Clock();
      function animate() {
        requestAnimationFrame(animate);
        var t = clock.getElapsedTime();
        mx += (tx - mx) * 0.05;
        my += (ty - my) * 0.05;

        group.rotation.y = t * 0.45 + mx * 0.35;
        group.rotation.x = Math.sin(t * 0.5) * 0.06 + my * 0.2;
        group.position.y = Math.sin(t * 0.9) * 0.18;

        var arr = pGeo.attributes.position.array;
        for (var j = 0; j < COUNT; j++) {
          arr[j * 3 + 1] += speeds[j];
          arr[j * 3] += Math.sin(t + j) * 0.0008;
          if (arr[j * 3 + 1] > 4.6) arr[j * 3 + 1] = -4.6;
        }
        pGeo.attributes.position.needsUpdate = true;

        renderer.render(scene, camera);
      }
      resize();
      animate();
    }
  }

  /* ── Gallery filter ──────────────────────────────────── */
  var filterBtns = document.querySelectorAll(".filter-btn");
  var items = document.querySelectorAll(".gallery-item");
  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterBtns.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      var f = btn.dataset.filter;
      items.forEach(function (it) {
        var show = f === "all" || it.dataset.cat === f;
        it.classList.toggle("hidden", !show);
      });
      if (window.ScrollTrigger) ScrollTrigger.refresh();
    });
  });

  /* ── Contact form → WhatsApp ─────────────────────────── */
  var form = document.getElementById("inquiry-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var g = function (id) { return (form.querySelector("#" + id) || {}).value || "-"; };
      var msg =
        "Hello Royal Coin Cards, new inquiry:\n" +
        "Name: " + g("f-name") + "\n" +
        "Phone: " + g("f-phone") + "\n" +
        "City: " + g("f-city") + "\n" +
        "Business: " + g("f-business") + "\n" +
        "Card Type: " + g("f-type") + "\n" +
        "Quantity: " + g("f-qty") + "\n" +
        "Message: " + g("f-msg");
      window.open("https://wa.me/923092181689?text=" + encodeURIComponent(msg), "_blank");
    });
  }
})();
