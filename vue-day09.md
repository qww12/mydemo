## vue-day09

## 1.vuex

vuex-moudules

```
1.store->index.js
import food from './modules/food'
export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules:{
        food,   
    }
})
```

```js
2.store->modules文件夹->food.js
import {reqFoodList,reqFoodDetail} from '../../util/request'
const state={
    foods:[],
    foodDetail:{}
}
const mutations={
    getFoodList(state,arr){
        state.foods = arr
    },
    getFoodDetail(state,obj){
        state.foodDetail = obj
    }
}
const actions={
// 美食列表
requestFood(context){
    reqFoodList().then(res=>{
        console.log(res)
        context.commit('getFoodList',res.data.data)
    })
},
// 美食详情
requestFoodDetail(context,id){
    reqFoodDetail(id).then(res=>{
        console.log(res)
        context.commit('getFoodDetail',res.data.detail)
    })
}
}
const getters={
    foods(state){
        return  state.foods
    },
    foodDetail(state){
        return state.foodDetail
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}
```

```js
3.food.vue
computed:{
        ...mapGetters({
            foods:'food/foods'
        })
    },
    
    methods:{
     ...mapActions({
        requestFood:'food/requestFood'
    }),
    }
```

## 2.ui框架

mint-ui:http://mint-ui.github.io/#!/zh-cn   移动端的ui框架

element-ui:https://element.eleme.cn/#/zh-CN    PC端

ivew:http://v1.iviewui.com/   PC端

vant:https://vant-contrib.gitee.io/vant/#/zh-CN/   移动端

## 3.项目

### 1.umall-api 文件夹  目的就是为了请求数据用的   启动 npm start  

### 2.配置navcat 

a.必须要确保mysql 

b.链接navcat-》创建数据库表(usmall) 具体查看的是umall-api->config->golabl.js文件

c.链接上navcat后在usmall数据库表中运行sql文件

### 3.项目开始

#### 	1.创建项目   vue init webpack 01-usamll

#### 	2.清空工作

#### 	3.配置项目目录

#### 	4.安装依赖

#### 	5.项目开始

 a.首先是创建login页面以及index页面

login页面是自己写的样式

index页面是从element-ui中拿回来的

之后绘制menu页面 分为了两个组件add list

menu中只有按钮

```js
<template>
<div>
    <el-button type='primary' @click="willAdd">添加</el-button>
    <!-- 添加 -->
   
    <v-add :info='info' ref='one'></v-add>

     <!-- 列表 -->
    <v-list @edit='edit($event)'></v-list>
</div>
</template>
<script>
import vAdd from './components/add'
import vList from './components/list'
export default {
components:{
    vAdd,
    vList
 },
data () {
 return {
     info:{
         isShow:false
     }
 }
},
methods:{
    // 点击添加
    willAdd(){
        this.info.isShow = !this.info.isShow
    },
    // 编辑
    edit(e){
        // console.log(e)
        this.info.isShow =true
        console.log(this.$refs.one)
        this.$refs.one.look(e)
    }
},
mounted(){
}
}
</script>
<style scoped>
</style>
```

add是添加数据组件

```js
<template>
  <div>
    <el-dialog title="菜单添加" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="菜单名称" :label-width="width">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" :label-width="width">
          <el-select v-model="form.pid" placeholder="--请选择--" @change="changePid">
            <el-option label="顶级菜单" value="0"></el-option>
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
            <el-option label="铃铛" value="el-icon-message-solid">
              <i class="el-icon-message-solid"></i>
            </el-option>
            <el-option label="书签" value="">
              <i class="el-icon-collection-tag"></i>
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
            active-value="1"
            inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="info.isShow = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { indexRouters } from "../../../router/index";
import {reqMenuAdd,reqMenuListOne} from '../../../util/request'
export default {
    props:['info'],
  components: {},
  data() {
    return {
      width: "160px",
    //   isShow: true,
      form: {
        pid: "",
        title: "",
        type:0,
        icon: "",
        url: "",
        status: 1,
      },
      indexRouters: indexRouters,
    };
  },
  methods: {
    //   取消弹框
      hide(){
          this.info.isShow=false
      },
    //   添加操作
    add(){
        reqMenuAdd(this.form).then(res=>{
            this.hide()
        })
    },
    // 修改type的状态
    changePid(){
        this.form.type=this.form.pid==0?1:2
    },
    // 查看一条数据
    look(id){
      reqMenuListOne({id:id}).then(res=>{
        this.form=res.data.list
      })
    }
  },
  mounted() {},
};
</script>
<style scoped>
</style>
```

list是展示添加的数据

```js
<template>
  <div class="box">
    <!-- <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" label="菜单编号" width="180">
      </el-table-column>
      <el-table-column prop="name" label="菜单名称" width="180">
      </el-table-column>
      <el-table-column prop="address" label="菜单图标"> </el-table-column>
      <el-table-column prop="address" label="菜单地址"> </el-table-column>
      <el-table-column prop="address" label="状态">
          <el-button type='primary'>启用</el-button>
          <el-button type='info'>禁用</el-button>
      </el-table-column>
      <el-table-column prop="address" label="操作"><el-button type='primary'>编辑</el-button><el-button type='danger'>删除</el-button></el-table-column>
      
    </el-table> -->

    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="菜单编号" sortable width="180">
      </el-table-column>
      <el-table-column prop="title" label="菜单名称" sortable width="180">
      </el-table-column>
      <el-table-column prop="icon" label="菜单图标"> </el-table-column>
      <el-table-column prop="url" label="菜单地址"> </el-table-column>
      <el-table-column prop="status" label="状态">
        <!-- <el-button type="primary">启用</el-button>
        <el-button type="info">禁用</el-button> -->
         <template slot-scope="scope">
          <el-button type='primary' v-if='scope.row.status==1'>启用</el-button>
          <el-button type='danger' v-else>禁用</el-button>
        </template>
      </el-table-column>

      <!-- <el-table-column prop="address" label="操作"
        ><el-button type="primary" >编辑</el-button
        ><el-button type="danger">删除</el-button></el-table-column
      > -->

      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type='primary' @click="edit(scope.row.id)">编辑</el-button>
          <el-button type='danger'>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      list: "menu/list",
    }),
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      requestMenuList: "menu/requestMenuList",
    }),
    // handleEdit(scope) {
    //   console.log(scope);
    // },
    // handleDelete() {},
    // 编辑
    edit(id){
        this.$emit('edit',id)
    }
  },
  mounted() {
    this.requestMenuList();
  },
};
</script>
<style scoped>
.box {
  margin-top: 20px;
}
</style>
```

