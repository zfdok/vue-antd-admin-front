<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
        <div class="d-none d-sm-none d-md-flex text-sm-h6 text-md-h5 text-lg-h5 text-xl-h5">安冷云管理系统</div>
      </div>

      <v-spacer></v-spacer>
      <v-btn href="https://anlengyun.com/" text>
        <span class="mr-2">返回安冷云</span>
        <v-icon>mdi-home-outline</v-icon>
      </v-btn>
      <v-btn 
      href="/"
      text>
        <span class="mr-2">返回系统主页</span>
        <v-icon>mdi-shield-home-outline</v-icon>
      </v-btn>
      <v-btn @click="logout" text>
        <span class="mr-2">注销账号</span>
        <v-icon>mdi-account-multiple-minus</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
    <Snackbar />
  </v-app>
</template>

<script>
import Snackbar from "./components/Snackbar.vue";
import { mapMutations } from "vuex";
export default {
  name: "App",
  components: {
    Snackbar,
  },
  data: () => ({
    //
  }),
  methods: {
    ...mapMutations(["changeLogout"]),
    logout() {
      this.changeLogout();
      this.$router.push("/login");
    },
  },
};
</script>
