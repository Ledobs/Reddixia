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

      // Goal: isolate each domain "star" so the diagram reads as a constellation.
      // Main source of clutter is global transversal systems with many cross-domain edges.
      // Solution: duplicate transversal systems per domain pack so usage edges stay local.

      const hubId = "IDEXIOS-HUB";
      const packOrder = ["CommsOps", "DeliveryOps", "FinanceOps", "GovernanceOps", "PortfolioOps", "ProcurementOps"];

      const nodesIn = (elements.nodes || []).map(n=>({ ...n, data: { ...(n.data || {}) } }));
      const edgesIn = (elements.edges || []).map(e=>({ ...e, data: { ...(e.data || {}) } }));

      const packs = nodesIn.filter(n=>n.data && n.data.type === "pack").map(n=>n.data.id);
      const systemsGlobal = nodesIn.filter(n=>n.data && n.data.type === "system").map(n=>n.data.id);
      const agents = nodesIn.filter(n=>n.data && n.data.type === "agent").map(n=>n.data.id);

      const transversalPackId = packs.find(p=>String(p).toLowerCase().includes("transversal")) || null;

      const domainPacks = [];
      packOrder.forEach(p=>{ if(packs.includes(p)) domainPacks.push(p); });
      packs
        .filter(p=>p !== transversalPackId && !domainPacks.includes(p))
        .sort()
        .forEach(p=>domainPacks.push(p));

      // Build pack -> agents relation from edges (pack contains agent)
      const packToAgents = new Map();
      const allPacksForMembership = domainPacks.concat(transversalPackId ? [transversalPackId] : []);
      allPacksForMembership.forEach(p=>packToAgents.set(p, []));
      edgesIn.forEach(e=>{
        const d = e && e.data;
        if(!d || !d.source || !d.target) return;
        if(!packs.includes(d.source)) return;
        if(!agents.includes(d.target)) return;
        const arr = packToAgents.get(d.source);
        if(arr) arr.push(d.target);
      });
      for(const [p, list] of packToAgents.entries()) list.sort();

      const agentToPack = new Map();
      for(const [p, list] of packToAgents.entries()){
        list.forEach(a=>{ if(!agentToPack.has(a)) agentToPack.set(a, p); });
      }

      const sysShortLabel = (sysId, originalLabel)=>{
        switch(sysId){
          case "Dataverse": return "Dataverse";
          case "SharePoint": return "SharePoint";
          case "PowerPages": return "Power Pages";
          case "PowerAutomate": return "Automate";
          case "CopilotStudio": return "Copilot";
          case "MCP": return "MCP";
          default: return originalLabel || sysId;
        }
      };

      const newNodes = [];
      const newEdges = [];

      const byIdIn = new Map();
      nodesIn.forEach(n=>{ if(n && n.data && n.data.id) byIdIn.set(n.data.id, n); });

      // Keep all non-system nodes (packs + agents)
      nodesIn.forEach(n=>{
        if(!n || !n.data || !n.data.id) return;
        if(n.data.type === "system") return;
        newNodes.push(n);
      });

      const packToSystems = new Map();
      domainPacks.forEach(p=>packToSystems.set(p, []));

      const sysCopyId = (packId, sysId)=>`${packId}::${sysId}`;
      const ensureSysCopy = (packId, sysId)=>{
        const id = sysCopyId(packId, sysId);
        if(newNodes.some(n=>n.data && n.data.id === id)) return id;
        const original = byIdIn.get(sysId);
        const label = sysShortLabel(sysId, original && original.data ? original.data.label : sysId);
        newNodes.push({
          data: {
            id,
            label,
            type: "system",
            baseId: sysId,
            pack: packId
          }
        });
        const arr = packToSystems.get(packId);
        if(arr && !arr.includes(id)) arr.push(id);
        return id;
      };

      // Rewrite edges:
      // - Keep hub->pack orchestration edges
      // - Keep pack->agent containment edges
      // - Rewrite agent->system usage edges to local (pack-specific) system copies
      // - Drop hub->system edges and global system nodes (source of clutter)
      edgesIn.forEach(e=>{
        const d = e && e.data;
        if(!d || !d.source || !d.target) return;

        const src = d.source;
        const tgt = d.target;

        const srcIsAgent = agents.includes(src);
        const tgtIsSystem = systemsGlobal.includes(tgt);

        // pack contains agent
        if(packs.includes(src) && agents.includes(tgt)){
          newEdges.push(e);
          return;
        }

        // hub orchestration to packs
        if(src === hubId && packs.includes(tgt)){
          newEdges.push(e);
          return;
        }

        // agent uses system (rewrite to local system copy)
        if(srcIsAgent && tgtIsSystem){
          const packId = agentToPack.get(src);
          if(!packId || !domainPacks.includes(packId)) return;
          const localSysId = ensureSysCopy(packId, tgt);
          newEdges.push({
            data: {
              id: `e_use_${src}_${localSysId}`,
              source: src,
              target: localSysId,
              // Preserve semantics (read / read-write / publier)
              label: (d.label || "")
            }
          });
          return;
        }

        // Everything else (hub->system, system-related edges) is omitted in this "Domaines" view
      });

      // Add per-domain invisible bridge nodes to draw dashed "mini-paths"
      // from each domain's local transversal systems to the central transversal box.
      const packToBridge = new Map();
      domainPacks.forEach(packId=>{
        const sysIds = packToSystems.get(packId) || [];
        if(!sysIds.length) return;
        const bridgeId = `${packId}::bridge`;
        packToBridge.set(packId, bridgeId);
        newNodes.push({
          data: {
            id: bridgeId,
            label: "",
            type: "bridge",
            pack: packId
          }
        });
      });

      // Coordinates: larger radii + per-pack local system arc (outward)
      const center = { x: 0, y: 0 };
      const packRadius = 720;
      const agentOrbit = 240;
      const systemOrbit = 420;
      const bridgeRadius = 360;

      const nodesById = new Map();
      newNodes.forEach(n=>{ if(n && n.data && n.data.id) nodesById.set(n.data.id, n); });
      const setPos = (id, x, y)=>{
        const n = nodesById.get(id);
        if(!n) return;
        n.position = { x, y };
      };

      setPos(hubId, center.x, center.y);
      if(transversalPackId){
        setPos(transversalPackId, center.x - 360, center.y);
      }

      const packAngle = new Map();
      const nP = Math.max(domainPacks.length, 1);
      domainPacks.forEach((packId, idx)=>{
        const a = (Math.PI * 2 * idx) / nP - Math.PI / 2;
        packAngle.set(packId, a);
        const x = center.x + packRadius * Math.cos(a);
        const y = center.y + packRadius * Math.sin(a);
        setPos(packId, x, y);

        const bridgeId = packToBridge.get(packId);
        if(bridgeId){
          setPos(bridgeId, center.x + bridgeRadius * Math.cos(a), center.y + bridgeRadius * Math.sin(a));
        }

        // Agents orbit pack (slight inward bias to keep systems clearly outside)
        const members = packToAgents.get(packId) || [];
        const m = Math.max(members.length, 1);
        members.forEach((agentId, j)=>{
          const aa = (Math.PI * 2 * j) / m + a * 0.25;
          setPos(agentId, x + agentOrbit * Math.cos(aa), y + agentOrbit * Math.sin(aa));
        });

        // Systems placed on an outward arc, away from center, to look like a "star" per domain
        const sysIds = (packToSystems.get(packId) || []).slice().sort();
        const s = sysIds.length;
        if(s){
          const outward = a; // direction from center to pack
          const spread = Math.min(1.1, 0.35 * s); // radians
          sysIds.forEach((sid, k)=>{
            const t = s === 1 ? 0 : (k / (s - 1) - 0.5);
            const sa = outward + t * spread;
            setPos(sid, x + systemOrbit * Math.cos(sa), y + systemOrbit * Math.sin(sa));
          });
        }
      });

      // Dashed mini-path edges:
      // systemCopy -> bridge (per system), then bridge -> Transversal pack (one per domain).
      const targetId = transversalPackId || hubId;
      domainPacks.forEach(packId=>{
        const bridgeId = packToBridge.get(packId);
        if(!bridgeId) return;

        const sysIds = packToSystems.get(packId) || [];
        sysIds.forEach(sid=>{
          newEdges.push({
            data: {
              id: `e_bridge_${sid}_${bridgeId}`,
              source: sid,
              target: bridgeId,
              label: "",
              kind: "bridge"
            }
          });
        });

        newEdges.push({
          data: {
            id: `e_bridge_${bridgeId}_${targetId}`,
            source: bridgeId,
            target: targetId,
            label: "",
            kind: "bridge"
          }
        });
      });

      // Any agent not positioned yet (excluding hub) gets a small inner ring
      const unplacedAgents = agents
        .filter(a=>a !== hubId)
        .filter(a=>{
          const n = nodesById.get(a);
          return n && !n.position;
        });
      if(unplacedAgents.length){
        unplacedAgents.forEach((agentId, idx)=>{
          const a = (Math.PI * 2 * idx) / unplacedAgents.length;
          setPos(agentId, center.x + 220 * Math.cos(a), center.y + 220 * Math.sin(a));
        });
      }

      // Fallback: remaining nodes on a medium ring
      const leftovers = newNodes.filter(n=>n.data && n.data.id).filter(n=>!n.position);
      if(leftovers.length){
        leftovers.forEach((n, idx)=>{
          const a = (Math.PI * 2 * idx) / leftovers.length;
          n.position = { x: center.x + 560 * Math.cos(a), y: center.y + 560 * Math.sin(a) };
        });
      }

      return { nodes: newNodes, edges: newEdges };
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
            selector: "node[type='bridge']",
            style: {
              "background-opacity": 0,
              "border-width": 0,
              "width": 1,
              "height": 1,
              "label": ""
            }
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
          },
          {
            selector: "edge[kind='bridge']",
            style: {
              "line-style": "dashed",
              "curve-style": "straight",
              "target-arrow-shape": "none",
              "opacity": 0.55,
              "label": ""
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