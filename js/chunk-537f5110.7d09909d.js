(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-537f5110"],{1799:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("nav",{attrs:{"aria-label":"Page navigation example"}},[a("ul",{staticClass:"pagination"},[a("li",{staticClass:"page-item",class:{disabled:!t.pageData.has_pre}},[a("a",{staticClass:"page-link",attrs:{href:"#","aria-label":"Previous"},on:{click:function(e){return e.preventDefault(),t.updatePage(t.pageData.current_page-1)}}},[a("span",{attrs:{"aria-hidden":"true"}},[t._v("«")])])]),t._l(t.pageData.total_pages,(function(e){return a("li",{key:e,staticClass:"page-item",class:{active:t.pageData.current_page===e}},[a("a",{staticClass:"page-link",attrs:{href:"#"},on:{click:function(a){return a.preventDefault(),t.updatePage(e)}}},[t._v(t._s(e))])])})),a("li",{staticClass:"page-item",class:{disabled:!t.pageData.has_next}},[a("a",{staticClass:"page-link",attrs:{href:"#","aria-label":"Next"},on:{click:function(e){return e.preventDefault(),t.updatePage(t.pageData.current_page+1)}}},[a("span",{attrs:{"aria-hidden":"true"}},[t._v("»")])])])],2)])},r=[],i={name:"Pagination",data:function(){return{}},props:{pageData:{type:Object}},methods:{updatePage:function(t){this.$emit("emitpage",t),this.$emit("scrollTarget")}}},n=i,l=a("2877"),d=Object(l["a"])(n,s,r,!1,null,null,null);e["a"]=d.exports},"5a4f":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("loading",{attrs:{active:t.isLoading},on:{"update:active":function(e){t.isLoading=e}}},[s("template",{slot:"default"},[s("img",{attrs:{src:a("e068"),width:"70px"}}),s("img",{attrs:{src:a("890e"),width:"100px"}})])],2),s("div",{staticClass:"container"},[s("div",{staticClass:"mt-5"},[s("table",{staticClass:"table"},[t._m(0),s("tbody",t._l(t.orders,(function(e){return s("tr",{key:e.id},[s("td",{attrs:{scope:"row"}},[t._v(t._s(t._f("getTime")(e.create_at)))]),s("td",[t._v(t._s(e.user.name))]),s("td",[t._v(t._s(e.user.tel))]),s("td",[t._v(t._s(t._f("currency")(e.total)))]),s("td",[e.is_paid?s("span",{staticClass:"text-success"},[t._v("已付款")]):s("span",{staticClass:"text-danger"},[t._v("未付款")])]),s("td",[s("button",{staticClass:"btn btn-primary mr-2",attrs:{type:"button"},on:{click:function(a){return a.preventDefault(),t.checkModal(e)}}},[t._v(" 查看 ")]),s("button",{staticClass:"btn btn-outline-middle-green-yellow",attrs:{type:"button"},on:{click:function(a){return a.preventDefault(),t.updateModal(e)}}},[t._v(" 編輯 ")])])])})),0)])]),s("div",{staticClass:"d-flex justify-content-center"},[s("Pagination",{attrs:{pageData:t.pagination},on:{emitpage:t.getOrders}})],1)]),s("div",{staticClass:"modal fade",attrs:{id:"checkModal",tabindex:"-1",role:"dialog","aria-labelledby":"checkModlTitle","aria-hidden":"true"}},[s("div",{staticClass:"modal-dialog modal-dialog-centered",attrs:{role:"document"}},[s("div",{staticClass:"modal-content"},[t._m(1),t.tempOrder.user?s("div",{staticClass:"modal-body"},[s("div",{staticClass:"mt-1"},[s("span",[t._v("訂單時間 :")]),s("span",[t._v(t._s(t._f("getTime")(t.tempOrder.create_at)))])]),s("div",{staticClass:"mt-1"},[s("span",[t._v("收件人姓名 :")]),s("span",[t._v(t._s(t.tempOrder.user.name))])]),s("div",{staticClass:"mt-1"},[s("span",[t._v("電話 :")]),s("span",[t._v(t._s(t.tempOrder.user.tel))])]),s("div",{staticClass:"mt-1"},[s("span",[t._v("信箱 :")]),s("span",[t._v(t._s(t.tempOrder.user.email))])]),s("div",{staticClass:"mt-1"},[s("span",[t._v("地址 :")]),s("span",[t._v(t._s(t.tempOrder.user.address))])]),s("div",{staticClass:"mt-1"},[s("span",[t._v("總金額 :")]),s("span",[t._v(t._s(t._f("currency")(t.tempOrder.total)))])]),s("div",{staticClass:"mt-1"},[s("span",[t._v("是否付款 :")]),t.tempOrder.is_paid?s("span",{staticClass:"text-primary"},[t._v("已付款")]):s("span",{staticClass:"text-danger"},[t._v("未付款")])]),s("div",{staticClass:"mt-1"},[s("span",[t._v("備註 :")]),s("span",[t._v(t._s(t.tempOrder.message))])]),s("div",{staticClass:"mt-3"},[s("table",{staticClass:"table"},[t._m(2),s("tbody",t._l(t.tempOrder.products,(function(e,a){return s("tr",{key:a},[s("td",[t._v(t._s(e.product.title))]),s("td",[t._v(t._s(e.qty)+" / "+t._s(e.product.unit))])])})),0)])])]):t._e()])])]),s("div",{staticClass:"modal fade",attrs:{id:"updateModal",tabindex:"-1",role:"dialog","aria-labelledby":"updateModalCenterTitle","aria-hidden":"true"}},[s("div",{staticClass:"modal-dialog modal-dialog-centered",attrs:{role:"document"}},[s("div",{staticClass:"modal-content"},[t._m(3),t.tempOrder.user?s("div",{staticClass:"modal-body"},[s("div",{staticClass:"form-row"},[s("div",{staticClass:"form-group col-md-6"},[s("label",{attrs:{for:"name"}},[t._v("收件人姓名")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.tempOrder.user.name,expression:"tempOrder.user.name"}],staticClass:"form-control",attrs:{type:"text",id:"name",placeholder:"請輸入收件人姓名"},domProps:{value:t.tempOrder.user.name},on:{input:function(e){e.target.composing||t.$set(t.tempOrder.user,"name",e.target.value)}}})]),s("div",{staticClass:"form-group col-md-6"},[s("label",{attrs:{for:"tel"}},[t._v("電話")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.tempOrder.user.tel,expression:"tempOrder.user.tel"}],staticClass:"form-control",attrs:{type:"text",onkeyup:"value=value.replace(/[^0-9]/g,'')",id:"tel",placeholder:"請輸入電話"},domProps:{value:t.tempOrder.user.tel},on:{input:function(e){e.target.composing||t.$set(t.tempOrder.user,"tel",e.target.value)}}})])]),s("div",{staticClass:"form-group"},[s("label",{attrs:{for:"email"}},[t._v("信箱")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.tempOrder.user.email,expression:"tempOrder.user.email"}],staticClass:"form-control",attrs:{type:"text",id:"email",placeholder:"請輸入信箱"},domProps:{value:t.tempOrder.user.email},on:{input:function(e){e.target.composing||t.$set(t.tempOrder.user,"email",e.target.value)}}})]),s("div",{staticClass:"form-group"},[s("label",{attrs:{for:"address"}},[t._v("地址")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.tempOrder.user.address,expression:"tempOrder.user.address"}],staticClass:"form-control",attrs:{type:"text",id:"address",placeholder:"請輸入地址"},domProps:{value:t.tempOrder.user.address},on:{input:function(e){e.target.composing||t.$set(t.tempOrder.user,"address",e.target.value)}}})])]):t._e(),s("div",{staticClass:"modal-footer"},[s("button",{staticClass:"btn btn-outline-muted",attrs:{type:"button","data-dismiss":"modal"}},[t._v(" 取消 ")]),s("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:function(e){return e.preventDefault(),t.updateOrder(e)}}},[t._v(" 確定 ")])])])])])],1)},r=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("thead",[a("tr",[a("th",{attrs:{scope:"col"}},[t._v("購買時間")]),a("th",{attrs:{scope:"col"}},[t._v("收件姓名")]),a("th",{attrs:{scope:"col"}},[t._v("電話")]),a("th",{attrs:{scope:"col"}},[t._v("應付金額")]),a("th",{attrs:{scope:"col"}},[t._v("是否匯款")]),a("th",{attrs:{scope:"col",width:"150"}})])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"modal-header bg-primary text-white"},[a("h5",{staticClass:"modal-title",attrs:{id:"checkModalLongTitle"}},[t._v("個人訂單列表")]),a("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[a("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("thead",[a("tr",[a("th",{attrs:{scope:"col"}},[t._v("商品名稱")]),a("th",{attrs:{scope:"col"}},[t._v("數量")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"modal-header bg-middle-green-yellow "},[a("h5",{staticClass:"modal-title",attrs:{id:"updateModalLongTitle"}},[t._v("編輯訂單資料")]),a("button",{staticClass:"close ",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[a("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])])}],i=(a("99af"),a("1157")),n=a.n(i),l=a("1799"),d={components:{Pagination:l["a"]},data:function(){return{orders:[],tempOrder:{},pagination:{},isLoading:!1}},methods:{getOrders:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,e=this,a="".concat("https://vue-course-api.hexschool.io","/api/").concat("yanennn","/admin/orders?page=").concat(t);e.isLoading=!0,e.$http.get(a).then((function(t){e.orders=t.data.orders,e.pagination=t.data.pagination,e.isLoading=!1}))},updateModal:function(t){this.tempOrder=t,n()("#updateModal").modal("show")},checkModal:function(t){this.tempOrder=t,n()("#checkModal").modal("show")},updateOrder:function(){var t=this,e="".concat("https://vue-course-api.hexschool.io","/api/").concat("yanennn","/admin/order/").concat(t.tempOrder.id);t.$http.put(e,{data:t.tempOrder}).then((function(e){e.data.success?(n()("#updateModal").modal("hide"),t.$store.dispatch("updateMessage",{message:"更新成功",status:"success"}),t.getOrders()):t.$store.dispatch("updateMessage",{message:"更新失敗，請重新再試",status:"danger"})}))}},created:function(){this.getOrders()}},o=d,c=a("2877"),p=Object(c["a"])(o,s,r,!1,null,null,null);e["default"]=p.exports},"890e":function(t,e,a){t.exports=a.p+"img/juice-dribbble.75064656.gif"},e068:function(t,e,a){t.exports=a.p+"img/juice-icon.b14e45c8.png"}}]);
//# sourceMappingURL=chunk-537f5110.7d09909d.js.map