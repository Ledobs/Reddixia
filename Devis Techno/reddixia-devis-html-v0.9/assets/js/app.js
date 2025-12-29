(function(){
  const $ = (sel, root=document)=>root.querySelector(sel);
  const $$ = (sel, root=document)=>Array.from(root.querySelectorAll(sel));

  function setNavValue(){
    const sel = $("#navSelect");
    if(!sel) return;
    const current = location.pathname.split("/").pop() || "index.html";
    const opt = Array.from(sel.options).find(o => o.value === current);
    if(opt) sel.value = current;
    sel.addEventListener("change", ()=>{ if(sel.value) location.href = sel.value; });
  }

  function initTabs(){
    $$("[data-tab-group]").forEach(group=>{
      const tabs = $$("[role=tab]", group);
      const panes = $$("[data-pane]", group);
      const activate = (name)=>{
        tabs.forEach(t=>t.setAttribute("aria-selected", t.dataset.tab === name ? "true" : "false"));
        panes.forEach(p=>p.classList.toggle("active", p.dataset.pane === name));
      };
      tabs.forEach(t=>t.addEventListener("click", ()=>activate(t.dataset.tab)));
      if(tabs.length) activate(tabs[0].dataset.tab);
    });
  }

  function makeDraggable(el, handle){
    const h = handle || el;
    let sx=0, sy=0, ox=0, oy=0, dragging=false;
    const onDown=(e)=>{
      dragging=true;
      const r=el.getBoundingClientRect();
      sx=e.clientX; sy=e.clientY; ox=r.left; oy=r.top;
      el.style.right="auto";
      el.style.bottom="auto";
      el.style.left = ox + "px";
      el.style.top = oy + "px";
      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onUp);
    };
    const onMove=(e)=>{
      if(!dragging) return;
      const dx=e.clientX-sx, dy=e.clientY-sy;
      el.style.left = (ox+dx) + "px";
      el.style.top = (oy+dy) + "px";
    };
    const onUp=()=>{
      dragging=false;
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
    h.addEventListener("mousedown", onDown);
  }

  function initFloating(){
    $$("[data-floating-target]").forEach(btn=>{
      btn.addEventListener("click", ()=>{
        const id = btn.dataset.floatingTarget;
        const panel = document.getElementById(id);
        if(!panel) return;
        panel.classList.toggle("active");
      });
    });
    $$(".floating").forEach(p=>{
      makeDraggable(p, $(".head", p));
      const closeBtn = $(".js-close", p);
      if(closeBtn) closeBtn.addEventListener("click", ()=>p.classList.remove("active"));
    });
  }

  function initMermaid(){
    if(!window.mermaid) return;
    try{
      mermaid.initialize({
        startOnLoad:false,
        theme:"dark",
        securityLevel:"loose",
        themeVariables:{
          primaryColor:"#101b35",
          primaryTextColor:"#e9eefc",
          primaryBorderColor:"#27355f",
          lineColor:"#93a3cf",
          secondaryColor:"#0f1830",
          tertiaryColor:"#0c1223",
          fontFamily:"ui-sans-serif, system-ui"
        }
      });
      mermaid.run({ querySelector: ".mermaid" });
    }catch(e){
      console.warn("Mermaid init failed", e);
    }
  }

  function initCytoscape(){
    if(!window.cytoscape) return;
    $$(".cy").forEach(el=>{
      const dataId = el.dataset.cyData;
      const dataEl = dataId ? document.getElementById(dataId) : null;
      if(!dataEl) return;
      let data = null;
      try{ data = JSON.parse(dataEl.textContent); }catch(e){ console.warn("Bad cy JSON", e); return; }

      const cy = cytoscape({
        container: el,
        elements: data.elements || data,
        layout: { name: "cose", animate: true, fit: true, padding: 20 },
        style: [
          {
            selector: "node",
            style: {
              "background-color": "#101b35",
              "border-color": "#5aa9ff",
              "border-width": 1,
              "shape": "round-rectangle",
              "label": "data(label)",
              "color": "#e9eefc",
              "text-wrap": "wrap",
              "text-max-width": 130,
              "text-valign": "center",
              "text-halign": "center",
              "font-size": 10,
              "padding": "10px",
              "width": "label",
              "height": "label"
            }
          },
          {
            selector: "node[type='pack']",
            style: {
              "border-color":"#9b7dff",
              "background-color":"#0f1830"
            }
          },
          {
            selector: "node[type='agent']",
            style: { "border-color":"#5aa9ff" }
          },
          {
            selector: "node[type='system']",
            style: { "border-color":"#2dd4bf" }
          },
          {
            selector: "edge",
            style: {
              "line-color": "#93a3cf",
              "curve-style": "bezier",
              "target-arrow-shape": "triangle",
              "target-arrow-color": "#93a3cf",
              "width": 1,
              "label": "data(label)",
              "font-size": 9,
              "color": "#b9c4e4",
              "text-background-opacity": 0.7,
              "text-background-color": "#0c1223",
              "text-background-padding": 2
            }
          }
        ]
      });

      const zoomIn = el.parentElement.querySelector("[data-cy-zoom='in']");
      const zoomOut = el.parentElement.querySelector("[data-cy-zoom='out']");
      const fit = el.parentElement.querySelector("[data-cy-zoom='fit']");
      if(zoomIn) zoomIn.addEventListener("click", ()=>cy.zoom({ level: cy.zoom()*1.2, renderedPosition: {x: el.clientWidth/2, y: el.clientHeight/2} }));
      if(zoomOut) zoomOut.addEventListener("click", ()=>cy.zoom({ level: cy.zoom()/1.2, renderedPosition: {x: el.clientWidth/2, y: el.clientHeight/2} }));
      if(fit) fit.addEventListener("click", ()=>cy.fit(20));
    });
  }

  function init(){
    setNavValue();
    initTabs();
    initFloating();
    initMermaid();
    initCytoscape();
  }

  window.addEventListener("DOMContentLoaded", init);
})();