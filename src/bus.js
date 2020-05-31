import Vue from 'vue';

Vue.prototype.$bus = new Vue();

// this.$bus.$emit("message:push", response.data.message, "danger");

// 將 Event Bus 掛載在 Vue 的原型下，所以可以直接對 Event Bus 做呼叫 (Vue.prototype.$bus)。
// event bus 通常會很常見於訊息回饋，在元件觀念都是一層一層向下包覆，但是最底層的訊息若要直接向外層傳就要使用 event bus
// Message
// vm.$bus.$emit('messsage:push', message, status);
// message(String): 訊息內容
// status(String): Alert 的樣式

// 因為 Event Bus 可以做到跨元件溝通，所以建議將 Event Bus 可以使用的方法 (包含使用的方法、傳遞的參數等等) 寫個註解在這個 bus.js 檔案內。
// 如果沒有標示，可能會忘記或不清楚有哪些方法可以使用喔
