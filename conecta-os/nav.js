/* CONECTA OS — navegación + progreso de aprendizaje */
(function(){
  var NAV = [
    {title:"Conecta OS", items:[
      ["index.html","Inicio","domain"],
      ["mapa.html","Mapa de Procesos (interactivo)","domain"],
      ["blueprint.html","Service Blueprint","domain"],
      ["experiencia.html","Estándar de Experiencia","domain"],
      ["quiz.html","🎮 Reto Conecta (quiz)","domain"],
      ["ayuda.html","Cómo usar este sitio","domain"]
    ]},
    {title:"Dominio Comercial · CM", items:[
      ["comercial.html","Visión del dominio","domain"],
      ["cm-p01.html","CM.P01 · Onboarding de Fabricante","proc"],
      ["cm-p02.html","CM.P02 · Prospección Outbound","proc"],
      ["cm-p03.html","CM.P03 · Gestión de Pipeline","proc"],
      ["cm-p04.html","CM.P04 · Renovaciones","proc"],
      ["cm-p05.html","CM.P05 · Metodología de Ventas","proc"]
    ]},
    {title:"Dominio Marketing · MK", items:[
      ["marketing.html","Visión del dominio","domain"],
      ["mk-p01.html","MK.P01 · Contenido y PR","proc"],
      ["mk-p02.html","MK.P02 · Campañas por Línea","proc"]
    ]},
    {title:"Dominio Delivery · DL", items:[
      ["delivery.html","Visión + equipos por fabricante","domain"],
      ["dl-p01.html","DL.P01 · Preventa Técnica","proc"],
      ["dl-p02.html","DL.P02 · Handoff Ventas → Delivery","proc"],
      ["dl-p03.html","DL.P03 · Implementación y Entrega","proc"],
      ["dl-p04.html","DL.P04 · Soporte Post-Venta","proc"],
      ["dl-p05.html","DL.P05 · Certificación de Ingenieros","proc"]
    ]},
    {title:"Dominio Operaciones · OP", items:[
      ["operaciones.html","Visión del dominio","domain"],
      ["op-p01.html","OP.P01 · RRHH Comercial (Admón.)","proc"]
    ]},
    {title:"Dominio Finanzas · FI", items:[
      ["finanzas.html","Visión del dominio","domain"],
      ["fi-p01.html","FI.P01 · Gestión Financiera Comercial","proc"]
    ]},
    {title:"Gobierno · GO", items:[
      ["gobierno.html","Modelo de gobierno","domain"],
      ["organigrama.html","Organigrama","proc"],
      ["posiciones.html","Posiciones y KPIs","proc"],
      ["handoffs.html","Matriz de Handoffs","proc"],
      ["metricas.html","Dashboard de Negocio","proc"],
      ["capacidad.html","Capacidad Operativa (WIP)","proc"]
    ]},
    {title:"Plantillas", items:[
      ["plantillas.html","Índice de plantillas","domain"],
      ["pl-cm.html","Plantillas Comerciales","proc"],
      ["pl-mk.html","Plantillas Marketing","proc"],
      ["pl-dl.html","Plantillas Delivery","proc"],
      ["pl-op.html","Plantillas Operaciones","proc"],
      ["pl-fi.html","Plantillas Finanzas","proc"],
      ["pl-cx.html","Comunicación con Clientes (C01-C10)","proc"]
    ]},
    {title:"Implementación", items:[
      ["plan.html","Plan de Implementación 2026","domain"]
    ]}
  ];
  var here = location.pathname.split("/").pop() || "index.html";
  var el = document.getElementById("sidebar");
  if(!el) return;

  // progreso de aprendizaje (localStorage)
  var KEY="cos-visited", seen=[];
  try{ seen=JSON.parse(localStorage.getItem(KEY)||"[]"); }catch(e){}
  if(seen.indexOf(here)<0){ seen.push(here); try{ localStorage.setItem(KEY,JSON.stringify(seen)); }catch(e){} }
  var all=[]; NAV.forEach(function(g){ g.items.forEach(function(it){ all.push(it[0]); }); });
  var count=all.filter(function(p){ return seen.indexOf(p)>=0; }).length;
  var pct=Math.round(100*count/all.length);
  var trophy = pct>=100 ? " 🏆" : (pct>=60 ? " 🔥" : (pct>=30 ? " 🚀" : ""));

  var h='<div class="progress-wrap"><div class="progress-label"><span>Tu avance en el OS'+trophy+'</span><span>'+pct+'%</span></div><div class="progress-bar"><i style="width:'+pct+'%"></i></div></div>';
  NAV.forEach(function(g){
    h += '<div class="navgroup"><span class="navtitle">'+g.title+'</span>';
    g.items.forEach(function(it){
      var cls = it[2] + (it[0]===here ? " current" : "");
      var check = (seen.indexOf(it[0])>=0 && it[0]!==here) ? '<span class="seen">✓</span>' : '';
      h += '<a class="'+cls+'" href="'+it[0]+'">'+it[1]+check+'</a>';
    });
    h += '</div>';
  });
  el.innerHTML = h;
})();
