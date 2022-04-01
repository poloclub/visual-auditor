(this["webpackJsonpvisual-auditor"]=this["webpackJsonpvisual-auditor"]||[]).push([[0],{141:function(e){e.exports=JSON.parse('{"data":"insert common samples"}')},142:function(e){e.exports=JSON.parse('{"data":"insert reverse common samples"}')},238:function(e,t,r){},239:function(e,t,r){},248:function(e,t,r){},249:function(e,t,r){},251:function(e,t,r){},252:function(e,t,r){},253:function(e,t,r){},254:function(e,t,r){"use strict";r.r(t);var i=r(0),s=r.n(i),a=r(41),n=r.n(a),c=(r(238),r(10)),l=r(310),o=r(298),u=r(304),d=r(305),h=(r(239),r(1)),m=function(e){var t=e.view,r=e.setView;e.algorithm,e.setAlgorithm;return Object(h.jsx)("div",{className:"nav-container",children:Object(h.jsxs)(l.a,{sx:{s:1,minWidth:175,paddingRight:1},style:{marginTop:"1rem"},children:[Object(h.jsx)(u.a,{children:"View:"}),Object(h.jsxs)(o.a,{value:t,label:"View",onChange:function(e){r(e.target.value)},children:[Object(h.jsx)(d.a,{value:"bar",children:"Bar Chart Layout"}),Object(h.jsx)(d.a,{value:"force",children:"Force Layout"}),Object(h.jsx)(d.a,{value:"graph",children:"Graph Layout"})]})]})})},j=r(17),x=r(308),g=r(313),p=r(301),f=r(312),b=r(302),y=r(303),O=r(297),v=r(311),S=r(75),k=r.n(S),F=r(66),w=r.n(F),z=r(306),M=(r(248),function(e){var t=e.numFeatures,r=e.setNumFeatures,i=e.sampleSize,a=e.setSampleSize,n=e.metric,m=e.setMetric,S=e.sortBy,F=e.setSortBy,M=e.overperforming,N=e.setOverperforming,C=e.features,q=e.setFeatures,A=e.view,H=e.radius,D=e.setRadius,L=e.edgeFiltering,T=e.setEdgeFiltering,R=e.edgeForce,E=e.setEdgeForce,B=e.cursorMode,I=e.setCursorMode,J=e.showConvexHull,V=e.setShowConvexHull,_=s.a.useState(!1),W=Object(c.a)(_,2),P=W[0],G=W[1],K=function(e,t){e.target.checked?q([].concat(Object(j.a)(C),[t])):q(C.filter((function(e){return e!==t}))),V(!1)},Q=s.a.useState(!0),U=Object(c.a)(Q,2),X=U[0],Y=U[1];return X?Object(h.jsx)(x.a,{variant:"persistent",anchor:"left",open:X,sx:{display:{xs:"none",sm:"block"},"& .MuiDrawer-paper":{boxSizing:"border-box",width:"15rem"}},children:Object(h.jsxs)("div",{className:"left-container",children:[Object(h.jsx)(k.a,{onClick:function(){Y(!1)},style:{position:"relative",right:"-5rem",top:"1rem",opacity:"0.75",cursor:"pointer"}}),Object(h.jsx)("h1",{children:"Slice Filters"}),Object(h.jsx)("h2",{children:"Number of Features:"}),Object(h.jsx)(p.a,{"aria-label":"Number of Features",defaultValue:2,value:t,valueLabelDisplay:"auto",step:1,marks:!0,min:1,max:4,size:"small",onChange:function(e){r(e.target.value),V(!1)}}),Object(h.jsx)("h2",{children:"Minimum Slice Size:"}),Object(h.jsx)(p.a,{size:"small",defaultValue:100,"aria-label":"Small",value:i,valueLabelDisplay:"auto",min:0,max:250,step:10,onChange:function(e){a(e.target.value),V(!1)}}),"graph"===A&&Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)("h2",{children:"Edge Filtering:"}),Object(h.jsx)(z.a,{inputProps:{inputMode:"numeric",pattern:"[0-9]*"},label:"Edge Filtering",variant:"outlined",value:L,valueLabelDisplay:"auto",defaultValue:300,onChange:function(e){T(e.target.value),V(!1)}}),Object(h.jsx)("h2",{children:"Edge Force Strength:"}),Object(h.jsx)(p.a,{"aria-label":"Edge Force Strength",defaultValue:1,value:R,valueLabelDisplay:"auto",step:.01,min:0,max:5,size:"small",onChange:function(e){E(e.target.value),V(!1)}}),Object(h.jsx)("h2",{children:"Cursor Mode:"}),Object(h.jsxs)(l.a,{sx:{s:1,minWidth:175},children:[Object(h.jsx)(u.a,{children:"Mode:"}),Object(h.jsxs)(o.a,{value:B,label:"Mode",onChange:function(e){I(e.target.value),V(!1)},children:[Object(h.jsx)(d.a,{value:"drag",children:"Drag"}),Object(h.jsx)(d.a,{value:"select",children:"Select"})]})]})]}),"bar"===A?Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)("h2",{children:"Order By:"}),Object(h.jsxs)(l.a,{sx:{m:1,minWidth:175},children:[Object(h.jsx)(u.a,{id:"demo-simple-select-helper-label",children:"Order By:"}),Object(h.jsxs)(o.a,{labelId:"demo-simple-select-helper-label",id:"demo-simple-select-helper",value:S,label:"Order By",onChange:function(e){F(e.target.value),V(!1)},children:[Object(h.jsx)(d.a,{value:"metric",children:n}),Object(h.jsx)(d.a,{value:"size",children:"Sample Size"})]})]})]}):Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)("h2",{children:"Radius Function:"}),Object(h.jsxs)(l.a,{sx:{s:1,minWidth:175},children:[Object(h.jsx)(u.a,{children:"Radius:"}),Object(h.jsxs)(o.a,{value:H,label:"Radius",onChange:function(e){D(e.target.value),V(!1)},children:[Object(h.jsx)(d.a,{value:"log",children:"Log"}),Object(h.jsx)(d.a,{value:"sqrt",children:"Square Root"})]})]}),Object(h.jsx)("h2",{children:"Show Convex Hull:"}),Object(h.jsx)(v.a,{checked:J,onChange:function(e){e.target.checked&&(G(!0),setTimeout((function(){G(!1)}),4e3)),V(e.target.checked)},label:"Show Convex Hull",className:"switch",disabled:P})]}),Object(h.jsx)("h2",{children:"Overperforming Slices:"}),Object(h.jsx)(v.a,{checked:M,onChange:function(e){N(e.target.checked),V(!1)},label:"Overperforming Slices"}),Object(h.jsx)("h2",{children:"Select Features:"}),Object(h.jsxs)(f.a,{style:{marginLeft:"1rem"},children:[Object(h.jsx)(b.a,{control:Object(h.jsx)(y.a,{defaultChecked:!0}),label:"Insert Features",onChange:function(e){return K(e,"Insert Features")}}),Object(h.jsx)(b.a,{control:Object(h.jsx)(y.a,{defaultChecked:!0}),label:"Insert Features",onChange:function(e){return K(e,"Insert Features")}})]}),Object(h.jsx)(O.a,{style:{padding:"1rem"}}),Object(h.jsx)(g.a,{variant:"outlined",onClick:function(e){r(2),a(0),m("Log Loss"),F("metric"),N(!1),T(300),E(1),V(!1)},style:{marginTop:"1rem"},children:"Reset"})]})}):Object(h.jsx)(w.a,{onClick:function(){Y(!0)},style:{position:"absolute",left:"2rem",top:"2rem",cursor:"pointer",opacity:"0.75"},children:"Open"})}),N=(r(249),r.p,r.p,function(e){var t,r,i=e.details,a=e.metric,n=(e.overperforming,e.view),l=e.convexHull,o=s.a.useState(!0),u=Object(c.a)(o,2),d=u[0],m=u[1],j=function(){m(!1)};return d?Object(h.jsxs)(x.a,{sx:{display:{xs:"none",sm:"block"},"& .MuiDrawer-paper":{boxSizing:"border-box",width:"15rem"}},variant:"persistent",anchor:"right",open:d,children:[" ","bar"===n?Object(h.jsxs)("div",{className:"right-container",children:[Object(h.jsx)(w.a,{onClick:j,style:{position:"relative",left:"-5rem",top:"1rem",opacity:"0.75",cursor:"pointer"}}),Object(h.jsx)("h1",{children:"Legend"}),Object(h.jsxs)("div",{style:{paddingTop:"0.25rem",lineHeight:"0.5rem"},children:[Object(h.jsx)("p",{children:Object(h.jsx)("strong",{children:"Bar Color:"})}),Object(h.jsx)("p",{children:"Performance"})]})]}):Object(h.jsxs)("div",{className:"right-container",children:[Object(h.jsx)(w.a,{onClick:j,style:{position:"relative",left:"-5rem",top:"1rem",opacity:"0.75",cursor:"pointer"}}),Object(h.jsx)("h1",{children:"Legend"}),Object(h.jsxs)("div",{style:{paddingTop:"0.25rem",lineHeight:"0.5rem"},children:[Object(h.jsx)("p",{children:Object(h.jsx)("strong",{children:"Node Color:"})}),Object(h.jsx)("p",{children:"Performance"})]}),Object(h.jsxs)("div",{style:{paddingTop:"0.25rem",lineHeight:"0.5rem"},children:[Object(h.jsx)("p",{children:Object(h.jsx)("strong",{children:"Node Size:"})}),Object(h.jsx)("p",{children:"Slice Sample Size"})]}),"graph"===n&&Object(h.jsxs)("div",{style:{paddingTop:"0.25rem",lineHeight:"0.5rem"},children:[Object(h.jsx)("p",{children:Object(h.jsx)("strong",{children:"Graph Edges:"})}),Object(h.jsx)("p",{children:"Overlapping Samples"})]}),l&&Object(h.jsxs)("div",{style:{paddingTop:"0.25rem",lineHeight:"0.5rem"},children:[Object(h.jsx)("p",{children:Object(h.jsx)("strong",{children:"Convex Hull:"})}),Object(h.jsx)("p",{children:"Same Features"})]})]}),null===i?Object(h.jsxs)("div",{className:"right-container",children:[Object(h.jsx)("h1",{children:"Selected Slice"}),Object(h.jsx)("p",{className:"thin",children:"Click on a slice to view the slice details"})]}):Object(h.jsxs)("div",{className:"right-container",children:[Object(h.jsx)("h1",{children:"Selected Slice"}),Object(h.jsxs)("div",{style:{paddingTop:"0.25rem",lineHeight:"0.5rem"},children:[Object(h.jsx)("p",{children:Object(h.jsx)("strong",{children:"Slice Definition:"})}),i.slice.split(", ").map((function(e){return Object(h.jsx)("p",{children:e})}))]}),Object(h.jsxs)("div",{style:{paddingTop:"0.25rem",lineHeight:"0.5rem"},children:[Object(h.jsx)("p",{children:Object(h.jsx)("strong",{children:"Slice Size:"})}),Object(h.jsxs)("p",{children:[" ",null===i||void 0===i?void 0:i.size," samples"]})]}),Object(h.jsxs)("div",{style:{paddingTop:"0.25rem",lineHeight:"0.5rem"},children:[Object(h.jsx)("p",{children:Object(h.jsxs)("strong",{children:["Slice ",a,":"]})}),Object(h.jsx)("p",{children:null===i||void 0===i||null===(t=i.metric)||void 0===t?void 0:t.toFixed(3)})]}),(null===i||void 0===i||null===(r=i.similarSlices)||void 0===r?void 0:r.length)>0?Object(h.jsxs)("div",{style:{paddingTop:"0.25rem",lineHeight:"1.25rem"},children:[Object(h.jsx)("p",{children:Object(h.jsx)("strong",{children:"Similar Slices:"})}),Object(h.jsx)("ul",{className:"similar-slices-list",children:null===i||void 0===i?void 0:i.similarSlices.map((function(e){return Object(h.jsx)("li",{className:"similar-slice",children:e})}))})]}):null]})]}):Object(h.jsx)(k.a,{onClick:function(){m(!0)},style:{position:"absolute",right:"2rem",top:"2rem",cursor:"pointer",opacity:"0.75"},children:"Open"})}),C=r(7),q=function(e,t){var r=s.a.useRef();return s.a.useEffect((function(){return e(C.q(r.current)),function(){}}),t),r};function A(e){var t=e.data,r=e.model,i=e.max,a=e.overperforming,n=e.metric,l=e.setDetails,o=s.a.useState(null),u=Object(c.a)(o,2),d=u[0],m=u[1],j=s.a.useState(!1),x=Object(c.a)(j,2),g=x[0],p=x[1];s.a.useEffect((function(){p(!1)}),[t]);var f=q((function(e){var s=600,c=60,o=30,u=50,h=90,j=C.q(".tooltip").style("opacity",0).style("width","200px").style("height","150px").style("padding","1rem 1rem 0rem 1rem").style("border-radius","20px"),x=C.o().domain(t.map((function(e){return e.slice}))).rangeRound([h,875-o]).padding(.1),f=C.p().domain([0,i]).rangeRound([s-u,c]);e.select(".x-axis").call((function(e){return e.attr("transform","translate(0,".concat(s-u,")")).call(C.a(x).tickSizeOuter(0)).selectAll("text").attr("transform","translate(-10,0)rotate(-45)").style("text-anchor","end")})),e.select(".y-axis").call((function(e){return e.attr("transform","translate(".concat(h,",0)")).style("color","steelblue").call(C.b(f).ticks(null,"s")).call((function(e){return e.select(".domain").remove()})).call((function(e){return e.append("text").attr("x",-h).attr("y",10).attr("fill","currentColor").attr("text-anchor","start").text(t.y1)}))})),e.select(".plot-area").selectAll(".bar").data(t).join("rect").attr("class","bar").attr("style",(function(e){if(e.slice===d)return"outline: 3px solid #FFD600;"})).style("fill",(function(e){return a?C.k(Math.abs((e.metric-r)/r)):C.l(Math.abs((e.metric-r)/r))})).on("mouseover",(function(e,t){C.q(this).style("opacity","0.7").style("cursor","pointer"),j.transition().duration(200).style("opacity",.9).style("right","100px").style("top","100px"),j.html('<strong>Slice Description: </strong><br><div style={{margin: "1rem"}}> </div>'+t.slice+"<br><strong>Size: </strong><br>"+t.size+" samples<br><strong>Metric: </strong><br>"+t.metric.toFixed(2)+" "+"(".concat(Math.round((t.metric-r)/r*100),"% difference)"))})).on("mouseout",(function(e){C.q(this).style("opacity","1"),j.transition().style("opacity",0)})).on("click",(function(e,t){m(t.slice),l({slice:t.slice,size:t.size,metric:t.metric,similarSlices:[]})})).attr("x",(function(e){return x(e.slice)})).attr("width",x.bandwidth()).attr("y",(function(e){return f(0)-u})).attr("height",(function(e){return s-f(0)})),g?e.selectAll("rect").attr("y",(function(e){return f(e.metric)-u})).attr("height",(function(e){return s-f(e.metric)})):(e.selectAll("rect").transition().duration(800).attr("y",(function(e){return f(e.metric)-u})).attr("height",(function(e){return s-f(e.metric)})).delay((function(e,t){return 100*t})),p(!0)),e.selectAll(".line").remove(),e.selectAll(".label").remove(),e.append("svg:line").attr("class","line").attr("x1",60).attr("x2",875).attr("y1",f(r)).attr("y2",f(r)).style("stroke","#e6e6e6"),e.append("text").attr("class","label").text("Model").attr("x",0).attr("y",f(r)+5).style("fill","gray"),e.append("text").attr("class","label").text(n).attr("x",0).attr("y",f(r)+25).style("fill","gray")}),[t,n,d]);return Object(h.jsxs)("div",{style:{width:"100%"},children:[Object(h.jsx)("div",{className:"tooltip",style:{position:"absolute",background:"lightgray",right:"100px",top:"100px"}}),Object(h.jsxs)("svg",{ref:f,viewBox:"0 0 875 875",width:"80%",height:"80%",style:{marginLeft:"auto",marginRight:"auto",display:"block"},children:[Object(h.jsx)("g",{className:"plot-area"}),Object(h.jsx)("g",{className:"x-axis"}),Object(h.jsx)("g",{className:"y-axis"}),Object(h.jsx)("g",{className:"label"})]})]})}var H=Object(i.memo)(A);r(251),r(252);function D(e){var t=e.data,r=e.degree,i=e.view,s=e.metric,a=e.model,n=e.overperforming,c=e.setDetails,l=e.radius,o=e.setShowConvexHull,u=20,d=30,m=70,j=85,x=800,g=Array.from(Array(100).keys()),p=[],f={};t.forEach((function(e){e.classifiers=[];for(var t=e.slice;-1!==t.indexOf(":");){var i=t.substring(0,t.indexOf(":"));e.classifiers.push(i),p.includes(i)||p.push(i),r===e.classifiers.length&&(f[e.classifiers.join(", ")]?f[e.classifiers.join(", ")]++:f[e.classifiers.join(", ")]=1),t=-1!==t.indexOf(",")?t.substring(t.indexOf(",")+2):""}}));var b=Object.keys(f).map((function(e){return[e,f[e]]})).sort((function(e,t){return t[1]-e[1]})).slice(0,15),y=C.o().domain(p).rangeRound([j,800-d]).padding(.1),O=function(e){return e.attr("transform","translate(0,".concat(x-m,")")).call(C.a(y).tickSizeOuter(0)).selectAll("text").attr("transform","translate(-10,0)rotate(-45)").style("text-anchor","end")},v=function(e){return e.attr("transform","translate(".concat(j,",").concat(30-m,")")).call(C.b(y).tickSizeOuter(0)).selectAll("text").style("text-anchor","end")},S=function(e){return e.attr("transform","translate(0,".concat(x-m,")")).call(C.a(y).tickSizeOuter(0).tickSizeInner(-800-u+2*m)).style("opacity",.1).selectAll("text").style("display","none")},k=function(e){return e.attr("transform","translate(".concat(j,",").concat(30-m,")")).call(C.b(y).tickSizeOuter(0).tickSizeInner(-800-d+2*j)).style("opacity",.1).selectAll("text").style("display","none")};q((function(e){C.q(".hull").remove();for(var i=C.q(".tooltip").style("opacity",0).style("width","200px").style("height","150px").style("padding","1rem 1rem 0 1rem").style("border-radius","20px"),u=[],d=[],h=0;h<p.length;h++)u.push(650/p.length*h+100),d.push(625/p.length*h-100);var m=t.map((function(e){var t;return{radius:"log"===l?Math.log(e.size):Math.sqrt(e.size),category:e.degree,xFeature:e.classifiers[0],yFeature:null!==(t=e.classifiers[1])&&void 0!==t?t:e.classifiers[0],slice:e.slice,size:e.size,metric:e.metric}})),j=(C.h(m).force("charge",C.g().strength(-5)).force("x",C.i().x((function(e){return u[p.indexOf(e.xFeature)]-20}))).force("y",C.j().y((function(e){return r>1?d[p.indexOf(e.yFeature)]:200}))).force("collision",C.e().radius((function(e){return e.radius}))).on("tick",(function(){j.attr("cx",(function(e){return e.x})).attr("cy",(function(e){return e.y})).on("mouseover",(function(e,t){C.q(this).attr("r",1.1*t.radius).style("opacity","0.7").style("cursor","pointer"),i.transition().duration(200).style("opacity",.9).style("right","100px").style("top","100px"),i.html('<strong>Slice Description: </strong><br><div style={{margin: "1rem"}}> </div>'+t.slice+"<br><strong>Size: </strong><br>"+t.size+" samples<br><strong>"+s+": </strong><br>"+t.metric.toFixed(2)+" "+"(".concat(Math.round((t.metric-a)/a*100),"% difference)"))})).on("mouseout",(function(e,t){C.q(this).attr("r",t.radius).style("opacity","1"),i.transition().style("opacity",0)})).on("click",(function(e,t){j.style("fill",(function(t){return e.target.__data__===t?"#FFD600":n?C.k(Math.abs((t.metric-a)/a)):C.l(Math.abs((t.metric-a)/a))})),c({slice:t.slice,size:t.size,metric:t.metric,similarSlices:[]})}))})),C.q(".g").selectAll("circle").data(m).join("circle").attr("class","node").attr("r",(function(e){return e.radius})).style("fill",(function(e){return n?C.k(Math.abs((e.metric-a)/a)):C.l(Math.abs((e.metric-a)/a))})).style("opacity",(function(e){return"1"})));var x=function(e,t){for(var i=["gray","green","yellow","black","purple"],s=[],a=0;a<b.length;a++){s=[];for(var n=0;n<m.length;n++)m[n].xFeature===b[a][0].split(", ")[0]&&(r<2||m[n].yFeature===b[a][0].split(", ")[1])&&(r<2?s.push([m[n].x+50,400]):s.push([m[n].x+50,m[n].y+200]));var c=C.n(s),l=C.m().curve(C.c);if(!c)return;e.append("path").attr("class","path".concat(r)).attr("d",l(c)).attr("fill",i[0]).attr("stroke",i[0]).attr("opacity",t)}};C.q(".x-axis-grid").call(S),C.q(".y-axis-grid").call(k),C.q(".x-axis").call(O),r>=2?C.q(".y-axis").call(v).style("opacity","1"):C.q(".y-axis").style("opacity","0"),C.q(".switch").on("click",(function(e,t){o(e.target.checked),e.target.checked?C.q(".hull").style("opacity","0").call(x,.25).transition().duration(500).style("opacity","1"):(C.q(".hull").remove(),C.r(".hull").transition().duration(0).style("opacity","0"))}))}),[t,i]);return"force"!==i?null:Object(h.jsxs)("div",{className:"force",children:[Object(h.jsx)("div",{className:"tooltip",style:{position:"absolute",background:"#e6e6e6",right:"100px",top:"100px"}}),Object(h.jsxs)("svg",{viewBox:"0 0 875 875",width:"80%",height:"80%",id:"force-svg",className:"svg",children:[Object(h.jsx)("g",{id:"force-g",className:"g",transform:"translate(50, 200)"}),Object(h.jsx)("g",{className:"x-axis"}),Object(h.jsx)("g",{className:"y-axis"}),Object(h.jsx)("g",{className:"x-axis-grid"}),Object(h.jsx)("g",{className:"y-axis-grid"}),g.map((function(e){return Object(h.jsx)("g",{className:"hull"},e)}))]})]})}var L=Object(i.memo)(D),T=(r(253),r(95)),R=r(96),E=r(141),B=r(142);function I(e){var t=e.data,r=e.degree,i=e.metric,a=e.model,n=e.overperforming,l=e.radiusType,o=e.edgeFiltering,u=e.edgeForce,d=e.setDetails,m=e.cursorMode,j=(e.algorithm,e.setShowConvexHull),x=30,g=30,p=60,f=85,b=s.a.useState(0),y=Object(c.a)(b,2),O=y[0],v=(y[1],Array.from(Array(100).keys()));var S=800,k=800,F=[],w={},z={};if("Log Loss"===i)n?(R,z=B):(z=E,T);else n?R:T;t.forEach((function(e){e.classifiers=[];for(var t=e.slice;-1!==t.indexOf(":");){var i=t.substring(0,t.indexOf(":"));e.classifiers.push(i),F.includes(i)||F.push(i),r===e.classifiers.length&&(w[e.classifiers.join(", ")]?w[e.classifiers.join(", ")]++:w[e.classifiers.join(", ")]=1),t=-1!==t.indexOf(",")?t.substring(t.indexOf(",")+2):""}}));for(var M=Object.keys(w).map((function(e){return[e,w[e]]})).sort((function(e,t){return t[1]-e[1]})).slice(0,15),N=[],A=[],H=(S-f-g)/(F.length+1),D=(k-x-p)/(F.length+2),L=0;L<F.length;L++)N.push(f+(L+1)*H),A.push(2*x+(L+1)*D);var I=C.o().domain(F).rangeRound([f,S-g]).padding(.1),J=function(e){return e.attr("transform","translate(0,".concat(k-p,")")).call(C.a(I).tickSizeOuter(0)).selectAll("text").attr("transform","translate(-10,0)rotate(-45)").style("text-anchor","end")},V=function(e){return e.attr("transform","translate(".concat(f,",").concat(30-p,")")).call(C.b(I).tickSizeOuter(0)).selectAll("text").style("text-anchor","end")},_=function(e){return e.attr("transform","translate(0,".concat(k-p,")")).call(C.a(I).tickSizeOuter(0).tickSizeInner(-800-x+2*p)).style("opacity",.1).selectAll("text").style("display","none")},W=function(e){return e.attr("transform","translate(".concat(f,",").concat(30-p,")")).call(C.b(I).tickSizeOuter(0).tickSizeInner(-800-g+2*f)).style("opacity",.1).selectAll("text").style("display","none")},P=t.map((function(e){var t;return{radius:"log"===l?Math.log(e.size):Math.sqrt(e.size),category:e.degree,xFeature:e.classifiers[0],yFeature:null!==(t=e.classifiers[1])&&void 0!==t?t:e.classifiers[0],slice:e.slice,size:e.size,metric:e.metric,classifiers:e.classifiers}}));for(var G=[],K=0;K<P.length;K++)for(var Q=K+1;Q<P.length;Q++){var U=z[P[K].slice+"-"+P[Q].slice];U>o&&G.push({source:K,target:Q,sliceSource:P[K].slice,sliceTarget:P[Q].slice,count:U})}var X={nodes:P,links:G};function Y(e,t,r){return e<t?t:e>r?r:e}q((function(e){C.q(".hull").remove();var t=(e=C.q(".svg")).selectAll(".link").attr("class","link").data(X.links).join("line").classed("link",!0),s=e.selectAll(".node").data(X.nodes).join("circle").attr("r",(function(e){return e.radius})).style("fill",(function(e){return n?C.k(Math.abs((e.metric-a)/a)):C.l(Math.abs((e.metric-a)/a))})).classed("node",!0).classed("fixed",(function(e){return void 0!==e.fx})).on("mouseover",(function(e,t){"select"===m?C.q(this).attr("r",t.radius).style("opacity","0.7").style("cursor","pointer"):C.q(this).attr("r",t.radius).style("opacity","0.7").style("cursor","grab"),C.q(".tooltip").transition().duration(200).style("opacity",.9).style("right","100px").style("top","100px").style("padding","1rem 1rem 1rem 1rem"),C.q(".tooltip").html('<strong>Slice Description: </strong><br><div style={{margin: "1rem"}}> </div>'+t.slice+"<br><strong>Size: </strong><br>"+t.size+" samples<br><strong>"+i+": </strong><br>"+t.metric.toFixed(2)+" "+"(".concat(Math.round((t.metric-a)/a*100),"% difference)"))})).on("mouseout",(function(e,t){C.q(this).attr("r",t.radius).style("opacity","1"),C.q(".tooltip").transition().style("opacity",0)})).on("click",h),c=C.h().nodes(X.nodes).force("charge",C.g().strength(-5)).force("x",C.i().x((function(e){return N[F.indexOf(e.xFeature)]}))).force("y",C.j().y((function(e){return r>1?A[F.indexOf(e.yFeature)]:400}))).force("link",C.f(X.links).strength((function(e){return e.count/1e4*u}))).force("collision",C.e().radius((function(e){return e.radius}))).on("tick",(function(){t.attr("x1",(function(e){return Math.max(Math.min(e.source.x,S),e.source.radius+100)})).attr("y1",(function(e){return Math.max(Math.min(e.source.y,725),e.source.radius)})).attr("x2",(function(e){return Math.max(Math.min(e.target.x,S),e.target.radius+100)})).attr("y2",(function(e){return Math.max(Math.min(e.target.y,725),e.target.radius)})).style("stroke-width",(function(e){return Math.min(Math.pow(e.count/2e3,2)*u,3*Math.pow(e.count/2e3,2))})),s.attr("cx",(function(e){return Math.max(Math.min(e.x,S),e.radius+100)})).attr("cy",(function(e){return Math.max(Math.min(e.y,725),e.radius)}))}));if("drag"===m){var l=C.d().on("start",(function(e,t){C.q(this).classed("fixed",!0),C.q(this).style("fill","#FFD600"),d({slice:t.slice,size:t.size,metric:t.metric,similarSlices:G.sort((function(e,t){return t.count-e.count})).map((function(e){return e.count>o&&e.sliceSource===t.slice?e.sliceTarget:e.count>o&&e.sliceTarget===t.slice?e.sliceSource:void 0})).filter((function(e){return void 0!==e})).slice(0,10)})})).on("drag",(function(e,t){t.fx=Y(e.x,0,S),t.fy=Y(e.y,0,k),c.alpha(1).restart()}));s.call(l).on("click",h)}function h(e,t){"select"===m?(s.style("fill",(function(t){return e.target.__data__===t?"#FFD600":n?C.k(Math.abs((t.metric-a)/a)):C.l(Math.abs((t.metric-a)/a))})),d({slice:t.slice,size:t.size,metric:t.metric,similarSlices:G.sort((function(e,t){return t.count-e.count})).map((function(e){return e.count>o&&e.sliceSource===t.slice?e.sliceTarget:e.count>o&&e.sliceTarget===t.slice?e.sliceSource:void 0})).filter((function(e){return void 0!==e})).slice(0,10)})):(delete t.fx,delete t.fy,C.q(this).classed("fixed",!1),C.q(this).style("fill",(function(){return n?C.k(Math.abs((t.metric-a)/a)):C.l(Math.abs((t.metric-a)/a))})),c.alpha(1).restart())}var x=function(e,t){for(var i=["gray","green","yellow","black","purple","pink","red","orange","brown","blue","cyan","magenta","lime","navy","olive","teal","violet","wheat"],s=[],a=0;a<M.length;a++){s=[];for(var n=0;n<P.length;n++)P[n].xFeature===M[a][0].split(", ")[0]&&(r<2||P[n].yFeature===M[a][0].split(", ")[1])&&(r<2?s.push([P[n].x,400]):s.push([P[n].x,P[n].y]));var c=C.n(s),l=C.m().curve(C.c);if(!c)return;e.append("path").attr("class","path".concat(r)).attr("d",l(c)).attr("fill",i[0]).attr("stroke",i[0]).attr("opacity",t)}};e.select(".x-axis-grid").call(_),e.select(".y-axis-grid").call(W),e.select(".x-axis").call(J),r>=2?e.select(".y-axis").call(V).style("opacity","1"):e.select(".y-axis").style("opacity","0"),C.q(".switch").on("click",(function(e,t){j(e.target.checked),e.target.checked?C.q(".hull").style("opacity","0").call(x,.25).transition().duration(500).style("opacity","1"):(C.q(".hull").remove(),C.r(".hull").transition().duration(0).style("opacity","0"))}))}),[t,O]);return Object(h.jsxs)("div",{className:"graph",style:{overflow:"scroll"},children:[Object(h.jsx)("div",{className:"tooltip",style:{position:"absolute",background:"#e6e6e6",borderRadius:"20px",padding:"1rem",right:"100px",top:"100px"}}),Object(h.jsxs)("svg",{id:"graph-svg",className:"svg",viewBox:"0 0 875 875",width:"80%",height:"80%",children:[Object(h.jsx)("g",{id:"graph-g",className:"g",transform:"translate(50, 200)"}),Object(h.jsx)("g",{className:"x-axis"}),Object(h.jsx)("g",{className:"y-axis"}),Object(h.jsx)("g",{className:"x-axis-grid"}),Object(h.jsx)("g",{className:"y-axis-grid"}),v.map((function(e){return Object(h.jsx)("g",{className:"hull"},e)}))]}),Object(h.jsx)("br",{})]})}var J=Object(i.memo)(I),V=r(46),_=r(47),W=function(e){var t,r,i,s=e.numFeatures,a=e.sampleSize,n=e.metric,c=e.view,l=e.sortBy,o=e.overperforming,u=e.features,d=e.radius,m=e.edgeFiltering,x=e.edgeForce,g=e.setDetails,p=e.cursorMode,f=e.algorithm,b=e.setShowConvexHull;o?(t=Object.values(_.data).map((function(e){return Object.values(e)[0]})),r=Object.values(V.data).map((function(e){return Object.values(e)[0]})),i=_.model):(t=Object.values(V.data).map((function(e){return Object.values(e)[0]})),r=Object.values(_.data).map((function(e){return Object.values(e)[0]})),i=V.model);var y=t.map((function(e){return e.metric})),O=r.map((function(e){return e.metric})),v=Math.max.apply(Math,Object(j.a)(y).concat(Object(j.a)(O),[i])),S=t.filter((function(e){for(var t=e.slice;t.includes(":");){if(u.includes(t.substring(0,t.indexOf(":"))))return!0;t=t.substring(t.indexOf(":")+1)}return!1})).filter((function(e){return e.size>=a})).filter((function(e){return e.degree<=s})).sort((function(e,t){return"size"===l?t.size-e.size:"Log Loss"===n?o?e.metric-t.metric:t.metric-e.metric:o?t.metric-e.metric:e.metric-t.metric}));return S="bar"===c?S.slice(0,10):S.slice(0,100),Object(h.jsx)("div",{className:"main-container",style:{display:"block",margin:"auto",width:"75%"},children:"bar"===c?Object(h.jsx)(H,{data:S,model:i,max:v,view:c,overperforming:o,metric:n,setDetails:g}):"force"===c?Object(h.jsx)(L,{data:S,degree:s,view:c,metric:n,model:i,overperforming:o,setDetails:g,radius:d,setShowConvexHull:b}):Object(h.jsx)(J,{data:S,degree:s,metric:n,model:i,overperforming:o,radiusType:d,edgeFiltering:m,edgeForce:x,setDetails:g,cursorMode:p,algorithm:f,setShowConvexHull:b})})},P=Object(i.memo)(W);window.onbeforeunload=function(){window.scrollTo(0,0)};var G=function(){var e=s.a.useState("slicefinder"),t=Object(c.a)(e,2),r=t[0],i=t[1],a=s.a.useState(2),n=Object(c.a)(a,2),l=n[0],o=n[1],u=s.a.useState(0),d=Object(c.a)(u,2),j=d[0],x=d[1],g=s.a.useState("Log Loss"),p=Object(c.a)(g,2),f=p[0],b=p[1],y=s.a.useState("bar"),O=Object(c.a)(y,2),v=O[0],S=O[1],k=s.a.useState("metric"),F=Object(c.a)(k,2),w=F[0],z=F[1],C=s.a.useState(!1),q=Object(c.a)(C,2),A=q[0],H=q[1],D=s.a.useState("log"),L=Object(c.a)(D,2),T=L[0],R=L[1],E=s.a.useState(100),B=Object(c.a)(E,2),I=B[0],J=B[1],V=s.a.useState(1),_=Object(c.a)(V,2),W=(_[0],_[1],s.a.useState(1)),G=Object(c.a)(W,2),K=G[0],Q=G[1],U=s.a.useState("drag"),X=Object(c.a)(U,2),Y=X[0],Z=X[1],$=s.a.useState(["Age","Workclass","Education","Education-Num","Marital Status","Occupation","Relationship","Race","Sex","Capital Gain","Capital Loss","Hours Per Week","Country"]),ee=Object(c.a)($,2),te=ee[0],re=ee[1],ie=s.a.useState(null),se=Object(c.a)(ie,2),ae=se[0],ne=se[1],ce=s.a.useCallback((function(e){ne(e)}),[]),le=s.a.useState(!1),oe=Object(c.a)(le,2),ue=oe[0],de=oe[1];return Object(h.jsxs)("div",{className:"App",children:[Object(h.jsx)(m,{view:v,setView:S,algorithm:r,setAlgorithm:i}),Object(h.jsx)(M,{numFeatures:l,setNumFeatures:o,sampleSize:j,setSampleSize:x,metric:f,setMetric:b,sortBy:w,setSortBy:z,overperforming:A,setOverperforming:H,features:te,setFeatures:re,view:v,radius:T,setRadius:R,edgeFiltering:I,setEdgeFiltering:J,edgeForce:K,setEdgeForce:Q,cursorMode:Y,setCursorMode:Z,showConvexHull:ue,setShowConvexHull:de}),Object(h.jsx)(N,{details:ae,metric:f,overperforming:A,view:v,convexHull:ue}),Object(h.jsx)(P,{numFeatures:l,sampleSize:j,metric:f,view:v,sortBy:w,overperforming:A,features:te,radius:T,edgeFiltering:I,edgeForce:K,setDetails:ce,cursorMode:Y,algorithm:r,setShowConvexHull:de})]})};n.a.render(Object(h.jsx)(s.a.StrictMode,{children:Object(h.jsx)(G,{})}),document.getElementById("root"))},46:function(e){e.exports=JSON.parse('{"model":"insert log loss slices","data":"insert log loss slices"}')},47:function(e){e.exports=JSON.parse('{"model":"insert reverse log loss slices","data":"insert reverse log loss slices"}')},95:function(e){e.exports=JSON.parse('{"data":"insert log loss samples"}')},96:function(e){e.exports=JSON.parse('{"data":"insert reverse log loss samples"}')}},[[254,1,2]]]);
//# sourceMappingURL=main.95f44c55.chunk.js.map