<template>
  <div class="msg">
    <v-card class="text-center" style="margin: 1rem; padding: 1rem">
      <v-responsive :aspect-ratio="16 / 9">
        <h1>设置全局消息</h1>
        <v-col class="mb-5" cols="12">
          <v-row justify="center">
            <v-form ref="form" style="width: 80%">
              <v-text-field
                v-model="title"
                label="通知标题"
                required
                outlined
              ></v-text-field>
              <v-text-field
                v-model="desc"
                label="通知描述"
                required
                outlined
              ></v-text-field>
              <v-text-field
                v-model="adUrl"
                label="通知链接"
                required
                outlined
              ></v-text-field>
              <v-text-field
                v-model="adPic"
                label="通知图片"
                required
                outlined
              ></v-text-field>
              <v-btn
                color="success"
                class="mr-4"
                @click="setNotices"
                :loading="loading"
              >
                下发通知
              </v-btn>

              <v-btn color="error" class="mr-4" @click="reset"> 清空 </v-btn>
            </v-form>
          </v-row>
        </v-col>
      </v-responsive>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      desc: "",
      adUrl: "",
      adPic: "",
      loading: false,
    };
  },
  methods: {
    async setNotices() {
      if (this.title && this.desc && this.adUrl && this.adPic) {
        if (this.adUrl.length > 200 || this.adPic.length > 200) {
          this.$store.dispatch("snackbar/openSnackbar", {
            msg: "✖ 下发url长度小于200字",
            color: "red",
          });
          this.adUrl = "";
          this.adPic = "";
          return;
        }
        this.loading = true;
        let res = await this.$http.post("/notice/setnoticetoall", {
          title: this.title,
          desc: this.desc,
          adUrl: this.adUrl,
          adPic: this.adPic,
        });
        console.log(res);
        this.$store.dispatch("snackbar/openSnackbar", {
          msg: "✔ 全站通知下发成功",
          color: "success",
        });
        this.title = "";
        this.desc = "";
        this.adUrl = "";
        this.adPic = "";
        this.loading = false;
      } else {
        this.$store.dispatch("snackbar/openSnackbar", {
          msg: "✖ 下发内容必须完整",
          color: "red",
        });
      }
    },
    reset() {
      this.title = "";
      this.desc = "";
      this.adUrl = "";
      this.adPic = "";
      this.$store.dispatch("snackbar/openSnackbar", {
        msg: "⚠ 清空完成",
        color: "orange",
      });
    },
  },
};
</script>

<style>
</style>
