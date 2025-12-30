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

        // Cytoscape needs an explicit resize/fit when its container becomes visible
        // (tab switch), otherwise nodes can appear stacked.
        const cyEls = $$(".cy", group);
        if(cyEls.length){
          requestAnimationFrame(()=>{
            cyEls.forEach(cyEl=>{
              const cy = cyEl._cy;
              if(!cy) return;
              try{ cy.resize(); }catch(e){}
              try{ cy.fit(20); }catch(e){}
            });
          });
        }
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

    const buildDomainStarLayout = (elements)=>{
      if(!elements || Array.isArray(elements) || !elements.nodes) return elements;

      const hubId = "IDEXIOS-HUB";
      const packOrder = ["CommsOps", "DeliveryOps", "FinanceOps", "GovernanceOps", "PortfolioOps", "ProcurementOps"];

      const nodes = (elements.nodes || []).map(n=>({ ...n }));
      const edges = (elements.edges || []).map(e=>({ ...e }));

      const nodesById = new Map();
      nodes.forEach(n=>{ if(n && n.data && n.data.id) nodesById.set(n.data.id, n); });

      const packs = nodes.filter(n=>n.data && n.data.type === "pack").map(n=>n.data.id);
      const systems = nodes.filter(n=>n.data && n.data.type === "system").map(n=>n.data.id);
      const agents = nodes.filter(n=>n.data && n.data.type === "agent").map(n=>n.data.id);

      const transversalPackId = packs.find(p=>p.toLowerCase().includes("transversal")) || null;

      const domainPacks = [];
      packOrder.forEach(p=>{ if(packs.includes(p)) domainPacks.push(p); });
      packs
        .filter(p=>p !== transversalPackId && !domainPacks.includes(p))
        .sort()
        .forEach(p=>domainPacks.push(p));

      // Build pack -> agents relation from edges (pack contains agent)
      const packToAgents = new Map();
      domainPacks.concat(transversalPackId ? [transversalPackId] : []).forEach(p=>packToAgents.set(p, []));
      edges.forEach(e=>{
        const d = e && e.data;
        if(!d || !d.source || !d.target) return;
        const src = d.source;
        const tgt = d.target;
        if(!packs.includes(src)) return;
        if(!agents.includes(tgt)) return;
        const arr = packToAgents.get(src);
        if(arr) arr.push(tgt);
      });
      for(const [p, list] of packToAgents.entries()){
        list.sort();
      }

      // Coordinates
      const center = { x: 0, y: 0 };
      const packRadius = 360;
      const agentOrbit = 140;
      const systemRadius = 620;

      const setPos = (id, x, y)=>{
        const n = nodesById.get(id);
        if(!n) return;
        n.position = { x, y };
      };

      // Hub centered
      setPos(hubId, center.x, center.y);

      // Optional: transversal pack close to hub
      if(transversalPackId){
        setPos(transversalPackId, center.x - 210, center.y);
      }

      // Packs on a ring
      const nP = Math.max(domainPacks.length, 1);
      domainPacks.forEach((packId, idx)=>{
        const a = (Math.PI * 2 * idx) / nP - Math.PI / 2;
        const x = center.x + packRadius * Math.cos(a);
        const y = center.y + packRadius * Math.sin(a);
        setPos(packId, x, y);

        // Agents orbit their pack
        const members = packToAgents.get(packId) || [];
        const m = Math.max(members.length, 1);
        members.forEach((agentId, j)=>{
          // Local orbit, slightly randomized angle offset per pack to reduce overlaps
          const aa = (Math.PI * 2 * j) / m + a * 0.35;
          setPos(agentId, x + agentOrbit * Math.cos(aa), y + agentOrbit * Math.sin(aa));
        });
      });

      // Any agent not positioned yet (excluding hub) gets a small inner ring
      const unplacedAgents = agents.filter(a=>a !== hubId).filter(a=>{
        const n = nodesById.get(a);
        return n && !n.position;
      });
      if(unplacedAgents.length){
        unplacedAgents.forEach((agentId, idx)=>{
          const a = (Math.PI * 2 * idx) / unplacedAgents.length;
          setPos(agentId, center.x + 160 * Math.cos(a), center.y + 160 * Math.sin(a));
        });
      }

      // Systems on an outer ring (bottom half bias)
      const nS = Math.max(systems.length, 1);
      systems
        .slice()
        .sort()
        .forEach((sysId, idx)=>{
          const a = (Math.PI * 2 * idx) / nS + Math.PI / 2;
          setPos(sysId, center.x + systemRadius * Math.cos(a), center.y + systemRadius * Math.sin(a));
        });

      // Fallback: any remaining nodes get spread on a medium ring
      const leftovers = nodes.filter(n=>n.data && n.data.id).filter(n=>!n.position);
      if(leftovers.length){
        leftovers.forEach((n, idx)=>{
          const a = (Math.PI * 2 * idx) / leftovers.length;
          n.position = { x: center.x + 480 * Math.cos(a), y: center.y + 480 * Math.sin(a) };
        });
      }

      return { nodes, edges };
    };

    $$(".cy").forEach(el=>{
      const dataId = el.dataset.cyData;
      const dataEl = dataId ? document.getElementById(dataId) : null;
      if(!dataEl) return;
      let data = null;
      try{ data = JSON.parse(dataEl.textContent); }catch(e){ console.warn("Bad cy JSON", e); return; }

      const isDomainGraph = dataId === "cy-domain-data";
      let elements = data.elements || data;
      if(isDomainGraph){
        elements = buildDomainStarLayout(elements);
      }

      const cy = cytoscape({
        container: el,
        elements,
        layout: isDomainGraph
          ? { name: "preset", fit: true, padding: 40 }
          : { name: "cose", animate: true, fit: true, padding: 20 },
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

      // Keep a handle for tab-resize logic
      el._cy = cy;

      // Ensure correct first render size (esp. when inside tabs)
      requestAnimationFrame(()=>{
        try{ cy.resize(); }catch(e){}
        try{ cy.fit(20); }catch(e){}
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