<template>
  <div class="box">
    <div class="con">
      <h3>登录</h3>
      <div class="inp"><input type="text" /></div>
      <div class="inp"><input type="text" /></div>
      <div class="inp"><button>登录</button></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.box{
    width: 100vw;
    height: 100vh;
    background: linear-gradient(to right,#563443,#303D60);
}
.con{
    width: 400px;
    height: 300px;
    background: #fff;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    border-radius: 10px;
}
.con h3{
    text-align: center;
}
.con .inp{
    width: 60%;
    height: 30px;
    margin: 30px auto ;
   
}
.inp input{
    width: 100%;
    height: 30px;   
}
.inp button{
    width: 100%;
    height: 30px;
    background: #409EFF;
    color: #fff;
    outline: none;
    border:none;
}
</style>