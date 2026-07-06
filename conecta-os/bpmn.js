/* CONECTA OS - renderer BPMN. Uso: renderBPMN(el, def)
   def = { lanes:[{id,label,color,interaction?}], nodes:[{id,lane,col,type,label:[],href?}], flows:[{f,t,label?,dashed?}] } */
(function(){
window.renderBPMN=function(el,def){
  var GUT=118, colW=def.colW||152, laneH=def.laneH||92, top=6;
  var lanes=def.lanes, nodes=def.nodes, flows=def.flows||[];
  var ncols=0; nodes.forEach(function(n){ if(n.col+1>ncols) ncols=n.col+1; });
  var loopN=0; flows.forEach(function(f){ if(f.loop) loopN++; });
  var W=GUT+ncols*colW+14, H=top+lanes.length*laneH+18+loopN*16+12;
  var li={}; lanes.forEach(function(l,i){ li[l.id]=i; });
  var nb={}; nodes.forEach(function(n){ nb[n.id]=n; });
  function CX(n){ return GUT+n.col*colW+colW/2; }
  function CY(n){ return top+li[n.lane]*laneH+laneH/2; }
  var PAL={orange:['#FEEFE3','#F6791F','#9A4A0F'],blue:['#EFE7FA','#7A44C6','#4A1090'],teal:['#E9F8F3','#17A97B','#0a6b52'],purple:['#F1E4FB','#5510A8','#5510A8'],yellow:['#FFF9E0','#E0A400','#8a6d00'],gray:['#F4F4F7','#8a8a95','#4b4b57']};
  function halfW(n){ return n.type==='gateway'?25:(n.type==='start'||n.type==='end'?15:(n.type==='doc'?52:58)); }
  function halfH(n){ return n.type==='gateway'?25:(n.type==='start'||n.type==='end'?15:(n.type==='doc'?24:27)); }
  var s='<svg viewBox="0 0 '+W+' '+H+'" xmlns="http://www.w3.org/2000/svg" font-family="Segoe UI,Arial" font-size="11">';
  s+='<defs><marker id="bpA" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#37485c"/></marker>';
  s+='<marker id="bpM" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#8a6d00"/></marker></defs>';
  lanes.forEach(function(l,i){
    var y=top+i*laneH, c=PAL[l.color||'gray'];
    s+='<rect x="0" y="'+y+'" width="'+W+'" height="'+laneH+'" fill="'+(i%2?'#fbfcfe':'#ffffff')+'" stroke="#dde4ee"/>';
    s+='<rect x="0" y="'+y+'" width="'+GUT+'" height="'+laneH+'" fill="'+c[0]+'" stroke="#dde4ee"/>';
    var lines=[],cur='';
    l.label.split(' ').forEach(function(w){ if((cur+' '+w).trim().length>14){lines.push(cur.trim());cur=w;}else cur+=' '+w; });
    if(cur.trim())lines.push(cur.trim());
    var ly=y+laneH/2-(lines.length-1)*7+4;
    lines.forEach(function(t,k){ s+='<text x="'+(GUT/2)+'" y="'+(ly+k*14)+'" text-anchor="middle" font-weight="700" fill="'+c[2]+'">'+t+'</text>'; });
    if(l.interaction){
      s+='<line x1="0" y1="'+(y+laneH)+'" x2="'+W+'" y2="'+(y+laneH)+'" stroke="#e0a400" stroke-width="2.5" stroke-dasharray="9 5"/>';
      s+='<text x="'+(W-10)+'" y="'+(y+laneH+13)+'" text-anchor="end" fill="#8a6d00" font-size="9.5" font-weight="700" letter-spacing="1">LÍNEA DE INTERACCIÓN CON EL CLIENTE</text>';
    }
  });
  var loopI=0;
  flows.forEach(function(f){
    var a=nb[f.f],b=nb[f.t];
    var x1=CX(a),y1=CY(a),x2=CX(b),y2=CY(b);
    var col=f.dashed?'#8a6d00':'#4b4b57', mk=f.dashed?'bpM':'bpA';
    var dash=f.dashed?' stroke-dasharray="5 4"':'';
    var p,lx,ly;
    if(f.loop){ loopI++;
      var ch=top+lanes.length*laneH+14+(loopI-1)*16;
      p='M'+x1+','+(y1+halfH(a))+' L'+x1+','+ch+' L'+x2+','+ch+' L'+x2+','+(y2+halfH(b));
      lx=(x1+x2)/2; ly=ch-4;
    } else if(a.lane===b.lane && x2>x1){
      p='M'+(x1+halfW(a))+','+y1+' L'+(x2-halfW(b))+','+y2; lx=(x1+halfW(a)+x2-halfW(b))/2; ly=y1-8;
    } else if(x1===x2){
      var sg=(y2>y1)?1:-1;
      p='M'+x1+','+(y1+sg*halfH(a))+' L'+x2+','+(y2-sg*halfH(b)); lx=x1+8; ly=(y1+y2)/2;
    } else if(x2>x1){
      var mx=x2-halfW(b)-16;
      p='M'+(x1+halfW(a))+','+y1+' L'+mx+','+y1+' L'+mx+','+y2+' L'+(x2-halfW(b))+','+y2;
      lx=mx; ly=(y1+y2)/2;
    } else {
      var sg2=(y2>y1)?1:-1;
      var my=y1+sg2*(laneH/2-6);
      p='M'+x1+','+(y1+sg2*halfH(a))+' L'+x1+','+my+' L'+x2+','+my+' L'+x2+','+(y2-sg2*halfH(b));
      lx=(x1+x2)/2; ly=my-4;
    }
    s+='<path d="'+p+'" fill="none" stroke="'+col+'" stroke-width="1.7"'+dash+' marker-end="url(#'+mk+')"/>';
    if(f.label){
      var tw=f.label.length*5.6+10;
      s+='<rect x="'+(lx-tw/2)+'" y="'+(ly-10)+'" width="'+tw+'" height="14" rx="3" fill="#ffffff" opacity="0.92"/>';
      s+='<text x="'+lx+'" y="'+(ly+1)+'" text-anchor="middle" fill="'+col+'" font-size="10" font-weight="600">'+f.label+'</text>';
    }
  });
  nodes.forEach(function(n){
    var x=CX(n),y=CY(n),c=PAL[lanes[li[n.lane]].color||'gray'],g='';
    if(n.type==='start') g='<circle cx="'+x+'" cy="'+y+'" r="15" fill="#eaf7f1" stroke="#1a9e6c" stroke-width="2.2"/>';
    else if(n.type==='end') g='<circle cx="'+x+'" cy="'+y+'" r="15" fill="#fdeeee" stroke="#d93838" stroke-width="3.2"/>';
    else if(n.type==='gateway') g='<path d="M'+x+','+(y-25)+' L'+(x+25)+','+y+' L'+x+','+(y+25)+' L'+(x-25)+','+y+' z" fill="#fff9e0" stroke="#e0a400" stroke-width="2"/><text x="'+x+'" y="'+(y+5)+'" text-anchor="middle" font-weight="700" fill="#8a6d00" font-size="15">×</text>';
    else if(n.type==='doc') g='<path d="M'+(x-52)+','+(y-22)+' h104 v36 q-26,11 -52,0 q-26,11 -52,0 z" fill="#fff4ec" stroke="#ff7a29" stroke-width="1.7"/>';
    else g='<rect x="'+(x-58)+'" y="'+(y-27)+'" width="116" height="54" rx="9" fill="'+c[0]+'" stroke="'+c[1]+'" stroke-width="1.9"/>';
    var lbl=n.label||[]; var inside=(n.type==='task'||n.type==='doc');
    var ty= inside ? (y-(lbl.length-1)*6+4) : (n.type==='gateway'? y+38 : y+30);
    var tc= (n.type==='doc')?'#b34700':(inside?c[2]:'#4b4b57');
    lbl.forEach(function(t,k){ g+='<text x="'+x+'" y="'+(ty+k*12.5)+'" text-anchor="middle" fill="'+tc+'" font-size="'+(inside?10.5:10)+'" font-weight="'+(k===0?'700':'400')+'">'+t+'</text>'; });
    if(n.href) g='<a href="'+n.href+'">'+g+'</a>';
    s+=g;
  });
  s+='</svg>';
  el.innerHTML=s+(def.caption?'<div class="caption">'+def.caption+'</div>':'');
};
document.addEventListener('DOMContentLoaded',function(){
  document.querySelectorAll('script[type="application/bpmn+json"]').forEach(function(sc){
    var host=document.getElementById(sc.dataset.target);
    if(host){ try{ renderBPMN(host, JSON.parse(sc.textContent)); }catch(e){ host.innerHTML='<p style="color:#d93838">Error en diagrama: '+e.message+'</p>'; } }
  });
});
})();
