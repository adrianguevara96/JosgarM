(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{YVVH:function(l,n,u){"use strict";u.r(n),u.d(n,"OrdenescargasModuleNgFactory",(function(){return T}));var e=u("CcnG"),a=function(){return function(){}}(),o=u("pMnS"),t=u("eajB"),s=u("lqqz"),c=u("NJnL"),i=u("zh/F"),r=u("eG2b"),d=u("jvCn"),b=u("miAi"),p=u("gIcY"),h=u("Ip0R"),g=u("2p+7"),m=u("dXze"),f=u("r00z"),v=u("uZId"),N=u("6+PL"),A=u("GUC0"),y=u.n(A),D=function(){function l(l,n,u,e){this.modalService=l,this.pru=n,this.service=u,this.spinner=e,this.buscarNroRelacionDespacho="",this.facturas=[],this.relacionesDespacho=[],this.relacionDespacho10=[]}return l.prototype.ngOnInit=function(){this.user=this.service.getUser(),this.getEstados(),this.getCiudades(),this.getRelacionesDespacho()},l.prototype.newRelacionDespacho=function(l){var n=this,u=this.modalService.open(f.a,{size:"xl"});u.componentInstance.accion=l,u.componentInstance.estados=this.estados,u.componentInstance.ciudades=this.ciudades,u.result.then((function(l){if(console.log("Que me trae result al cerrar modal crear? ",l),l){var u=l;console.log("Que me trae data? :",u),u.length>0&&n.getRelacionesDespacho()}}),(function(l){console.log("Reason? :",l)}))},l.prototype.pageChanged=function(l){this.relacionDespacho10=this.relacionesDespacho.slice((l.page-1)*l.itemsPerPage,l.page*l.itemsPerPage)},l.prototype.openModal=function(l,n){var u=this;this.getFacturasxNroRelacionDespacho(n),this.spinner.show(),setTimeout((function(){u.spinner.hide();var n=u.modalService.open(f.a,{size:"xl"});n.componentInstance.relacionDespacho=u.facturas,n.componentInstance.accion=l,n.componentInstance.estados=u.estados,n.componentInstance.ciudades=u.ciudades}),5e3)},l.prototype.getEstados=function(){var l=this;this.service.get("estados").then((function(n){l.estados=n}),(function(l){console.log("Error al hacer get a estados ",l)}))},l.prototype.getCiudades=function(){var l=this;this.service.get("ciudades").then((function(n){l.ciudades=n}),(function(l){console.log("Error al hacer get a ciudades ",l)}))},l.prototype.getFacturasxNroRelacionDespacho=function(l){var n=this;this.service.get("facturas/"+l).then((function(l){n.facturas=l}),(function(l){console.log("Error al hacer get a ciudades ",l)}))},l.prototype.getRelacionesDespacho=function(){var l=this;this.service.get("relaciondespacho/user/"+this.user.id).then((function(n){l.data=n,"No existe el usuario relacionado a relaciones de despacho en la BD."==l.data.message?y()("No existen relaciones de despacho","Ud no posee relaciones de despacho. Le invitamos a crear una y a disfrutar de nuestro servicios.","info"):l.data.length>0&&(l.relacionesDespacho=l.data,l.relacionDespacho10=l.relacionesDespacho.slice(0,10))}),(function(l){console.log("Error al hacer get a ciudades ",l)}))},l.prototype.buscarFacturasdeRelacionDespacho=function(l){var n=this;""==this.buscarNroRelacionDespacho?y()("Rellenar Campo","Por favor, rellene el campo nro. de relacion de despacho.","info"):this.service.get("relaciondespacho/user/"+this.user.id+"/nro/"+this.buscarNroRelacionDespacho).then((function(u){var e=u;"No existe la relacion de despacho asociada al usuario en la BD."==e.message?(y()("No existe la relacion de despacho","El nro de relacion de despacho que esta buscando no existe, por favor ingrese otro numero de relacion de despacho.","info"),n.buscarNroRelacionDespacho=""):(n.facturas=e,n.spinner.show(),n.buscarNroRelacionDespacho="",setTimeout((function(){n.spinner.hide();var u=n.modalService.open(f.a,{size:"xl"});u.componentInstance.relacionDespacho=n.facturas,u.componentInstance.accion=l,u.componentInstance.estados=n.estados,u.componentInstance.ciudades=n.ciudades}),5e3))}),(function(l){console.log("Error al buscar esa relacion de despacho. ",l)}))},l}(),x=u("4GxJ"),z=e.yb({encapsulation:0,styles:[[""]],data:{}});function C(l){return e.cc(0,[(l()(),e.Ab(0,0,null,null,19,"tr",[],null,null,null,null,null)),(l()(),e.Ab(1,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),e.Zb(2,null,["",""])),(l()(),e.Ab(3,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),e.Zb(4,null,["",""])),(l()(),e.Ab(5,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),e.Zb(6,null,["",""])),(l()(),e.Ab(7,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),e.Zb(8,null,["",""])),(l()(),e.Ab(9,0,null,null,10,"td",[],null,null,null,null,null)),(l()(),e.Ab(10,16777216,null,null,4,"button",[["class","btn btn-sm btn-pill"],["placement","left"],["style","border-radius:60px"],["tooltip","Ver detalles"]],null,[[null,"click"]],(function(l,n,u){var e=!0;return"click"===n&&(e=!1!==l.component.openModal("see",l.context.$implicit.nro)&&e),e}),null,null)),e.zb(11,212992,null,0,t.c,[e.S,s.a,t.a,e.m,e.H,c.a],{tooltip:[0,"tooltip"],placement:[1,"placement"]},null),(l()(),e.Ab(12,0,null,null,2,"svg-icon",[["src","assets/eye2.svg"]],null,null,null,i.b,i.a)),e.zb(13,1032192,null,0,r.e,[e.m,e.w,e.H,r.f,e.h],{src:[0,"src"],svgStyle:[1,"svgStyle"]},null),e.Sb(14,{"height.px":0,"width.px":1}),(l()(),e.Ab(15,16777216,null,null,4,"button",[["class","btn btn-sm btn-pill"],["placement","right"],["style","border-radius:60px"],["tooltip","Modificar"]],null,[[null,"click"]],(function(l,n,u){var e=!0;return"click"===n&&(e=!1!==l.component.openModal("edit",l.context.$implicit.nro)&&e),e}),null,null)),e.zb(16,212992,null,0,t.c,[e.S,s.a,t.a,e.m,e.H,c.a],{tooltip:[0,"tooltip"],placement:[1,"placement"]},null),(l()(),e.Ab(17,0,null,null,2,"svg-icon",[["src","assets/editarorden2.svg"]],null,null,null,i.b,i.a)),e.zb(18,1032192,null,0,r.e,[e.m,e.w,e.H,r.f,e.h],{src:[0,"src"],svgStyle:[1,"svgStyle"]},null),e.Sb(19,{"height.px":0,"width.px":1})],(function(l,n){l(n,11,0,"Ver detalles","left");var u=l(n,14,0,20,20);l(n,13,0,"assets/eye2.svg",u),l(n,16,0,"Modificar","right");var e=l(n,19,0,20,20);l(n,18,0,"assets/editarorden2.svg",e)}),(function(l,n){var u=n.component;l(n,2,0,n.context.$implicit.nro),l(n,4,0,u.user.razonsocial),l(n,6,0,n.context.$implicit.fecha),l(n,8,0,n.context.$implicit.hora)}))}function S(l){return e.cc(0,[(l()(),e.Ab(0,0,null,null,69,"div",[["class","animated fadeIn"]],null,null,null,null,null)),(l()(),e.Ab(1,0,null,null,3,"ngx-spinner",[["bdColor","rgb(8,8,8)"],["size","medium"],["type","pacman"]],null,null,null,d.b,d.a)),e.zb(2,770048,null,0,b.a,[b.c,e.h],{bdColor:[0,"bdColor"],size:[1,"size"],type:[2,"type"],fullScreen:[3,"fullScreen"]},null),(l()(),e.Ab(3,0,null,0,1,"p",[["class","loading"],["style","color: white"]],null,null,null,null,null)),(l()(),e.Zb(-1,null,["Cargando las facturas de esta relaci\xf3n de despacho..."])),(l()(),e.Ab(5,0,null,null,64,"div",[["class","card"]],null,null,null,null,null)),(l()(),e.Ab(6,0,null,null,5,"div",[["class","card-header"]],null,null,null,null,null)),(l()(),e.Ab(7,0,null,null,4,"div",[["class","form-row"]],null,null,null,null,null)),(l()(),e.Ab(8,0,null,null,2,"div",[["class","col-8"]],null,null,null,null,null)),(l()(),e.Ab(9,0,null,null,1,"h3",[["style","margin-bottom: 0px;"]],null,null,null,null,null)),(l()(),e.Zb(-1,null,["Relaciones de Despacho"])),(l()(),e.Ab(11,0,null,null,0,"div",[["class","col-4"]],null,null,null,null,null)),(l()(),e.Ab(12,0,null,null,57,"div",[["class","card-body"]],null,null,null,null,null)),(l()(),e.Ab(13,0,null,null,19,"div",[["class","form-row"]],null,null,null,null,null)),(l()(),e.Ab(14,0,null,null,9,"div",[["class","col-7"]],null,null,null,null,null)),(l()(),e.Ab(15,0,null,null,1,"label",[["for","ordencarga"]],null,null,null,null,null)),(l()(),e.Zb(-1,null,["Relaci\xf3n de Despacho"])),(l()(),e.Ab(17,0,null,null,0,"br",[],null,null,null,null,null)),(l()(),e.Ab(18,0,null,null,5,"input",[["class","form-control"],["id","ordencarga"],["placeholder","Indique el nro. de la relaci\xf3n de despacho a buscar"],["type","text"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],(function(l,n,u){var a=!0,o=l.component;return"input"===n&&(a=!1!==e.Pb(l,19)._handleInput(u.target.value)&&a),"blur"===n&&(a=!1!==e.Pb(l,19).onTouched()&&a),"compositionstart"===n&&(a=!1!==e.Pb(l,19)._compositionStart()&&a),"compositionend"===n&&(a=!1!==e.Pb(l,19)._compositionEnd(u.target.value)&&a),"ngModelChange"===n&&(a=!1!==(o.buscarNroRelacionDespacho=u)&&a),a}),null,null)),e.zb(19,16384,null,0,p.d,[e.H,e.m,[2,p.a]],null,null),e.Ub(1024,null,p.k,(function(l){return[l]}),[p.d]),e.zb(21,671744,null,0,p.p,[[8,null],[8,null],[8,null],[6,p.k]],{model:[0,"model"]},{update:"ngModelChange"}),e.Ub(2048,null,p.l,null,[p.p]),e.zb(23,16384,null,0,p.m,[[4,p.l]],null,null),(l()(),e.Ab(24,0,null,null,8,"div",[["class","col-4"]],null,null,null,null,null)),(l()(),e.Ab(25,0,null,null,1,"label",[["class","invisible"],["for","ordencarga"]],null,null,null,null,null)),(l()(),e.Zb(-1,null,["Orden de Carga"])),(l()(),e.Ab(27,0,null,null,0,"br",[],null,null,null,null,null)),(l()(),e.Ab(28,16777216,null,null,4,"button",[["class","btn btn btn-primary btn-sm btn-pill"],["placement","right"],["tooltip","Buscar relaci\xf3n de despacho"],["type","button"]],null,[[null,"click"]],(function(l,n,u){var e=!0;return"click"===n&&(e=!1!==l.component.buscarFacturasdeRelacionDespacho("edit")&&e),e}),null,null)),e.zb(29,212992,null,0,t.c,[e.S,s.a,t.a,e.m,e.H,c.a],{tooltip:[0,"tooltip"],placement:[1,"placement"]},null),(l()(),e.Ab(30,0,null,null,2,"svg-icon",[["src","assets/search.svg"]],null,null,null,i.b,i.a)),e.zb(31,1032192,null,0,r.e,[e.m,e.w,e.H,r.f,e.h],{src:[0,"src"],svgStyle:[1,"svgStyle"]},null),e.Sb(32,{"height.px":0,"width.px":1}),(l()(),e.Ab(33,0,null,null,0,"hr",[],null,null,null,null,null)),(l()(),e.Ab(34,0,null,null,35,"div",[["class","card"]],null,null,null,null,null)),(l()(),e.Ab(35,0,null,null,10,"div",[["class","card-header"]],null,null,null,null,null)),(l()(),e.Ab(36,0,null,null,9,"div",[["class","form-row"]],null,null,null,null,null)),(l()(),e.Ab(37,0,null,null,2,"div",[["class","col-9"]],null,null,null,null,null)),(l()(),e.Ab(38,0,null,null,1,"h4",[],null,null,null,null,null)),(l()(),e.Zb(-1,null,["Listado de Relaciones de Despacho"])),(l()(),e.Ab(40,0,null,null,5,"div",[["class","col-3"]],null,null,null,null,null)),(l()(),e.Ab(41,16777216,null,null,4,"button",[["class","btn btn-primary"],["placement","left"],["style","border-radius:60px;position:relative;left:70%"],["tooltip","A\xf1adir relaci\xf3n de despacho"]],null,[[null,"click"]],(function(l,n,u){var e=!0;return"click"===n&&(e=!1!==l.component.newRelacionDespacho("create")&&e),e}),null,null)),e.zb(42,212992,null,0,t.c,[e.S,s.a,t.a,e.m,e.H,c.a],{tooltip:[0,"tooltip"],placement:[1,"placement"]},null),(l()(),e.Ab(43,0,null,null,2,"svg-icon",[["src","assets/anadirorden2.svg"]],null,null,null,i.b,i.a)),e.zb(44,1032192,null,0,r.e,[e.m,e.w,e.H,r.f,e.h],{src:[0,"src"],svgStyle:[1,"svgStyle"]},null),e.Sb(45,{"height.px":0,"width.px":1}),(l()(),e.Ab(46,0,null,null,23,"div",[["class","card-body"]],null,null,null,null,null)),(l()(),e.Ab(47,0,null,null,20,"div",[["class","form-row"]],null,null,null,null,null)),(l()(),e.Ab(48,0,null,null,19,"div",[["class","col-12"]],null,null,null,null,null)),(l()(),e.Ab(49,0,null,null,15,"table",[["class","table table-sm"]],null,null,null,null,null)),(l()(),e.Ab(50,0,null,null,11,"thead",[],null,null,null,null,null)),(l()(),e.Ab(51,0,null,null,10,"tr",[],null,null,null,null,null)),(l()(),e.Ab(52,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),e.Zb(-1,null,["Nro."])),(l()(),e.Ab(54,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),e.Zb(-1,null,["Raz\xf3n Social"])),(l()(),e.Ab(56,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),e.Zb(-1,null,["Fecha"])),(l()(),e.Ab(58,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),e.Zb(-1,null,["Hora"])),(l()(),e.Ab(60,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),e.Zb(-1,null,["Acciones"])),(l()(),e.Ab(62,0,null,null,2,"tbody",[],null,null,null,null,null)),(l()(),e.jb(16777216,null,null,1,null,C)),e.zb(64,278528,null,0,h.k,[e.S,e.P,e.v],{ngForOf:[0,"ngForOf"]},null),(l()(),e.Ab(65,0,null,null,2,"pagination",[],null,[[null,"pageChanged"]],(function(l,n,u){var e=!0;return"pageChanged"===n&&(e=!1!==l.component.pageChanged(u)&&e),e}),g.d,g.b)),e.Ub(5120,null,p.k,(function(l){return[l]}),[m.b]),e.zb(67,114688,null,0,m.b,[e.m,m.c,e.h],{totalItems:[0,"totalItems"]},{pageChanged:"pageChanged"}),(l()(),e.Ab(68,0,null,null,1,"div",[["class","form-row"]],null,null,null,null,null)),(l()(),e.Ab(69,0,null,null,0,"div",[["class","col-12"]],null,null,null,null,null))],(function(l,n){var u=n.component;l(n,2,0,"rgb(8,8,8)","medium","pacman",!1),l(n,21,0,u.buscarNroRelacionDespacho),l(n,29,0,"Buscar relaci\xf3n de despacho","right");var e=l(n,32,0,25,25);l(n,31,0,"assets/search.svg",e),l(n,42,0,"A\xf1adir relaci\xf3n de despacho","left");var a=l(n,45,0,25,25);l(n,44,0,"assets/anadirorden2.svg",a),l(n,64,0,u.relacionDespacho10),l(n,67,0,u.relacionesDespacho.length)}),(function(l,n){l(n,18,0,e.Pb(n,23).ngClassUntouched,e.Pb(n,23).ngClassTouched,e.Pb(n,23).ngClassPristine,e.Pb(n,23).ngClassDirty,e.Pb(n,23).ngClassValid,e.Pb(n,23).ngClassInvalid,e.Pb(n,23).ngClassPending)}))}function w(l){return e.cc(0,[(l()(),e.Ab(0,0,null,null,1,"app-ordenescargas",[],null,null,null,S,z)),e.zb(1,114688,null,0,D,[x.w,v.a,N.a,b.c],null,null)],(function(l,n){l(n,1,0)}),null)}var R=e.wb("app-ordenescargas",D,w,{},{},[]),I=u("iutN"),P=u("Xg1U"),Z=u("z5nN"),k=u("t/Na"),F=u("DQlY"),E=u("JPqG"),H=u("ZYCi"),M={title:"Relaci\xf3n de Despacho"},U=function(){return function(){}}(),O=u("Zseb"),j=u("xtZt"),B=u("9EwZ"),T=e.xb(a,[],(function(l){return e.Mb([e.Nb(512,e.k,e.bb,[[8,[o.a,R,I.a,P.a,Z.a,Z.b]],[3,e.k],e.B]),e.Nb(4608,p.z,p.z,[]),e.Nb(4608,h.n,h.m,[e.x]),e.Nb(4608,k.i,k.o,[h.d,e.F,k.m]),e.Nb(4608,k.p,k.p,[k.i,k.n]),e.Nb(5120,k.a,(function(l){return[l]}),[k.p]),e.Nb(4608,k.l,k.l,[]),e.Nb(6144,k.j,null,[k.l]),e.Nb(4608,k.h,k.h,[k.j]),e.Nb(6144,k.b,null,[k.h]),e.Nb(4608,k.f,k.k,[k.b,e.t]),e.Nb(4608,k.c,k.c,[k.f]),e.Nb(4608,r.g,r.d,[k.c]),e.Nb(5120,r.f,r.c,[[3,r.f],r.g,e.F,[2,r.b],[2,h.d]]),e.Nb(4608,t.a,t.a,[]),e.Nb(4608,c.a,c.a,[e.D,e.I,e.F]),e.Nb(4608,s.a,s.a,[e.k,e.D,e.t,c.a,e.g]),e.Nb(4608,F.a,F.a,[e.I,s.a]),e.Nb(4608,m.c,m.c,[]),e.Nb(4608,E.a,E.a,[]),e.Nb(1073742336,p.y,p.y,[]),e.Nb(1073742336,p.h,p.h,[]),e.Nb(1073742336,H.p,H.p,[[2,H.u],[2,H.l]]),e.Nb(1073742336,U,U,[]),e.Nb(1073742336,O.b,O.b,[]),e.Nb(1073742336,j.e,j.e,[]),e.Nb(1073742336,B.a,B.a,[]),e.Nb(1073742336,h.c,h.c,[]),e.Nb(1073742336,k.e,k.e,[]),e.Nb(1073742336,k.d,k.d,[]),e.Nb(1073742336,r.a,r.a,[]),e.Nb(1073742336,t.d,t.d,[]),e.Nb(1073742336,F.e,F.e,[]),e.Nb(1073742336,m.d,m.d,[]),e.Nb(1073742336,b.b,b.b,[]),e.Nb(1073742336,a,a,[]),e.Nb(1024,H.j,(function(){return[[{path:"",component:D,data:M}]]}),[]),e.Nb(256,k.m,"XSRF-TOKEN",[]),e.Nb(256,k.n,"X-XSRF-TOKEN",[])])}))}}]);