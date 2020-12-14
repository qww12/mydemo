<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow">
      <el-form :model="form">
        <el-form-item label="菜单名称" :label-width="width">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" :label-width="width">
          <el-select
            v-model="form.pid"
            placeholder="---请选择---"
            @change="changePid"
          >
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in menuList"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option>
            <!-- 动态循环添加数据  菜单分类 -->
          </el-select>
        </el-form-item>

        <el-form-item label="菜单类型" :label-width="width">
          <el-radio v-model="form.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="form.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>

        <el-form-item
          label="菜单图标"
          :label-width="width"
          v-if="form.type == 1"
        >
          <el-select v-model="form.icon" placeholder="请选择活动区域">
            <el-option label="星星" value="el-icon-star-on">
              <i class="el-icon-star-on"></i>
            </el-option>
            <el-option label="人物" value="el-icon-user-solid">
              <i class="el-icon-user-solid"></i>
            </el-option>
            <el-option label="相机" value="el-icon-video-camera-solid">
              <i class="el-icon-video-camera-solid"></i>
            </el-option>
            <el-option label="灰机" value="el-icon-s-promotion">
              <i class="el-icon-s-promotion"></i>
            </el-option>
            <el-option label="电灯泡" value="el-icon-s-opportunity">
              <i class="el-icon-s-opportunity"></i>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单地址" :label-width="width" v-else>
          <el-select v-model="form.url" placeholder="请选择活动区域">
            <el-option
              v-for="item in indexRouters"
              :key="item.path"
              :label="'/' + item.path"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态" :label-width="width">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="info.isshow = false">取消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd"
          >添加</el-button
        >
        <el-button type="primary" @click="update" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { indexRouters } from "../../../router/index";
import { reqMenuAdd, reqMenuListOne, reqMenuEdit } from "../../../util/request";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      menuList: "menu/list",
    }),
  },
  data() {
    return {
      width: "160px",
      isshow: true,
      form: {
        pid: "",
        title: "",
        type: 1,
        icon: "",
        url: "",
        status: 1,
      },
      indexRouters: indexRouters,
    };
  },
  methods: {
    // 取消弹框
    hide() {
      this.info.isshow = false;
    },

    //重置
    empty() {
      this.form = {
        pid: "",
        title: "",
        type: 1,
        icon: "",
        url: "",
        status: 1,
      }
    },
    ...mapActions({
      requestMenuList: "menu/requestMenuList",
    }),
    // 添加操作
    add() {
      reqMenuAdd(this.form).then((res) => {
        this.hide();
        this.requestMenuList();
        this.empty()
      });
    },
    changePid() {
      this.form.type = this.form.pid == 0 ? 1 : 2;
    },
    //查看一条数据
    look(id) {
      reqMenuListOne({id:id}).then(res => {
        this.form = res.data.list;
        this.form.id = id;
        //console.log(id);
      });
    },
    //修改
    update() {
      reqMenuEdit(this.form).then((res) => {
        this.hide();
        this.requestMenuList();
          this.empty()
      });
    },
  },
};
</script>

<style>
</style>