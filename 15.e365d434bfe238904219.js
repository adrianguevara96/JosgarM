(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{YVVH:function(l,n,u){"use strict";u.r(n),u.d(n,"OrdenescargasModuleNgFactory",(function(){return E}));var a=u("CcnG"),e=function(){return function(){}}(),t=u("pMnS"),o=u("eajB"),s=u("lqqz"),c=u("NJnL"),i=u("zh/F"),r=u("eG2b"),b=u("Ip0R"),d=u("r00z"),p=u("uZId"),h=function(){function l(l,n){this.modalService=l,this.pru=n,this.facturas=[{id:"",nro:"1",bultos:3,valor:7e6,RIF:"78459652",RazonSocial:"Facturas, Inc.",Estado:"Lara",Ciudad:"Barquisimeto",Dir:"Calle por aqui, esquina por alla",fecha:"05/02/20 09:45:10",nrorelaciondespacho:1,status:!0},{id:"",nro:"2",bultos:2,valor:85e5,RIF:"78459602",RazonSocial:"Facturas II, Inc.",Estado:"Lara",Ciudad:"Carora",Dir:"Calle por aqui, esquina por alla",fecha:"05/02/20 09:47:40",nrorelaciondespacho:1,status:!0},{id:"",nro:"5",bultos:7,valor:889e4,RIF:"78459602",RazonSocial:"Toyota C.A.",Estado:"",Ciudad:"",Dir:"Calle por aqui y alla",fecha:"07/03/20 13:18:20",nrorelaciondespacho:5,status:!0},{id:"",nro:"7",bultos:300,valor:457894521,RIF:"78457502",RazonSocial:"Preca Inc.",Estado:"",Ciudad:"",Dir:"Calle por aqui",fecha:"15/03/20 15:01:25",nrorelaciondespacho:8,status:!0},{id:"",nro:"9",bultos:20,valor:85e7,RIF:"78459382",RazonSocial:"Facturas VI, Inc.",Estado:"",Ciudad:"",Dir:"Esquina por alla",fecha:"18/04/20 16:18:40",nrorelaciondespacho:15,status:!0}],this.facturastosee=[],this.facturastoedit=[],this.relacionesDespacho=[{nro:"1",fecha:"05/02/20",hora:"09:50:10",status:"Aceptado"},{nro:"5",fecha:"07/03/20",hora:"13:20:20",status:"Cancelado"},{nro:"8",fecha:"15/03/20",hora:"15:03:25",status:"Pendiente"},{nro:15,fecha:"18/04/20",hora:"16:20:40",status:"Pendiente"}],this.tipoU=this.pru.gettipoU()}return l.prototype.newRelacionDespacho=function(l){var n=this,u=this.modalService.open(d.a,{size:"xl"});u.componentInstance.accion=l,u.componentInstance.tipoU=this.tipoU,console.log("Modal result?: ",u.result),u.result.then((function(l){if(console.log("Que me trae result al cerrar modal crear? ",l),l){var u=l;console.log("Que me trae data? :",u),n.relacionesDespacho.push({id:16,fecha:u[0].fecha,status:"Pendiente"})}}),(function(l){console.log("Reason? :",l)}))},l.prototype.openModal=function(l,n){if("edit"==l){this.facturastoedit=[];for(var u=0;u<this.facturas.length;u++)this.facturas[u].nrorelaciondespacho==n&&this.facturastoedit.push(this.facturas[u]);(a=this.modalService.open(d.a,{size:"xl"})).componentInstance.relacionDespacho=this.facturastoedit,a.componentInstance.accion=l,a.componentInstance.tipoU=this.tipoU}else if("see"==l){for(this.facturastosee=[],u=0;u<this.facturas.length;u++)this.facturas[u].nrorelaciondespacho==n&&this.facturastosee.push(this.facturas[u]);var a;(a=this.modalService.open(d.a,{size:"xl"})).componentInstance.relacionDespacho=this.facturastosee,a.componentInstance.accion=l,a.componentInstance.tipoU=this.tipoU}},l}(),f=u("4GxJ"),g=a.yb({encapsulation:0,styles:[[""]],data:{}});function m(l){return a.cc(0,[(l()(),a.Ab(0,16777216,null,null,4,"button",[["class","btn btn-sm btn-pill"],["placement","left"],["style","border-radius:60px"],["tooltip","Ver detalles"]],null,[[null,"click"]],(function(l,n,u){var a=!0;return"click"===n&&(a=!1!==l.component.openModal("see",l.parent.context.$implicit.nro)&&a),a}),null,null)),a.zb(1,212992,null,0,o.c,[a.S,s.a,o.a,a.m,a.H,c.a],{tooltip:[0,"tooltip"],placement:[1,"placement"]},null),(l()(),a.Ab(2,0,null,null,2,"svg-icon",[["src","assets/eye2.svg"]],null,null,null,i.b,i.a)),a.zb(3,1032192,null,0,r.e,[a.m,a.w,a.H,r.f,a.h],{src:[0,"src"],svgStyle:[1,"svgStyle"]},null),a.Sb(4,{"height.px":0,"width.px":1}),(l()(),a.jb(0,null,null,0))],(function(l,n){l(n,1,0,"Ver detalles","left");var u=l(n,4,0,25,25);l(n,3,0,"assets/eye2.svg",u)}),null)}function A(l){return a.cc(0,[(l()(),a.Ab(0,16777216,null,null,4,"button",[["class","btn btn-sm btn-pill"],["placement","right"],["style","border-radius:60px"],["tooltip","Modificar"]],null,[[null,"click"]],(function(l,n,u){var a=!0;return"click"===n&&(a=!1!==l.component.openModal("edit",l.parent.context.$implicit.nro)&&a),a}),null,null)),a.zb(1,212992,null,0,o.c,[a.S,s.a,o.a,a.m,a.H,c.a],{tooltip:[0,"tooltip"],placement:[1,"placement"]},null),(l()(),a.Ab(2,0,null,null,2,"svg-icon",[["src","assets/editarorden2.svg"]],null,null,null,i.b,i.a)),a.zb(3,1032192,null,0,r.e,[a.m,a.w,a.H,r.f,a.h],{src:[0,"src"],svgStyle:[1,"svgStyle"]},null),a.Sb(4,{"height.px":0,"width.px":1}),(l()(),a.jb(0,null,null,0))],(function(l,n){l(n,1,0,"Modificar","right");var u=l(n,4,0,25,25);l(n,3,0,"assets/editarorden2.svg",u)}),null)}function v(l){return a.cc(0,[(l()(),a.Ab(0,0,null,null,12,"tr",[],null,null,null,null,null)),(l()(),a.Ab(1,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),a.Zb(2,null,["",""])),(l()(),a.Ab(3,0,null,null,0,"td",[],null,null,null,null,null)),(l()(),a.Ab(4,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),a.Zb(5,null,["",""])),(l()(),a.Ab(6,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),a.Zb(7,null,["",""])),(l()(),a.Ab(8,0,null,null,4,"td",[],null,null,null,null,null)),(l()(),a.jb(16777216,null,null,1,null,m)),a.zb(10,16384,null,0,b.l,[a.S,a.P],{ngIf:[0,"ngIf"]},null),(l()(),a.jb(16777216,null,null,1,null,A)),a.zb(12,16384,null,0,b.l,[a.S,a.P],{ngIf:[0,"ngIf"]},null)],(function(l,n){var u=n.component;l(n,10,0,"Cancelado"!=n.context.$implicit.status),l(n,12,0,1!=u.tipoU)}),(function(l,n){l(n,2,0,n.context.$implicit.nro),l(n,5,0,n.context.$implicit.fecha),l(n,7,0,n.context.$implicit.hora)}))}function N(l){return a.cc(0,[(l()(),a.Ab(0,0,null,null,74,"div",[["class","animated fadeIn"]],null,null,null,null,null)),(l()(),a.Ab(1,0,null,null,73,"div",[["class","card"]],null,null,null,null,null)),(l()(),a.Ab(2,0,null,null,5,"div",[["class","card-header"]],null,null,null,null,null)),(l()(),a.Ab(3,0,null,null,4,"div",[["class","form-row"]],null,null,null,null,null)),(l()(),a.Ab(4,0,null,null,2,"div",[["class","col-8"]],null,null,null,null,null)),(l()(),a.Ab(5,0,null,null,1,"h3",[["style","margin-bottom: 0px;"]],null,null,null,null,null)),(l()(),a.Zb(-1,null,["Relaciones de Despacho"])),(l()(),a.Ab(7,0,null,null,0,"div",[["class","col-4"]],null,null,null,null,null)),(l()(),a.Ab(8,0,null,null,66,"div",[["class","card-body"]],null,null,null,null,null)),(l()(),a.Ab(9,0,null,null,14,"div",[["class","form-row"]],null,null,null,null,null)),(l()(),a.Ab(10,0,null,null,4,"div",[["class","col-7"]],null,null,null,null,null)),(l()(),a.Ab(11,0,null,null,1,"label",[["for","ordencarga"]],null,null,null,null,null)),(l()(),a.Zb(-1,null,["Relaci\xf3n de Despacho"])),(l()(),a.Ab(13,0,null,null,0,"br",[],null,null,null,null,null)),(l()(),a.Ab(14,0,null,null,0,"input",[["class","form-control"],["id","ordencarga"],["placeholder","Indique el nro. de la relaci\xf3n de despacho a buscar"],["type","text"]],null,null,null,null,null)),(l()(),a.Ab(15,0,null,null,8,"div",[["class","col-4"]],null,null,null,null,null)),(l()(),a.Ab(16,0,null,null,1,"label",[["class","invisible"],["for","ordencarga"]],null,null,null,null,null)),(l()(),a.Zb(-1,null,["Orden de Carga"])),(l()(),a.Ab(18,0,null,null,0,"br",[],null,null,null,null,null)),(l()(),a.Ab(19,16777216,null,null,4,"button",[["class","btn btn btn-primary btn-sm btn-pill"],["placement","right"],["tooltip","Buscar relaci\xf3n de despacho"],["type","button"]],null,null,null,null,null)),a.zb(20,212992,null,0,o.c,[a.S,s.a,o.a,a.m,a.H,c.a],{tooltip:[0,"tooltip"],placement:[1,"placement"]},null),(l()(),a.Ab(21,0,null,null,2,"svg-icon",[["src","assets/search.svg"]],null,null,null,i.b,i.a)),a.zb(22,1032192,null,0,r.e,[a.m,a.w,a.H,r.f,a.h],{src:[0,"src"],svgStyle:[1,"svgStyle"]},null),a.Sb(23,{"height.px":0,"width.px":1}),(l()(),a.Ab(24,0,null,null,0,"hr",[],null,null,null,null,null)),(l()(),a.Ab(25,0,null,null,49,"div",[["class","card"]],null,null,null,null,null)),(l()(),a.Ab(26,0,null,null,10,"div",[["class","card-header"]],null,null,null,null,null)),(l()(),a.Ab(27,0,null,null,9,"div",[["class","form-row"]],null,null,null,null,null)),(l()(),a.Ab(28,0,null,null,2,"div",[["class","col-9"]],null,null,null,null,null)),(l()(),a.Ab(29,0,null,null,1,"h4",[],null,null,null,null,null)),(l()(),a.Zb(-1,null,["Listado de Relaciones de Despacho"])),(l()(),a.Ab(31,0,null,null,5,"div",[["class","col-3"]],null,null,null,null,null)),(l()(),a.Ab(32,16777216,null,null,4,"button",[["class","btn btn-primary"],["placement","left"],["style","border-radius:60px;position:relative;left:70%"],["tooltip","A\xf1adir relaci\xf3n de despacho"]],null,[[null,"click"]],(function(l,n,u){var a=!0;return"click"===n&&(a=!1!==l.component.newRelacionDespacho("create")&&a),a}),null,null)),a.zb(33,212992,null,0,o.c,[a.S,s.a,o.a,a.m,a.H,c.a],{tooltip:[0,"tooltip"],placement:[1,"placement"]},null),(l()(),a.Ab(34,0,null,null,2,"svg-icon",[["src","assets/anadirorden2.svg"]],null,null,null,i.b,i.a)),a.zb(35,1032192,null,0,r.e,[a.m,a.w,a.H,r.f,a.h],{src:[0,"src"],svgStyle:[1,"svgStyle"]},null),a.Sb(36,{"height.px":0,"width.px":1}),(l()(),a.Ab(37,0,null,null,37,"div",[["class","card-body"]],null,null,null,null,null)),(l()(),a.Ab(38,0,null,null,36,"div",[["class","form-row"]],null,null,null,null,null)),(l()(),a.Ab(39,0,null,null,35,"div",[["class","col-12"]],null,null,null,null,null)),(l()(),a.Ab(40,0,null,null,15,"table",[["class","table table-sm"]],null,null,null,null,null)),(l()(),a.Ab(41,0,null,null,11,"thead",[],null,null,null,null,null)),(l()(),a.Ab(42,0,null,null,10,"tr",[],null,null,null,null,null)),(l()(),a.Ab(43,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),a.Zb(-1,null,["Nro."])),(l()(),a.Ab(45,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),a.Zb(-1,null,["Raz\xf3n Social"])),(l()(),a.Ab(47,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),a.Zb(-1,null,["Fecha"])),(l()(),a.Ab(49,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),a.Zb(-1,null,["Hora"])),(l()(),a.Ab(51,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),a.Zb(-1,null,["Acciones"])),(l()(),a.Ab(53,0,null,null,2,"tbody",[],null,null,null,null,null)),(l()(),a.jb(16777216,null,null,1,null,v)),a.zb(55,278528,null,0,b.k,[a.S,a.P,a.v],{ngForOf:[0,"ngForOf"]},null),(l()(),a.Ab(56,0,null,null,18,"ul",[["class","pagination"]],null,null,null,null,null)),(l()(),a.Ab(57,0,null,null,2,"li",[["class","page-item"]],null,null,null,null,null)),(l()(),a.Ab(58,0,null,null,1,"a",[["class","page-link"],["href","#"]],null,null,null,null,null)),(l()(),a.Zb(-1,null,["Prev"])),(l()(),a.Ab(60,0,null,null,2,"li",[["class","page-item active"]],null,null,null,null,null)),(l()(),a.Ab(61,0,null,null,1,"a",[["class","page-link"],["href","#"]],null,null,null,null,null)),(l()(),a.Zb(-1,null,["1"])),(l()(),a.Ab(63,0,null,null,2,"li",[["class","page-item"]],null,null,null,null,null)),(l()(),a.Ab(64,0,null,null,1,"a",[["class","page-link"],["href","#"]],null,null,null,null,null)),(l()(),a.Zb(-1,null,["2"])),(l()(),a.Ab(66,0,null,null,2,"li",[["class","page-item"]],null,null,null,null,null)),(l()(),a.Ab(67,0,null,null,1,"a",[["class","page-link"],["href","#"]],null,null,null,null,null)),(l()(),a.Zb(-1,null,["3"])),(l()(),a.Ab(69,0,null,null,2,"li",[["class","page-item"]],null,null,null,null,null)),(l()(),a.Ab(70,0,null,null,1,"a",[["class","page-link"],["href","#"]],null,null,null,null,null)),(l()(),a.Zb(-1,null,["4"])),(l()(),a.Ab(72,0,null,null,2,"li",[["class","page-item"]],null,null,null,null,null)),(l()(),a.Ab(73,0,null,null,1,"a",[["class","page-link"],["href","#"]],null,null,null,null,null)),(l()(),a.Zb(-1,null,["Next"]))],(function(l,n){var u=n.component;l(n,20,0,"Buscar relaci\xf3n de despacho","right");var a=l(n,23,0,25,25);l(n,22,0,"assets/search.svg",a),l(n,33,0,"A\xf1adir relaci\xf3n de despacho","left");var e=l(n,36,0,25,25);l(n,35,0,"assets/anadirorden2.svg",e),l(n,55,0,u.relacionesDespacho)}),null)}function S(l){return a.cc(0,[(l()(),a.Ab(0,0,null,null,1,"app-ordenescargas",[],null,null,null,N,g)),a.zb(1,49152,null,0,h,[f.w,p.a],null,null)],null,null)}var I=a.wb("app-ordenescargas",h,S,{},{},[]),y=u("iutN"),x=u("Xg1U"),z=u("z5nN"),w=u("gIcY"),Z=u("t/Na"),k=u("DQlY"),R=u("JPqG"),D=u("ZYCi"),F={title:"Relaci\xf3n de Despacho"},C=function(){return function(){}}(),q=u("Zseb"),H=u("xtZt"),U=u("9EwZ"),E=a.xb(e,[],(function(l){return a.Mb([a.Nb(512,a.k,a.bb,[[8,[t.a,I,y.a,x.a,z.a,z.b]],[3,a.k],a.B]),a.Nb(4608,w.y,w.y,[]),a.Nb(4608,b.n,b.m,[a.x]),a.Nb(4608,Z.h,Z.n,[b.d,a.F,Z.l]),a.Nb(4608,Z.o,Z.o,[Z.h,Z.m]),a.Nb(5120,Z.a,(function(l){return[l]}),[Z.o]),a.Nb(4608,Z.k,Z.k,[]),a.Nb(6144,Z.i,null,[Z.k]),a.Nb(4608,Z.g,Z.g,[Z.i]),a.Nb(6144,Z.b,null,[Z.g]),a.Nb(4608,Z.f,Z.j,[Z.b,a.t]),a.Nb(4608,Z.c,Z.c,[Z.f]),a.Nb(4608,r.g,r.d,[Z.c]),a.Nb(5120,r.f,r.c,[[3,r.f],r.g,a.F,[2,r.b],[2,b.d]]),a.Nb(4608,o.a,o.a,[]),a.Nb(4608,c.a,c.a,[a.D,a.I,a.F]),a.Nb(4608,s.a,s.a,[a.k,a.D,a.t,c.a,a.g]),a.Nb(4608,k.a,k.a,[a.I,s.a]),a.Nb(4608,R.a,R.a,[]),a.Nb(1073742336,w.x,w.x,[]),a.Nb(1073742336,w.h,w.h,[]),a.Nb(1073742336,D.p,D.p,[[2,D.u],[2,D.l]]),a.Nb(1073742336,C,C,[]),a.Nb(1073742336,q.b,q.b,[]),a.Nb(1073742336,H.e,H.e,[]),a.Nb(1073742336,U.a,U.a,[]),a.Nb(1073742336,b.c,b.c,[]),a.Nb(1073742336,Z.e,Z.e,[]),a.Nb(1073742336,Z.d,Z.d,[]),a.Nb(1073742336,r.a,r.a,[]),a.Nb(1073742336,o.d,o.d,[]),a.Nb(1073742336,k.e,k.e,[]),a.Nb(1073742336,e,e,[]),a.Nb(1024,D.j,(function(){return[[{path:"",component:h,data:F}]]}),[]),a.Nb(256,Z.l,"XSRF-TOKEN",[]),a.Nb(256,Z.m,"X-XSRF-TOKEN",[])])}))}}]);