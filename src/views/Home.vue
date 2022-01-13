<template>
  <div class="text-center" style="margin: 0.5rem; padding: 0.5rem">
    <h1>管理中心</h1>
    <v-card
      class="text-center"
      style="margin: 0.5rem; padding: 0.5rem"
      color="#ddd"
    >
      <v-card style="margin: 0.5rem; padding: 1rem">
        <v-responsive :aspect-ratio="12 / 2">
          <v-row>
            <v-col cols="12" xl="3" lg="4" md="6" sm="6" xs="12">
              <v-btn
                depressed
                elevation="2"
                @click="gotoqunfa"
                color="primary"
                dark
                block
                x-large
                >群体消息下发</v-btn
              >
            </v-col>
            <v-col cols="12" xl="3" lg="4" md="6" sm="6" xs="12">
              <v-btn
                depressed
                elevation="2"
                @click="gotouser"
                color="primary"
                dark
                block
                x-large
                >用户管理</v-btn
              >
            </v-col>
            <v-col cols="12" xl="3" lg="4" md="6" sm="6" xs="12">
              <v-btn
                depressed
                elevation="2"
                @click="gotodxyve"
                color="primary"
                dark
                block
                x-large
                >短信充值</v-btn
              >
            </v-col>
            <v-col cols="12" xl="3" lg="4" md="6" sm="6" xs="12">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    depressed
                    elevation="2"
                    color="primary"
                    dark
                    block
                    x-large
                    v-bind="attrs"
                    v-on="on"
                    href="http://anlengyun.com:3001/onenet/updategroup"
                    >刷新系统</v-btn
                  >
                </template>
                <span
                  >更新设备列表, 刷新每日短信限额, 默认每日0:00分自动执行,
                  也可手动执行</span
                >
              </v-tooltip>
            </v-col>
          </v-row>
        </v-responsive>
      </v-card>
    </v-card>
  </div>
</template>

<script>
// import Login from '../components/Login'

export default {
  name: "Home",

  components: {},
  methods: {
    gotoqunfa() {
      this.$router.push("/sendmsg");
    },
    gotouser() {
      this.$router.push("/user");
    },
    gotodxyve() {
      this.$router.push("/dxyve");
    },
    flashsys() {
      this.$router.push("/flashsys");
    },
  },
};
</script>
