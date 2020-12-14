<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>
    <!-- //添加 -->
    <v-add :info='info' ref="one"></v-add>
    <!-- 列表 -->
    <v-list @edit='edit($event)'></v-list>
  </div>
</template>

<script>
import vList from "./components/list";
import vAdd from "./components/add";
export default {
  components: {
    vList,
    vAdd,
  },
  data(){
    return {
        info:{
          isshow:false,
          title:'角色添加',
          isAdd:true //默认添加
        }
    }
  },
  methods:{
    willAdd(){
      this.info.isshow = !this.info.isshow,
       this.info.title = '角色添加',
         this.info.isAdd = true
          this.$refs.one.empty(id)
    },
    //编辑
    edit(id){
       this.info.isshow = true
       this.$refs.one.look(id)
       this.info.isAdd = false
       this.$refs.one.look(id)
    }
  }
};
</script>

<style>
</style>