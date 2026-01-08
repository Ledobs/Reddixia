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

    const getMermaidDiagramRoot = (node)=>{
      if(!node) return null;
      // Mermaid blocks are inside .diagram containers in this pack.
      return node.closest && node.closest(".diagram") ? node.closest(".diagram") : null;
    };

    const getSvg = (diagramEl)=>{
      if(!diagramEl) return null;
      return diagramEl.querySelector("svg");
    };

    const getScale = (diagramEl)=>{
      const v = diagramEl && diagramEl.dataset ? diagramEl.dataset.mmdScale : null;
      const n = parseFloat(v || "1");
      return Number.isFinite(n) && n > 0 ? n : 1;
    };

    const getTx = (diagramEl)=>{
      const v = diagramEl && diagramEl.dataset ? diagramEl.dataset.mmdTx : null;
      const n = parseFloat(v || "0");
      return Number.isFinite(n) ? n : 0;
    };

    const getTy = (diagramEl)=>{
      const v = diagramEl && diagramEl.dataset ? diagramEl.dataset.mmdTy : null;
      const n = parseFloat(v || "0");
      return Number.isFinite(n) ? n : 0;
    };

    const getBaseScale = (diagramEl)=>{
      // Use CSS custom property as a responsive, container-aware default.
      // Read from the diagram element first (so container queries can override),
      // then fall back to :root.
      try{
        const cs = getComputedStyle(diagramEl || document.documentElement);
        const raw = (cs.getPropertyValue("--diagram-scale") || "").trim();
        const n = parseFloat(raw);
        return Number.isFinite(n) && n > 0 ? n : 1;
      }catch(e){
        return 1;
      }
    };

    const applyTransform = (diagramEl, scale, tx = 0, ty = 0)=>{
      const svg = getSvg(diagramEl);
      if(!svg) return;
      const base = getBaseScale(diagramEl);
      const nextUser = Math.max(0.1, Math.min(6, scale));
      const nextFinal = Math.max(0.1, Math.min(6, nextUser * base));
      diagramEl.dataset.mmdScale = String(nextUser);
      diagramEl.dataset.mmdTx = String(Math.max(0, tx));
      diagramEl.dataset.mmdTy = String(Math.max(0, ty));
      svg.style.transformOrigin = "0 0";
      svg.style.transform = `translate(${Math.max(0, tx)}px, ${Math.max(0, ty)}px) scale(${nextFinal})`;
      // Allow zoom to exceed container width (CSS sets max-width:100%).
      svg.style.maxWidth = "none";
    };

    const applyScale = (diagramEl, scale)=>{
      applyTransform(diagramEl, scale, 0, 0);
    };

    const getSvgPixelSize = (svg)=>{
      if(!svg) return { w: 0, h: 0 };
      // We want the size as currently laid out in CSS pixels.
      // Temporarily remove transforms so measurements reflect the intrinsic render.
      const prev = svg.style.transform;
      try{
        svg.style.transform = "none";
        const r = svg.getBoundingClientRect();
        const w = Math.max(0, r.width || 0);
        const h = Math.max(0, r.height || 0);
        return { w, h };
      }catch(e){
        return { w: 0, h: 0 };
      }finally{
        svg.style.transform = prev;
      }
    };

    const resetZoom = (diagramEl)=>{
      if(!diagramEl || !diagramEl.dataset) return;
      const initScale = parseFloat(diagramEl.dataset.mmdInitScale || "");
      const initTx = parseFloat(diagramEl.dataset.mmdInitTx || "");
      const initTy = parseFloat(diagramEl.dataset.mmdInitTy || "");
      if(Number.isFinite(initScale) && initScale > 0){
        applyTransform(diagramEl, initScale, Number.isFinite(initTx) ? initTx : 0, Number.isFinite(initTy) ? initTy : 0);
      }else{
        applyTransform(diagramEl, 1, 0, 0);
      }
      try{ diagramEl.scrollLeft = 0; diagramEl.scrollTop = 0; }catch(e){}
    };

    const snapshotInitial = (diagramEl)=>{
      if(!diagramEl || !diagramEl.dataset) return;
      if(diagramEl.dataset.mmdInitScale) return;
      const s = getScale(diagramEl);
      const tx = getTx(diagramEl);
      const ty = getTy(diagramEl);
      diagramEl.dataset.mmdInitScale = String(s);
      diagramEl.dataset.mmdInitTx = String(tx);
      diagramEl.dataset.mmdInitTy = String(ty);
    };

    const fitToWidth = (diagramEl)=>{
      const svg = getSvg(diagramEl);
      if(!svg) return;
      const natural = getSvgPixelSize(svg);
      if(!natural.w) return;

      const cs = getComputedStyle(diagramEl);
      const padL = parseFloat(cs.paddingLeft || "0") || 0;
      const padR = parseFloat(cs.paddingRight || "0") || 0;
      // diagramEl includes padding + toolbar; keep a small margin.
      const available = Math.max(100, diagramEl.clientWidth - padL - padR - 12);
      applyTransform(diagramEl, available / natural.w, 0, 0);
      try{ diagramEl.scrollLeft = 0; diagramEl.scrollTop = 0; }catch(e){}
    };

    const fitToBox = (diagramEl)=>{
      const svg = getSvg(diagramEl);
      if(!svg) return;

      const natural = getSvgPixelSize(svg);
      if(!natural.w || !natural.h) return;

      const cs = getComputedStyle(diagramEl);
      const padL = parseFloat(cs.paddingLeft || "0") || 0;
      const padR = parseFloat(cs.paddingRight || "0") || 0;
      const padT = parseFloat(cs.paddingTop || "0") || 0;
      const padB = parseFloat(cs.paddingBottom || "0") || 0;

      const toolbar = diagramEl.querySelector(".toolbar");
      const toolbarH = toolbar ? Math.max(0, toolbar.getBoundingClientRect().height) : 0;

      const availableW = Math.max(100, diagramEl.clientWidth - padL - padR - 12);
      const availableH = Math.max(140, diagramEl.clientHeight - padT - padB - toolbarH - 12);

      const sW = availableW / natural.w;
      const sH = availableH / natural.h;
      const s = Math.min(sW, sH);

      const scaledW = natural.w * s;
      const scaledH = natural.h * s;
      const tx = Math.max(0, (availableW - scaledW) / 2);
      const ty = Math.max(0, (availableH - scaledH) / 2);
      applyTransform(diagramEl, s, tx, ty);
      try{ diagramEl.scrollLeft = 0; diagramEl.scrollTop = 0; }catch(e){}
    };

    const autoFitIfRequested = (diagramEl)=>{
      if(!diagramEl || !diagramEl.dataset) return false;
      if(diagramEl.dataset.mmdAutofit !== "1") return false;
      fitToBox(diagramEl);
      return true;
    };

    const ensureToolbar = (diagramEl)=>{
      if(!diagramEl) return;
      // Skip Cytoscape diagrams (they already have their own toolbar).
      if(diagramEl.querySelector(".cy")) return;
      if(diagramEl.querySelector(".toolbar[data-mmd-toolbar='1']")) return;

      const tb = document.createElement("div");
      tb.className = "toolbar";
      tb.dataset.mmdToolbar = "1";
      tb.innerHTML = [
        "<button class='btn' data-mmd-zoom='in'>+</button>",
        "<button class='btn' data-mmd-zoom='out'>−</button>",
        "<button class='btn' data-mmd-zoom='reset'>Réinitialiser</button>",
        "<button class='btn' data-mmd-zoom='fit'>Ajuster</button>"
      ].join("");
      diagramEl.insertBefore(tb, diagramEl.firstChild);

      const zoomIn = tb.querySelector("[data-mmd-zoom='in']");
      const zoomOut = tb.querySelector("[data-mmd-zoom='out']");
      const reset = tb.querySelector("[data-mmd-zoom='reset']");
      const fit = tb.querySelector("[data-mmd-zoom='fit']");

      if(zoomIn) zoomIn.addEventListener("click", ()=>applyTransform(diagramEl, getScale(diagramEl) * 1.2, getTx(diagramEl), getTy(diagramEl)));
      if(zoomOut) zoomOut.addEventListener("click", ()=>applyTransform(diagramEl, getScale(diagramEl) / 1.2, getTx(diagramEl), getTy(diagramEl)));
      if(reset) reset.addEventListener("click", ()=>resetZoom(diagramEl));
      if(fit) fit.addEventListener("click", ()=>fitToBox(diagramEl));
    };

    const ensureUniqueId = (el, preferred)=>{
      if(!el) return null;
      const base = String(preferred || "").trim() || "mmd";
      let candidate = base;
      let i = 2;
      // Ensure uniqueness across the whole document.
      while(true){
        const existing = document.getElementById(candidate);
        if(!existing || existing === el) break;
        candidate = `${base}-${i++}`;
      }
      el.id = candidate;
      return candidate;
    };

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

      const nodes = $$(".mermaid");
      if(!nodes.length) return;

      // Ensure all Mermaid nodes have unique ids so Mermaid doesn't reuse
      // autogenerated ones across runs.
      nodes.forEach((node, idx)=>{
        const rand = Math.random().toString(36).slice(2, 9);
        const preferred = node.id ? String(node.id).trim() : `mmd-auto-${idx}-${Date.now()}-${rand}`;
        ensureUniqueId(node, preferred);

        const diagramEl = getMermaidDiagramRoot(node);
        if(!diagramEl) return;
        diagramEl.classList.add("diagram--mmd");
        ensureToolbar(diagramEl);
      });

      // Render everything in one run (avoids id collisions) then fit each diagram.
      const p = mermaid.run({ nodes });
      if(p && typeof p.then === "function"){
        p.then(()=>{
          requestAnimationFrame(()=>{
            nodes.forEach(node=>{
              const diagramEl = getMermaidDiagramRoot(node);
              if(!diagramEl) return;
              if(!autoFitIfRequested(diagramEl)) fitToBox(diagramEl);
              snapshotInitial(diagramEl);
            });
          });
        }).catch((e)=>{
          console.warn("Mermaid render failed", e);
        });
      }
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