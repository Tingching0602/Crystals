<template>
 <div id="login">
   <div class="login-top">
                <img class="login-logo" src="https://cdn-icons.flaticon.com/png/512/3129/premium/3129282.png?token=exp=1645637103~hmac=adf34188906af7280f1c4135069f1d01" alt="" >
        <h1>登入會員</h1>
      </div>
<div class="login-form">
      <div class="form-label-group">
        <label for="account">帳號</label>
            <input
          id="account"
          v-model="account"
          name="account"
          type="text"
          class="form-control"
          autocomplete="username"
          placeholder="帳號"
          required
          autofocus
        />
      </div>
      <div class="form-label-group">
        <label for="password">密碼</label>
        <input
          id="password"
          v-model="password"
          name="password"
          type="password"
          class="form-control"
          autocomplete="new-password"
          placeholder="請輸入密碼"
          required
        />
      </div>
      <button @click="success" class="btnLogin" type="submit" :disabled="isProcessing">登入</button>
      <div class="text-center">
        <p>
          <router-link to="/register" class="btnRegister">註冊會員</router-link><span class="seperater">・</span><router-link to="/admin" class="btnAdmin">後台登入</router-link>
        </p>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  methods: {
    success() {
      alert('成功登入');
    }
  }
};
</script>
