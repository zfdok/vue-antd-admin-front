<template>
  <div class="text-center">
    <h1>短信系统管理</h1>
    <v-data-table
      :headers="headers"
      :items="users"
      sort-by="userid"
      class="elevation-1"
      :loading="loading"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        v-model="editedItem.username"
                        readonly
                        label="用户名"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        v-model="editedItem.phone"
                        label="短信报警手机号"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.sms_account"
                        label="短信余额"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="4" sm="2" md="2" style="padding-top: 5%">
                      <v-btn small outlined @click="editedItem.sms_account += 1"
                        >+1</v-btn
                      >
                    </v-col>
                    <v-col cols="4" sm="2" md="2" style="padding-top: 5%">
                      <v-btn
                        small
                        outlined
                        @click="editedItem.sms_account += 10"
                        >+10</v-btn
                      >
                    </v-col>
                    <v-col cols="4" sm="2" md="2" style="padding-top: 5%">
                      <v-btn
                        small
                        outlined
                        @click="editedItem.sms_account += 100"
                        >+100</v-btn
                      >
                    </v-col>
                    <v-col cols="6" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.sms_day_limit"
                        label="单日短信限额"
                        hint="每天最多发多少条短信?"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.sms_span"
                        label="短信报警频率"
                        hint="每多少次报警发一次报警短信?"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close"> 取消 </v-btn>
                <v-btn color="blue darken-1" text @click="save"> 保存 </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <!-- <template> -->
        <v-btn color="purple" small dark @click="editItem(item)">
          <v-icon small dark> mdi-wrench </v-icon>
        </v-btn>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> 刷新 </v-btn>
      </template>
    </v-data-table>
  </div>
</template>
<script>
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    loading: true,
    headers: [
      {
        text: "用户id",
        align: "start",
        sortable: false,
        value: "userid",
      },
      {
        text: "用户名",
        align: "start",
        sortable: false,
        value: "username",
      },
      { text: "手机号", value: "phone" },
      { text: "短信账户", value: "sms_account" },
      { text: "单日短信报警限额", value: "sms_day_limit" },
      { text: "单日短信余额", value: "sms_day_count" },
      { text: "短信报警间隔", value: "sms_span" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    users: [],
    editedIndex: -1,
    editedItem: {},
    defaultItem: {},
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "新建用户" : "短信管理";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.loading = true;
    this.initialize();
    this.loading = false;
  },

  methods: {
    async initialize() {
      let res = await this.$http.get("/users/get_users");
      this.users = res.data;
    },

    editItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    async save() {
      this.loading = true;
      if (this.editedIndex > -1) {
        Object.assign(this.users[this.editedIndex], this.editedItem);
        // console.log(this.editedItem);
        let res = await this.$http.post("/users/update_sms", {
          data: this.editedItem,
        });
        console.log(res.data);
      }
      this.close();
      this.initialize();
      this.loading = false;
    },
    async get_users() {
      let res = await this.$http.get("/users/get_users");
      console.log(res.data);
    },
  },
};
</script>