<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="text-sm-h6 text-md-h5 text-lg-h3 text-xl-h3">安冷云消息管理系统</h1>
      </v-col>

      <v-col class="mb-5" cols="12">
        <!-- <h2 class="headline font-weight-bold mb-3">What's next?</h2> -->

        <v-row justify="center">
          <v-form ref="form" cols="12" sm="12" md="12">
            <v-text-field
              v-model="name"
              :counter="10"
              label="用户名"
              required
              outlined
            ></v-text-field>

            <v-text-field
              v-model="password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              label="密码"
              outlined
              @click:append="show1 = !show1"
            ></v-text-field>

            <v-btn color="success" class="mr-4" @click="validate" style="width:80%; margin:0.5rem"> 登录 </v-btn>

            <v-btn color="error" class="mr-4" @click="reset" style="width:80%; margin:0.5rem"> 清空 </v-btn>
          </v-form>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  name: "Login",
  data: () => ({
    name: "",
    password: "",
    show1: false,
  }),
  methods: {
    ...mapMutations(['changeLogin']),
    async validate() {
      let res = await this.$http.post("/login", {
        name: this.name,
        password: this.password,
      });
      if (res.data.code) {
        this.$store.dispatch("snackbar/openSnackbar", {
          msg: "✔ 登录成功",
          color: "success",
        });
        this.userToken = 'Bearer ' + res.data.token;
        this.changeLogin({ Authorization: this.userToken });
        this.$router.push('/');
      } else
        this.$store.dispatch("snackbar/openSnackbar", {
          msg: "✖ " + res.data.success,
          color: "red",
        });
    },
    reset() {
      (this.name = ""), (this.password = "");
      this.$store.dispatch("snackbar/openSnackbar", {
        msg: "⚠ 清空完成",
        color: "orange",
      });
    },
  },
};
</script>
