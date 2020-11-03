(this.webpackJsonpstatic=this.webpackJsonpstatic||[]).push([[0],{31:function(e,t,n){},33:function(e,t,n){},39:function(e,t,n){"use strict";n.r(t);var s=n(0),a=n(1),r=n.n(a),i=n(24),c=n.n(i),o=(n(31),function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,40)).then((function(t){var n=t.getCLS,s=t.getFID,a=t.getFCP,r=t.getLCP,i=t.getTTFB;n(e),s(e),a(e),r(e),i(e)}))}),l=n(7),h=n(14),u=n.n(h),j=n(18),d=n(9),p=n(10),b=n(8),m=n(12),f=n(11),O=(n(33),n(15)),g=n.n(O);var x=function(e){return Object(s.jsxs)(r.a.Fragment,{children:[Object(s.jsx)("h2",{children:"Home Page"}),Object(s.jsx)(l.b,{to:"/register",className:"nav-link",children:"Register"})]})};var v=function(e){return Object(s.jsxs)("nav",{className:"navbar",children:[Object(s.jsx)(l.b,{to:"/",className:"nav-link",children:"Home"}),!1===e.isLoggedIn?Object(s.jsx)(l.b,{to:"/login",className:"nav-link",children:"Login"}):Object(s.jsxs)(r.a.Fragment,{children:[Object(s.jsx)(l.b,{to:"/",className:"nav-link",onClick:e.handleLogout,children:"Logout"}),Object(s.jsx)(l.b,{to:"/profile",className:"nav-link",children:"Profile"})]})]})},y=n(17),I=function(e){Object(m.a)(n,e);var t=Object(f.a)(n);function n(e){var s;return Object(d.a)(this,n),(s=t.call(this,e)).state={username:"",email:"",password1:"",password2:""},s.handleInput=s.handleInput.bind(Object(b.a)(s)),s}return Object(p.a)(n,[{key:"handleInput",value:function(e){this.setState(Object(y.a)({},e.target.name,e.target.value))}},{key:"render",value:function(){var e=this;return Object(s.jsxs)("form",{onSubmit:function(t){return e.props.handleRegistration(t,e.state)},children:[Object(s.jsx)("h4",{children:"Register"}),Object(s.jsxs)("div",{className:"form-group",children:[Object(s.jsx)("label",{htmlFor:"InputName1",children:"Username"}),Object(s.jsx)("input",{type:"username",className:"form-control",id:"InputName1",name:"username",value:this.state.username,onChange:this.handleInput})]}),Object(s.jsxs)("div",{className:"form-group",children:[Object(s.jsx)("label",{htmlFor:"InputEmail1",children:"Email address"}),Object(s.jsx)("input",{type:"email",className:"form-control",id:"InputEmail1","aria-describedby":"emailHelp",name:"email",value:this.state.email,onChange:this.handleInput})]}),Object(s.jsxs)("div",{className:"form-group",children:[Object(s.jsx)("label",{htmlFor:"InputPassword1",children:"Create password"}),Object(s.jsx)("input",{type:"password",className:"form-control",id:"InputPassword1",name:"password1",value:this.state.password1,onChange:this.handleInput})]}),Object(s.jsxs)("div",{className:"form-group",children:[Object(s.jsx)("label",{htmlFor:"InputPassword2",children:"Re-type password"}),Object(s.jsx)("input",{type:"password",className:"form-control",id:"InputPassword2",name:"password2",value:this.state.password2,onChange:this.handleInput})]}),Object(s.jsx)("button",{type:"submit",className:"button",children:"Register"})]})}}]),n}(a.Component),k=function(e){Object(m.a)(n,e);var t=Object(f.a)(n);function n(e){var s;return Object(d.a)(this,n),(s=t.call(this,e)).state={username:"",password:""},s.handleInput=s.handleInput.bind(Object(b.a)(s)),s}return Object(p.a)(n,[{key:"handleInput",value:function(e){this.setState(Object(y.a)({},e.target.name,e.target.value))}},{key:"render",value:function(){var e=this;return Object(s.jsxs)("form",{onSubmit:function(t){return e.props.handleLogin(t,e.state)},children:[Object(s.jsx)("h4",{children:"Login"}),Object(s.jsxs)("div",{className:"form-group",children:[Object(s.jsx)("label",{htmlFor:"InputName2",children:"Username"}),Object(s.jsx)("input",{type:"username",className:"form-control",id:"InputName2",name:"username",value:this.state.username,onChange:this.handleInput})]}),Object(s.jsxs)("div",{className:"form-group",children:[Object(s.jsx)("label",{htmlFor:"InputPassword",children:"Password"}),Object(s.jsx)("input",{type:"password",className:"form-control",id:"InputPassword",name:"password",value:this.state.password,onChange:this.handleInput})]}),Object(s.jsx)("button",{type:"submit",className:"button",children:"Login"})]})}}]),n}(a.Component),w=function(e){Object(m.a)(n,e);var t=Object(f.a)(n);function n(e){var s;return Object(d.a)(this,n),(s=t.call(this,e)).state={profile:{}},s}return Object(p.a)(n,[{key:"componentDidMount",value:function(){var e=this;fetch("profiles/detail/").then((function(e){return e.json()})).then((function(t){return e.setState({profile:t})})).catch((function(e){return console.log("Error:",e)}))}},{key:"render",value:function(){return Object(s.jsx)(r.a.Fragment,{children:Object(s.jsxs)("div",{children:[Object(s.jsx)("div",{children:Object(s.jsx)("img",{src:this.state.profile.image,alt:"Profile"})}),Object(s.jsxs)("div",{children:[Object(s.jsx)("h3",{children:"Name"}),Object(s.jsxs)("p",{children:[this.state.profile.first," ",this.state.profile.last]})]}),Object(s.jsxs)("div",{children:[Object(s.jsx)("h3",{children:"Address"}),Object(s.jsx)("p",{children:this.state.profile.address}),Object(s.jsx)("br",{}),Object(s.jsxs)("p",{children:[this.state.profile.city,", ",this.state.profile.state," ",this.state.profile.zipcode]}),Object(s.jsx)("br",{})]}),Object(s.jsxs)("div",{children:[Object(s.jsx)("h3",{children:"Phone Number"}),Object(s.jsx)("p",{children:this.state.profile.phone})]}),Object(s.jsx)("button",{})]})})}}]),n}(a.Component),N=n(2),L=function(e){Object(m.a)(n,e);var t=Object(f.a)(n);function n(e){var s;return Object(d.a)(this,n),(s=t.call(this,e)).state={isLoggedIn:!1},s.handleRegistration=s.handleRegistration.bind(Object(b.a)(s)),s.handleLogin=s.handleLogin.bind(Object(b.a)(s)),s.handleLogout=s.handleLogout.bind(Object(b.a)(s)),s}return Object(p.a)(n,[{key:"handleRegistration",value:function(){var e=Object(j.a)(u.a.mark((function e(t,n){var s,a,r,i;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),s={method:"POST",headers:{"Content-Type":"application/json","X-CSRFToken":g.a.get("csrftoken")},body:JSON.stringify(n)},a=function(e){return console.warn(e)},e.next=5,fetch("/api/v1/rest-auth/registration/",s);case 5:return r=e.sent,e.next=8,r.json().catch(a);case 8:(i=e.sent).key&&(g.a.set("Authorization","Token ".concat(i.key)),localStorage.setItem("is_staff",i.is_staff),this.props.history.push("/"));case 10:case"end":return e.stop()}}),e,this)})));return function(t,n){return e.apply(this,arguments)}}()},{key:"handleLogin",value:function(){var e=Object(j.a)(u.a.mark((function e(t,n){var s,a,r,i;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("firing"),t.preventDefault(),s={method:"POST",headers:{"Content-Type":"application/json","X-CSRFToken":g.a.get("csrftoken")},body:JSON.stringify(n)},a=function(e){return console.warn(e)},e.next=6,fetch("/api/v1/rest-auth/login/",s).catch(a);case 6:return r=e.sent,e.next=9,r.json().catch(a);case 9:i=e.sent,console.log(i),i.key&&(g.a.set("Authorization","Token ".concat(i.key)),this.setState({isLoggedIn:!0}),this.props.history.push("/"));case 12:case"end":return e.stop()}}),e,this)})));return function(t,n){return e.apply(this,arguments)}}()},{key:"handleLogout",value:function(){var e=Object(j.a)(u.a.mark((function e(){var t,n,s,a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t={method:"POST",headers:{"X-CSRFToken":g.a.get("csrftoken")}},n=function(e){return console.warn(e)},e.next=4,fetch("/api/v1/rest-auth/logout/",t);case 4:return s=e.sent,e.next=7,s.json().catch(n);case 7:"Successfully logged out."===(a=e.sent).detail&&(g.a.remove("Authorization"),this.setState({isLoggedIn:!1}),localStorage.removeItem("is_staff",a.is_staff));case 9:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return Object(s.jsxs)(r.a.Fragment,{children:[Object(s.jsx)(v,{handleLogout:this.handleLogout,isLoggedIn:this.state.isLoggedIn}),Object(s.jsxs)(N.c,{children:[Object(s.jsx)(N.a,{path:"/profile",children:Object(s.jsx)(w,{})}),Object(s.jsx)(N.a,{path:"/register",children:Object(s.jsx)(I,{handleRegistration:this.handleRegistration})}),Object(s.jsx)(N.a,{path:"/login",children:Object(s.jsx)(k,{handleLogin:this.handleLogin})}),Object(s.jsx)(N.a,{path:"/",children:Object(s.jsx)(x,{})})]})]})}}]),n}(a.Component),C=Object(N.f)(L);c.a.render(Object(s.jsx)(r.a.StrictMode,{children:Object(s.jsx)(l.a,{children:Object(s.jsx)(C,{})})}),document.getElementById("root")),o()}},[[39,1,2]]]);
//# sourceMappingURL=main.a9927a68.chunk.js.map