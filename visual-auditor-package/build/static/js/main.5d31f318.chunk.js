(this["webpackJsonpvisual-auditor"]=this["webpackJsonpvisual-auditor"]||[]).push([[0],{140:function(e){e.exports=JSON.parse('{"data":"insert common samples"}')},141:function(e){e.exports=JSON.parse('{"data":"insert reverse common samples"}')},237:function(e,t,r){},238:function(e,t,r){},247:function(e,t,r){},248:function(e,t,r){},250:function(e,t,r){},251:function(e,t,r){},252:function(e,t,r){},253:function(e,t,r){"use strict";r.r(t);var i=r(0),s=r.n(i),a=r(40),n=r.n(a),c=(r(237),r(10)),l=r(313),o=r(303),u=r(308),d=r(309),h=(r(238),r(1)),m=function(e){var t=e.view,r=e.setView;e.algorithm,e.setAlgorithm;return Object(h.jsx)("div",{className:"nav-container",children:Object(h.jsxs)(l.a,{sx:{s:1,minWidth:175,paddingRight:1},children:[Object(h.jsx)(u.a,{children:"View:"}),Object(h.jsxs)(o.a,{value:t,label:"View",onChange:function(e){r(e.target.value)},children:[Object(h.jsx)(d.a,{value:"force",children:"Force Layout"}),Object(h.jsx)(d.a,{value:"graph",children:"Graph Layout"}),Object(h.jsx)(d.a,{value:"bar",children:"Bar Chart Layout"})]})]})})},j=r(17),x=r(312),f=r(317),g=r(306),p=r(316),b=r(310),y=r(307),O=r(302),v=r(315),S=r(314),w=r(63),z=(r(247),function(e){e.numFeatures;var t=e.setNumFeatures,r=e.sampleSize,i=e.setSampleSize,a=e.metric,n=e.setMetric,u=e.sortBy,m=e.setSortBy,z=e.overperforming,k=e.setOverperforming,F=e.features,M=e.setFeatures,N=e.view,C=(e.radius,e.setRadius,e.edgeFiltering),A=e.setEdgeFiltering,H=e.edgeForce,D=e.setEdgeForce,T=(e.cursorMode,e.setCursorMode,e.nodeSize),L=e.setNodeSize,E=e.show,B=e.setShow,R=e.showConvexHull,I=e.setShowConvexHull,J=s.a.useState(!1),_=Object(c.a)(J,2),V=_[0],W=_[1];return Object(h.jsx)(x.a,{variant:"permanent",anchor:"left",sx:{display:{xs:"none",sm:"block"},"& .MuiDrawer-paper":{boxSizing:"border-box",width:"15rem"}},children:Object(h.jsxs)("div",{className:"left-container",children:[Object(h.jsxs)("div",{style:{margin:"2rem 0",lineHeight:"0.5rem"},children:[Object(h.jsx)("h1",{children:"Slice Settings"}),"bar"!==N&&Object(h.jsx)("h2",{children:"Each slice is a node"})]}),"graph"===N&&Object(h.jsxs)("div",{style:{lineHeight:"0.5"},children:[Object(h.jsx)("p",{children:Object(h.jsx)("strong",{children:"Edge Filtering:"})}),Object(h.jsx)(S.a,{sx:{width:"10rem",margin:"0 1rem"},children:Object(h.jsx)(g.a,{"aria-label":"Edge Filtering",value:C,valueLabelDisplay:"auto",defaultValue:500,step:100,min:0,max:2e3,size:"small",onChange:function(e){A(e.target.value),I(!1)}})}),Object(h.jsx)("p",{children:Object(h.jsx)("strong",{children:"Edge Force Strength:"})}),Object(h.jsxs)(S.a,{sx:{width:"10rem",margin:"0 1rem"},children:["`            ",Object(h.jsx)(g.a,{"aria-label":"Edge Force Strength",defaultValue:1,value:H,valueLabelDisplay:"auto",step:.01,min:0,max:5,size:"small",onChange:function(e){D(e.target.value),I(!1)}}),"`"]})]}),"bar"===N?Object(h.jsxs)("div",{style:{display:"flex",flexDirection:"row",alignItems:"center"},children:[Object(h.jsx)("p",{children:Object(h.jsx)("strong",{children:"Sort:"})}),Object(h.jsx)(l.a,{sx:{m:0,minWidth:125},size:"small",children:Object(h.jsxs)(o.a,{value:u,onChange:function(e){m(e.target.value),I(!1)},children:[Object(h.jsx)(d.a,{value:"metric",children:a}),Object(h.jsx)(d.a,{value:"size",children:"Slice Size"})]})})]}):Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)("p",{children:Object(h.jsx)("strong",{children:"Size Represents"})}),Object(h.jsx)(l.a,{sx:{s:1,minWidth:175},size:"small",children:Object(h.jsxs)(o.a,{value:T,onChange:function(e){L(e.target.value),I(!1)},children:[Object(h.jsx)(d.a,{value:"size",children:"Slice Sample Size"}),Object(h.jsx)(d.a,{value:"accuracy",children:"Balanced Accuracy"})]})}),Object(h.jsxs)("div",{style:{display:"flex",flexDirection:"row",alignItems:"center"},children:[Object(h.jsx)("div",{style:{width:"75%"},children:Object(h.jsx)("p",{children:Object(h.jsx)("strong",{children:"Convex Hull:"})})}),Object(h.jsx)(v.a,{checked:R,onChange:function(e){e.target.checked&&(W(!0),setTimeout((function(){W(!1)}),4e3)),I(e.target.checked)},label:"Show Convex Hull",className:"switch",disabled:V})]})]}),Object(h.jsxs)("div",{style:{display:"flex",flexDirection:"row",alignItems:"center"},children:[Object(h.jsx)("div",{style:{width:"75%"},children:Object(h.jsx)("p",{children:Object(h.jsx)("strong",{children:"Overperforming:"})})}),Object(h.jsx)(v.a,{checked:z,onChange:function(e){k(e.target.checked),I(!1)},label:"Overperforming Slices"})]}),Object(h.jsx)("p",{children:Object(h.jsx)("strong",{children:"Minimum Slice Size:"})}),Object(h.jsx)(S.a,{sx:{width:"10rem",margin:"1rem"},children:Object(h.jsx)(g.a,{size:"small",defaultValue:100,"aria-label":"Small",value:r,valueLabelDisplay:"auto",min:0,max:250,step:10,onChange:function(e){i(e.target.value),I(!1)}})}),Object(h.jsxs)("div",{style:{display:"flex",flexDirection:"row",alignItems:"center"},children:[Object(h.jsx)("p",{children:Object(h.jsx)("strong",{children:"Show"})}),Object(h.jsx)(l.a,{sx:{s:1,minWidth:125},size:"small",children:Object(h.jsxs)(o.a,{value:E,onChange:function(e){B(e.target.value),I(!1)},children:[Object(h.jsx)(d.a,{value:"ten",children:"Top 10 Slices"}),Object(h.jsx)(d.a,{value:"all",children:"All Slices"})]})})]}),Object(h.jsx)("p",{children:Object(h.jsx)("strong",{children:"Features:"})}),Object(h.jsx)(p.a,{style:{marginLeft:"1rem"},children:w.features.sort().map((function(e){return Object(h.jsx)(b.a,{control:Object(h.jsx)(y.a,{defaultChecked:!0,checked:F.includes(e)}),label:e,onChange:function(t){return function(e,t){e.target.checked?M([].concat(Object(j.a)(F),[t])):M(F.filter((function(e){return e!==t}))),I(!1)}(t,e)}},e)}))}),Object(h.jsx)(O.a,{style:{padding:"1rem"}}),Object(h.jsx)(f.a,{variant:"outlined",onClick:function(e){M(w.features),t(2),i(0),n("Log Loss"),m("metric"),k(!1),A(500),D(1),I(!1)},style:{marginTop:"1rem"},children:"Reset"})]})})}),k=(r(248),r(139)),F=r.n(k),M=r(94),N=r.n(M),C=(r.p,r.p,function(e){var t,r,i=e.details,a=e.metric,n=(e.overperforming,e.view),l=e.convexHull,o=s.a.useState(!0),u=Object(c.a)(o,2),d=u[0],m=u[1],j=function(){m(!1)};return d?Object(h.jsxs)(x.a,{sx:{display:{xs:"none",sm:"block"},"& .MuiDrawer-paper":{boxSizing:"border-box",width:"15rem"}},variant:"persistent",anchor:"right",open:d,children:[" ","bar"===n?Object(h.jsxs)("div",{className:"right-container",children:[Object(h.jsx)(N.a,{onClick:j,style:{position:"relative",left:"-5rem",top:"1rem",opacity:"0.75",cursor:"pointer"}}),Object(h.jsx)("h1",{children:"Legend"}),Object(h.jsxs)("div",{style:{paddingTop:"0.25rem",lineHeight:"0.5rem"},children:[Object(h.jsx)("p",{children:Object(h.jsx)("strong",{children:"Bar Color:"})}),Object(h.jsx)("p",{children:"Performance"})]})]}):Object(h.jsxs)("div",{className:"right-container",children:[Object(h.jsx)(N.a,{onClick:j,style:{position:"relative",left:"-5rem",top:"1rem",opacity:"0.75",cursor:"pointer"}}),Object(h.jsx)("h1",{children:"Legend"}),Object(h.jsxs)("div",{style:{paddingTop:"0.25rem",lineHeight:"0.5rem"},children:[Object(h.jsx)("p",{children:Object(h.jsx)("strong",{children:"Node Color:"})}),Object(h.jsx)("p",{children:"Performance"})]}),Object(h.jsxs)("div",{style:{paddingTop:"0.25rem",lineHeight:"0.5rem"},children:[Object(h.jsx)("p",{children:Object(h.jsx)("strong",{children:"Node Size:"})}),Object(h.jsx)("p",{children:"Slice Sample Size"})]}),"graph"===n&&Object(h.jsxs)("div",{style:{paddingTop:"0.25rem",lineHeight:"0.5rem"},children:[Object(h.jsx)("p",{children:Object(h.jsx)("strong",{children:"Graph Edges:"})}),Object(h.jsx)("p",{children:"Overlapping Samples"})]}),l&&Object(h.jsxs)("div",{style:{paddingTop:"0.25rem",lineHeight:"0.5rem"},children:[Object(h.jsx)("p",{children:Object(h.jsx)("strong",{children:"Convex Hull:"})}),Object(h.jsx)("p",{children:"Same Features"})]})]}),null===i?Object(h.jsxs)("div",{className:"right-container",children:[Object(h.jsx)("h1",{children:"Selected Slice"}),Object(h.jsx)("p",{className:"thin",children:"Click on a slice to view the slice details"})]}):Object(h.jsxs)("div",{className:"right-container",children:[Object(h.jsx)("h1",{children:"Selected Slice"}),Object(h.jsxs)("div",{style:{paddingTop:"0.25rem",lineHeight:"0.5rem"},children:[Object(h.jsx)("p",{children:Object(h.jsx)("strong",{children:"Slice Definition:"})}),i.slice.split(", ").map((function(e){return Object(h.jsx)("p",{children:e})}))]}),Object(h.jsxs)("div",{style:{paddingTop:"0.25rem",lineHeight:"0.5rem"},children:[Object(h.jsx)("p",{children:Object(h.jsx)("strong",{children:"Slice Size:"})}),Object(h.jsxs)("p",{children:[" ",null===i||void 0===i?void 0:i.size," samples"]})]}),Object(h.jsxs)("div",{style:{paddingTop:"0.25rem",lineHeight:"0.5rem"},children:[Object(h.jsx)("p",{children:Object(h.jsxs)("strong",{children:["Slice ",a,":"]})}),Object(h.jsx)("p",{children:null===i||void 0===i||null===(t=i.metric)||void 0===t?void 0:t.toFixed(3)})]}),(null===i||void 0===i||null===(r=i.similarSlices)||void 0===r?void 0:r.length)>0?Object(h.jsxs)("div",{style:{paddingTop:"0.25rem",lineHeight:"1.25rem"},children:[Object(h.jsx)("p",{children:Object(h.jsx)("strong",{children:"Similar Slices:"})}),Object(h.jsx)("ul",{className:"similar-slices-list",children:null===i||void 0===i?void 0:i.similarSlices.map((function(e){return Object(h.jsx)("li",{className:"similar-slice",children:e})}))})]}):null]})]}):Object(h.jsx)(F.a,{onClick:function(){m(!0)},style:{position:"absolute",right:"2rem",top:"2rem",cursor:"pointer",opacity:"0.75"},children:"Open"})}),A=r(7),H=function(e,t){var r=s.a.useRef();return s.a.useEffect((function(){return e(A.r(r.current)),function(){}}),t),r};function D(e){var t=e.data,r=e.model,i=e.max,a=e.overperforming,n=e.metric,l=e.setDetails,o=s.a.useState(null),u=Object(c.a)(o,2),d=u[0],m=u[1],j=s.a.useState(!1),x=Object(c.a)(j,2),f=x[0],g=x[1];s.a.useEffect((function(){g(!1)}),[t]);var p=H((function(e){var s=600,c=60,o=30,u=50,h=90,j=A.r(".tooltip").style("opacity",0).style("width","200px").style("height","150px").style("padding","1rem 1rem 0rem 1rem").style("border-radius","20px"),x=A.p().domain(t.map((function(e){return e.slice}))).rangeRound([h,875-o]).padding(.1),p=A.q().domain([0,i]).rangeRound([s-u,c]);e.select(".x-axis").call((function(e){return e.attr("transform","translate(0,".concat(s-u,")")).call(A.a(x).tickSizeOuter(0)).selectAll("text").style("font","14px").attr("transform","translate(-10,0)rotate(-45)").style("text-anchor","end")})),e.select(".y-axis").call((function(e){return e.attr("transform","translate(".concat(h,",0)")).style("color","steelblue").call(A.b(p).ticks(null,"s")).call((function(e){return e.select(".domain").remove()})).call((function(e){return e.append("text").attr("x",-h).attr("y",10).attr("fill","currentColor").attr("text-anchor","start").text(t.y1)}))})),e.select(".plot-area").selectAll(".bar").data(t).join("rect").attr("class","bar").attr("style",(function(e){if(e.slice===d)return"outline: 3px solid #FFD600;"})).style("fill",(function(e){return a?A.l(Math.abs((e.metric-r)/r)):A.m(Math.abs((e.metric-r)/r))})).on("mouseover",(function(e,t){A.r(this).style("opacity","0.7").style("cursor","pointer"),j.transition().duration(200).style("opacity",.9).style("right","20%").style("top","100px"),j.html('<strong>Slice Description: </strong><br><div style={{margin: "1rem"}}> </div>'+t.slice+"<br><strong>Size: </strong><br>"+t.size+" samples<br><strong>"+n+": </strong><br>"+t.metric.toFixed(2)+" "+"(".concat(Math.round((t.metric-r)/r*100),"% difference)"))})).on("mouseout",(function(e){A.r(this).style("opacity","1"),j.transition().style("opacity",0)})).on("click",(function(e,t){m(t.slice),l({slice:t.slice,size:t.size,metric:t.metric,similarSlices:[]})})).attr("x",(function(e){return x(e.slice)})).attr("width",x.bandwidth()).attr("y",(function(e){return p(0)-u})).attr("height",(function(e){return s-p(0)})),f?e.selectAll("rect").attr("y",(function(e){return p(e.metric)-u})).attr("height",(function(e){return s-p(e.metric)})):(e.selectAll("rect").transition().duration(800).attr("y",(function(e){return p(e.metric)-u})).attr("height",(function(e){return s-p(e.metric)})).delay((function(e,t){return 100*t})),g(!0)),e.selectAll(".line").remove(),e.selectAll(".label").remove(),e.append("svg:line").attr("class","line").attr("x1",60).attr("x2",875).attr("y1",p(r)).attr("y2",p(r)).style("stroke","#e6e6e6"),e.append("text").attr("class","label").text("Model").attr("x",0).attr("y",p(r)+5).style("fill","gray"),e.append("text").attr("class","label").text(n).attr("x",0).attr("y",p(r)+25).style("fill","gray")}),[t,n,d]);return Object(h.jsxs)("div",{style:{width:"100%"},children:[Object(h.jsx)("div",{className:"tooltip",style:{position:"absolute",background:"lightgray",right:"20%",top:"100px"}}),Object(h.jsxs)("svg",{ref:p,viewBox:"0 0 875 875",width:"80%",height:"80%",style:{margin:"auto",display:"block"},children:[Object(h.jsx)("g",{className:"plot-area"}),Object(h.jsx)("g",{className:"x-axis"}),Object(h.jsx)("g",{className:"y-axis"}),Object(h.jsx)("g",{className:"label"})]})]})}var T=Object(i.memo)(D);r(250),r(251);function L(e){var t=e.data,r=e.degree,i=e.view,s=e.metric,a=e.model,n=e.overperforming,c=e.setDetails,l=e.radius,o=e.setShowConvexHull,u=50,d=30,m=70,j=85,x=800,f=Array.from(Array(100).keys()),g=[],p={};t.forEach((function(e){e.classifiers=[];for(var t=e.slice;-1!==t.indexOf(":");){var i=t.substring(0,t.indexOf(":"));e.classifiers.push(i),g.includes(i)||g.push(i),r===e.classifiers.length&&(p[e.classifiers.join(", ")]?p[e.classifiers.join(", ")]++:p[e.classifiers.join(", ")]=1),t=-1!==t.indexOf(",")?t.substring(t.indexOf(",")+2):""}})),g=g.sort();var b=Object.keys(p).map((function(e){return[e,p[e]]})).sort((function(e,t){return t[1]-e[1]})).slice(0,15),y=A.p().domain(g).rangeRound([j,800-d]).padding(.1),O=function(e){return e.attr("transform","translate(0,".concat(x-m-670,")")).call(A.c(y).tickSizeOuter(0)).selectAll("text").style("font-size","14px").attr("transform","translate(10,-10)rotate(-45)").style("text-anchor","start")},v=function(e){return e.attr("transform","translate(".concat(j,",").concat(30-m,")")).call(A.b(y).tickSizeOuter(0)).selectAll("text").style("font-size","14px").style("text-anchor","end")},S=function(e){return e.attr("transform","translate(0,".concat(x-m,")")).call(A.a(y).tickSizeOuter(0).tickSizeInner(-800-u+2*m)).style("opacity",.1).selectAll("text").style("display","none")},w=function(e){return e.attr("transform","translate(".concat(j,",").concat(30-m,")")).call(A.b(y).tickSizeOuter(0).tickSizeInner(-800-d+2*j)).style("opacity",.1).selectAll("text").style("display","none")};H((function(e){A.r(".hull").remove();for(var i=A.r(".tooltip").style("opacity",0).style("width","200px").style("height","150px").style("padding","1rem 1rem 0 1rem").style("border-radius","20px"),u=[],d=[],h=0;h<g.length;h++)u.push(650/g.length*h+100),d.push(625/g.length*h-100);var m=t.map((function(e){var t;return{radius:"log"===l?2*Math.log(e.size):Math.sqrt(e.size),category:e.degree,xFeature:e.classifiers[0],yFeature:null!==(t=e.classifiers[1])&&void 0!==t?t:e.classifiers[0],slice:e.slice,size:e.size,metric:e.metric}})),j=(A.i(m).force("charge",A.h().strength(-5)).force("x",A.j().x((function(e){return u[g.indexOf(e.xFeature)]-20}))).force("y",A.k().y((function(e){return r>1?d[g.indexOf(e.yFeature)]:200}))).force("collision",A.f().radius((function(e){return e.radius}))).on("tick",(function(){j.attr("cx",(function(e){return e.x})).attr("cy",(function(e){return e.y})).on("mouseover",(function(e,t){A.r(this).attr("r",1.1*t.radius).style("opacity","0.7").style("cursor","pointer"),i.transition().duration(0).style("display","block").style("opacity",.9).style("left",e.clientX+50+"px").style("top",e.clientY+"px"),i.html('<strong>Slice Description: </strong><br><div style={{margin: "1rem"}}> </div>'+t.slice+"<br><strong>Size: </strong><br>"+t.size+" samples<br><strong>"+s+": </strong><br>"+t.metric.toFixed(2)+" "+"(".concat(Math.round((t.metric-a)/a*100),"% difference)"))})).on("mouseout",(function(e,t){A.r(this).attr("r",t.radius).style("opacity","1"),i.transition().duration(50).style("opacity",0).style("display","none")})).on("click",(function(e,t){j.style("fill",(function(t){return e.target.__data__===t?"#FFD600":n?A.l(Math.abs((t.metric-a)/a)):A.m(Math.abs((t.metric-a)/a))})),c({slice:t.slice,size:t.size,metric:t.metric,similarSlices:[]})}))})),A.r(".g").selectAll("circle").data(m).join("circle").attr("class","node").attr("r",(function(e){return e.radius})).style("fill",(function(e){return n?A.l(Math.abs((e.metric-a)/a)):A.m(Math.abs((e.metric-a)/a))})).style("opacity",(function(e){return"1"})));var x=function(e,t){for(var i=["gray","green","yellow","black","purple"],s=[],a=0;a<b.length;a++){s=[];for(var n=0;n<m.length;n++)m[n].xFeature===b[a][0].split(", ")[0]&&(r<2||m[n].yFeature===b[a][0].split(", ")[1])&&(r<2?s.push([m[n].x+50,400]):s.push([m[n].x+50,m[n].y+200]));var c=A.o(s),l=A.n().curve(A.d);if(!c)return;e.append("path").attr("class","path".concat(r)).attr("d",l(c)).attr("fill",i[0]).attr("stroke",i[0]).attr("opacity",t)}};A.r(".x-axis-grid").call(S),A.r(".y-axis-grid").call(w),A.r(".x-axis").call(O),r>=2?A.r(".y-axis").call(v).style("opacity","1"):A.r(".y-axis").style("opacity","0"),A.r(".switch").on("click",(function(e,t){o(e.target.checked),e.target.checked?A.r(".hull").style("opacity","0").call(x,.25).transition().duration(500).style("opacity","1"):(A.r(".hull").remove(),A.s(".hull").transition().duration(0).style("opacity","0"))}))}),[t,i]);return"force"!==i?null:Object(h.jsxs)("div",{className:"force",children:[Object(h.jsx)("div",{className:"tooltip",style:{position:"absolute",background:"#e6e6e6",right:"20%",top:"100px"}}),Object(h.jsx)("svg",{viewBox:"0 0 875 875",width:"80%",height:"100%",id:"force-svg",className:"svg",style:{margin:"0 auto",display:"block",height:"1000px"},children:Object(h.jsxs)("g",{transform:"translate(50, 0)",children:[Object(h.jsx)("g",{id:"force-g",className:"g",transform:"translate(50, 200)"}),Object(h.jsx)("g",{className:"x-axis",style:{padding:"100px"}}),Object(h.jsx)("g",{className:"y-axis"}),Object(h.jsx)("g",{className:"x-axis-grid"}),Object(h.jsx)("g",{className:"y-axis-grid"}),f.map((function(e){return Object(h.jsx)("g",{className:"hull"},e)}))]})})]})}var E=Object(i.memo)(L),B=(r(252),r(95)),R=r(96),I=r(140),J=r(141);function _(e){var t=e.data,r=e.degree,i=e.metric,a=e.model,n=e.overperforming,l=e.radiusType,o=e.edgeFiltering,u=e.edgeForce,d=e.setDetails,m=e.cursorMode,j=(e.algorithm,e.setShowConvexHull),x=50,f=30,g=70,p=85,b=s.a.useState(0),y=Object(c.a)(b,2),O=y[0],v=(y[1],Array.from(Array(100).keys()));var S=800,w=800,z=[],k={},F={};if("Log Loss"===i)n?(R,F=J):(F=I,B);else n?R:B;t.forEach((function(e){e.classifiers=[];for(var t=e.slice;-1!==t.indexOf(":");){var i=t.substring(0,t.indexOf(":"));e.classifiers.push(i),z.includes(i)||z.push(i),r===e.classifiers.length&&(k[e.classifiers.join(", ")]?k[e.classifiers.join(", ")]++:k[e.classifiers.join(", ")]=1),t=-1!==t.indexOf(",")?t.substring(t.indexOf(",")+2):""}})),z=z.sort();for(var M=Object.keys(k).map((function(e){return[e,k[e]]})).sort((function(e,t){return t[1]-e[1]})).slice(0,15),N=[],C=[],D=(S-p-f)/(z.length+1),T=(w-x-g)/(z.length+2),L=0;L<z.length;L++)N.push(p+(L+1)*D),C.push(2*x+(L+1)*T);var E=A.p().domain(z).rangeRound([p,S-f]).padding(.1),_=function(e){return e.attr("transform","translate(0,".concat(w-g-670,")")).call(A.c(E).tickSizeOuter(0)).selectAll("text").style("font-size","14px").attr("transform","translate(10,-10)rotate(-45)").style("text-anchor","start")},V=function(e){return e.attr("transform","translate(".concat(p,",").concat(30-g,")")).call(A.b(E).tickSizeOuter(0)).selectAll("text").style("font-size","14px").style("text-anchor","end")},W=function(e){return e.attr("transform","translate(0,".concat(w-g,")")).call(A.a(E).tickSizeOuter(0).tickSizeInner(-800-x+2*g)).style("opacity",.1).selectAll("text").style("display","none")},q=function(e){return e.attr("transform","translate(".concat(p,",").concat(30-g,")")).call(A.b(E).tickSizeOuter(0).tickSizeInner(-800-f+2*p)).style("opacity",.1).selectAll("text").style("display","none")},G=t.map((function(e){var t;return{radius:"log"===l?2*Math.log(e.size):Math.sqrt(e.size),category:e.degree,xFeature:e.classifiers[0],yFeature:null!==(t=e.classifiers[1])&&void 0!==t?t:e.classifiers[0],slice:e.slice,size:e.size,metric:e.metric,classifiers:e.classifiers}}));for(var P=[],X=0;X<G.length;X++)for(var Y=X+1;Y<G.length;Y++){var K=F[G[X].slice+"-"+G[Y].slice];K>o&&P.push({source:X,target:Y,sliceSource:G[X].slice,sliceTarget:G[Y].slice,count:K})}var Q={nodes:G,links:P};function U(e,t,r){return e<t?t:e>r?r:e}H((function(e){A.r(".hull").remove();var t=(e=A.r(".svg")).selectAll(".link").attr("class","link").data(Q.links).join("line").classed("link",!0),s=e.selectAll(".node").data(Q.nodes).join("circle").attr("r",(function(e){return e.radius})).style("fill",(function(e){return n?A.l(Math.abs((e.metric-a)/a)):A.m(Math.abs((e.metric-a)/a))})).classed("node",!0).classed("fixed",(function(e){return void 0!==e.fx})).on("mouseover",(function(e,t){"select"===m?A.r(this).attr("r",t.radius).style("opacity","0.7").style("cursor","pointer"):A.r(this).attr("r",t.radius).style("opacity","0.7").style("cursor","grab"),A.r(".tooltip").transition().duration(200).attr("max-width","200px").style("display","block").style("opacity",.9).style("left",e.clientX+100+"px").style("top",e.clientY+"px").style("padding","1rem 1rem 1rem 1rem"),A.r(".tooltip").html('<strong>Slice Description: </strong><br><div style={{margin: "1rem"}}> </div>'+t.slice+"<br><strong>Size: </strong><br>"+t.size+" samples<br><strong>"+i+": </strong><br>"+t.metric.toFixed(2)+" "+"(".concat(Math.round((t.metric-a)/a*100),"% difference)"))})).on("mouseout",(function(e,t){A.r(this).attr("r",t.radius).style("opacity","1"),A.r(".tooltip").transition().style("opacity",0).style("display","none")})).on("click",h),c=A.i().nodes(Q.nodes).force("charge",A.h().strength(-5)).force("x",A.j().x((function(e){return N[z.indexOf(e.xFeature)]}))).force("y",A.k().y((function(e){return r>1?C[z.indexOf(e.yFeature)]:400}))).force("link",A.g(Q.links).strength((function(e){return e.count/1e4*u}))).force("collision",A.f().radius((function(e){return e.radius}))).on("tick",(function(){t.attr("x1",(function(e){return Math.max(Math.min(e.source.x,S),e.source.radius+100)+50})).attr("y1",(function(e){return Math.max(Math.min(e.source.y,725),e.source.radius)})).attr("x2",(function(e){return Math.max(Math.min(e.target.x,S),e.target.radius+100)+50})).attr("y2",(function(e){return Math.max(Math.min(e.target.y,725),e.target.radius)})).style("stroke-width",(function(e){return Math.min(Math.pow(e.count/2e3,2)*u,3*Math.pow(e.count/2e3,2))})),s.attr("cx",(function(e){return Math.max(Math.min(e.x,S),e.radius+100)+50})).attr("cy",(function(e){return Math.max(Math.min(e.y,725),e.radius)}))}));if("drag"===m){var l=A.e().on("start",(function(e,t){A.r(this).classed("fixed",!0),A.r(this).style("fill","#FFD600"),d({slice:t.slice,size:t.size,metric:t.metric,similarSlices:P.sort((function(e,t){return t.count-e.count})).map((function(e){return e.count>o&&e.sliceSource===t.slice?e.sliceTarget:e.count>o&&e.sliceTarget===t.slice?e.sliceSource:void 0})).filter((function(e){return void 0!==e})).slice(0,10)})})).on("drag",(function(e,t){t.fx=U(e.x,0,S),t.fy=U(e.y,0,w),c.alpha(1).restart()}));s.call(l).on("click",h)}function h(e,t){"select"===m?(s.style("fill",(function(t){return e.target.__data__===t?"#FFD600":n?A.l(Math.abs((t.metric-a)/a)):A.m(Math.abs((t.metric-a)/a))})),d({slice:t.slice,size:t.size,metric:t.metric,similarSlices:P.sort((function(e,t){return t.count-e.count})).map((function(e){return e.count>o&&e.sliceSource===t.slice?e.sliceTarget:e.count>o&&e.sliceTarget===t.slice?e.sliceSource:void 0})).filter((function(e){return void 0!==e})).slice(0,10)})):(delete t.fx,delete t.fy,A.r(this).classed("fixed",!1),A.r(this).style("fill",(function(){return n?A.l(Math.abs((t.metric-a)/a)):A.m(Math.abs((t.metric-a)/a))})),c.alpha(1).restart())}var x=function(e,t){for(var i=["gray","green","yellow","black","purple","pink","red","orange","brown","blue","cyan","magenta","lime","navy","olive","teal","violet","wheat"],s=[],a=0;a<M.length;a++){s=[];for(var n=0;n<G.length;n++)G[n].xFeature===M[a][0].split(", ")[0]&&(r<2||G[n].yFeature===M[a][0].split(", ")[1])&&(r<2?s.push([G[n].x,400]):s.push([G[n].x,G[n].y]));var c=A.o(s),l=A.n().curve(A.d);if(!c)return;e.append("path").attr("class","path".concat(r)).attr("d",l(c)).attr("fill",i[0]).attr("stroke",i[0]).attr("opacity",t)}};e.select(".x-axis-grid").call(W),e.select(".y-axis-grid").call(q),e.select(".x-axis").call(_),r>=2?e.select(".y-axis").call(V).style("opacity","1"):e.select(".y-axis").style("opacity","0"),A.r(".switch").on("click",(function(e,t){j(e.target.checked),e.target.checked?A.r(".hull").style("opacity","0").call(x,.25).transition().duration(500).style("opacity","1"):(A.r(".hull").remove(),A.s(".hull").transition().duration(0).style("opacity","0"))}))}),[t,O]);return Object(h.jsxs)("div",{className:"graph",style:{overflow:"scroll"},children:[Object(h.jsx)("div",{className:"tooltip",style:{position:"absolute",background:"#e6e6e6",borderRadius:"20px",padding:"1rem"}}),Object(h.jsx)("svg",{id:"graph-svg",className:"svg",viewBox:"0 0 875 875",width:"80%",height:"80%",style:{margin:"0 auto",display:"block",height:"1000px"},children:Object(h.jsxs)("g",{transform:"translate(50, 0)",children:[Object(h.jsx)("g",{id:"graph-g",className:"g",transform:"translate(50, 200)"}),Object(h.jsx)("g",{className:"x-axis"}),Object(h.jsx)("g",{className:"y-axis"}),Object(h.jsx)("g",{className:"x-axis-grid"}),Object(h.jsx)("g",{className:"y-axis-grid"}),v.map((function(e){return Object(h.jsx)("g",{className:"hull"},e)}))]})}),Object(h.jsx)("br",{})]})}var V=Object(i.memo)(_),W=r(76),q=r(77),G=function(e){var t,r,i,s=e.numFeatures,a=e.sampleSize,n=e.metric,c=e.view,l=e.sortBy,o=e.overperforming,u=e.features,d=e.radius,m=e.edgeFiltering,x=e.edgeForce,f=e.setDetails,g=e.cursorMode,p=e.show,b=e.algorithm,y=e.setShowConvexHull;e.nodeSize;o?(t=Object.values(q.data).map((function(e){return Object.values(e)[0]})),r=Object.values(W.data).map((function(e){return Object.values(e)[0]})),i=q.model):(t=Object.values(W.data).map((function(e){return Object.values(e)[0]})),r=Object.values(q.data).map((function(e){return Object.values(e)[0]})),i=W.model);var O=t.map((function(e){return e.metric})),v=r.map((function(e){return e.metric})),S=Math.max.apply(Math,Object(j.a)(O).concat(Object(j.a)(v),[i])),w=t.filter((function(e){for(var t=e.slice;t.includes(":");){if(u.includes(t.substring(0,t.indexOf(":"))))return!0;t=t.substring(t.indexOf(":")+1)}return!1})).filter((function(e){return e.size>=a})).filter((function(e){return e.degree<=s})).sort((function(e,t){return"size"===l?t.size-e.size:"Log Loss"===n?o?e.metric-t.metric:t.metric-e.metric:o?t.metric-e.metric:e.metric-t.metric}));return w="bar"===c||"ten"===p?w.slice(0,10):w,Object(h.jsx)("div",{className:"main-container",style:{display:"block",margin:"auto",width:"75%"},children:"bar"===c?Object(h.jsx)(T,{data:w,model:i,max:S,view:c,overperforming:o,metric:n,setDetails:f}):"force"===c?Object(h.jsx)(E,{data:w,degree:s,view:c,metric:n,model:i,overperforming:o,setDetails:f,radius:d,setShowConvexHull:y}):Object(h.jsx)(V,{data:w,degree:s,metric:n,model:i,overperforming:o,radiusType:d,edgeFiltering:m,edgeForce:x,setDetails:f,cursorMode:g,algorithm:b,setShowConvexHull:y})})},P=Object(i.memo)(G);window.onbeforeunload=function(){window.scrollTo(0,0)};var X=function(){var e=s.a.useState("slicefinder"),t=Object(c.a)(e,2),r=t[0],i=t[1],a=s.a.useState(2),n=Object(c.a)(a,2),l=n[0],o=n[1],u=s.a.useState(0),d=Object(c.a)(u,2),j=d[0],x=d[1],f=s.a.useState("Log Loss"),g=Object(c.a)(f,2),p=g[0],b=g[1],y=s.a.useState("force"),O=Object(c.a)(y,2),v=O[0],S=O[1],k=s.a.useState("metric"),F=Object(c.a)(k,2),M=F[0],N=F[1],A=s.a.useState(!1),H=Object(c.a)(A,2),D=H[0],T=H[1],L=s.a.useState("log"),E=Object(c.a)(L,2),B=E[0],R=E[1],I=s.a.useState(500),J=Object(c.a)(I,2),_=J[0],V=J[1],W=s.a.useState(1),q=Object(c.a)(W,2),G=(q[0],q[1],s.a.useState(1)),X=Object(c.a)(G,2),Y=X[0],K=X[1],Q=s.a.useState("select"),U=Object(c.a)(Q,2),Z=U[0],$=U[1],ee=s.a.useState("ten"),te=Object(c.a)(ee,2),re=te[0],ie=te[1],se=s.a.useState("size"),ae=Object(c.a)(se,2),ne=ae[0],ce=ae[1],le=s.a.useState(w.features),oe=Object(c.a)(le,2),ue=oe[0],de=oe[1],he=s.a.useState(null),me=Object(c.a)(he,2),je=me[0],xe=me[1],fe=s.a.useCallback((function(e){xe(e)}),[]),ge=s.a.useState(!1),pe=Object(c.a)(ge,2),be=pe[0],ye=pe[1];return Object(h.jsxs)("div",{className:"App",children:[Object(h.jsx)(m,{view:v,setView:S,algorithm:r,setAlgorithm:i}),Object(h.jsx)(z,{numFeatures:l,setNumFeatures:o,sampleSize:j,setSampleSize:x,metric:p,setMetric:b,sortBy:M,setSortBy:N,overperforming:D,setOverperforming:T,features:ue,setFeatures:de,view:v,radius:B,setRadius:R,edgeFiltering:_,setEdgeFiltering:V,edgeForce:Y,setEdgeForce:K,cursorMode:Z,setCursorMode:$,show:re,setShow:ie,nodeSize:ne,setNodeSize:ce,showConvexHull:be,setShowConvexHull:ye}),Object(h.jsx)(C,{details:je,metric:p,overperforming:D,view:v,convexHull:be}),Object(h.jsx)(P,{numFeatures:l,sampleSize:j,metric:p,view:v,sortBy:M,overperforming:D,features:ue,radius:B,edgeFiltering:_,edgeForce:Y,setDetails:fe,cursorMode:Z,show:re,algorithm:r,setShowConvexHull:ye,nodeSize:ne})]})};n.a.render(Object(h.jsx)(s.a.StrictMode,{children:Object(h.jsx)(X,{})}),document.getElementById("root"))},63:function(e){e.exports=JSON.parse('{"features":["insert dataset features"]}')},76:function(e){e.exports=JSON.parse('{"model":"insert log loss slices","data":"insert log loss slices"}')},77:function(e){e.exports=JSON.parse('{"model":"insert reverse log loss slices","data":"insert reverse log loss slices"}')},95:function(e){e.exports=JSON.parse('{"data":"insert log loss samples"}')},96:function(e){e.exports=JSON.parse('{"data":"insert reverse log loss samples"}')}},[[253,1,2]]]);
//# sourceMappingURL=main.5d31f318.chunk.js.map