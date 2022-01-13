<template>
  <div class="text-center">
    <h1>用户管理</h1>
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
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                新增用户
              </v-btn>
            </template>
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
                        label="用户名"
                        :readonly="formTitle == '编辑用户' ? true : false"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        v-model="editedItem.password"
                        label="密码"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.user_group_name"
                        label="用户onenet组名"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.user_group_id"
                        label="用户onenet组id"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.phone"
                        label="手机号"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        v-model="editedItem.commpany"
                        label="公司"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        v-model="editedItem.address"
                        label="地址"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.email"
                        label="email"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.user_role"
                        label="角色"
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
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">确定要删除此账户吗???</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >取消</v-btn
                >
                <v-btn color="error" text @click="deleteItemConfirm"
                  >确定删除</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <!-- <template> -->
        <v-btn class="mr-1" color="indigo" small dark @click="editItem(item)">
          <v-icon small dark> mdi-pencil </v-icon>
        </v-btn>
        <v-btn color="error" small dark @click="deleteItem(item)">
          <v-icon small dark> mdi-delete </v-icon>
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
      { text: "密码", value: "password" },
      { text: "用户onenet组名", value: "user_group_name" },
      { text: "用户onenet组id", value: "user_group_id" },
      { text: "手机号", value: "phone" },
      { text: "公司", value: "commpany" },
      { text: "地址", value: "address" },
      { text: "角色", value: "user_role" },
      { text: "email", value: "email" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    users: [],
    editedIndex: -1,
    editedItem: {
      username: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "新建用户" : "编辑用户";
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

    deleteItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      this.users.splice(this.editedIndex, 1);
      this.closeDelete();
      this.loading = true;
      await this.$http.post("/users/delete_user", {
        data: this.editedItem,
      });
      this.initialize();
      this.loading = false;
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
        let res = await this.$http.post("/users/update_user", {
          data: this.editedItem,
        });
        console.log(res.data);
      } else {
        this.users.push(this.editedItem);
        let res = await this.$http.post("/users/add_user", {
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