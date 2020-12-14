import axios from 'axios'
import qs from 'qs'
const baseurl = 'api'
axios.interceptors.response.use(res=>{
    console.log('=======请求的路径：'+res.config.url+'=======');
    console.log(res);
    return res
})

//菜单模块的请求
//菜单添加

export const reqMenuAdd=(data)=>{
    return axios({
        url:baseurl+'/api/menuadd',
        method:'post',
        data:data
    })
}

//菜单列表

export const reqMenuList=(data)=>{
    return axios({
        url:baseurl+'/api/menuList',
        method:'get',
       params:data
    })
}

// 获取一条数据

export const reqMenuListOne=(data)=>{
    return axios({
        url:baseurl+'/api/menuinfo',
        method:'get',
       params:data
    })
}

//菜单编辑
export const reqMenuEdit=(data)=>{
    return axios({
        url:baseurl+'/api/menuedit',
        method:'post',
       data:data
    })
}

//菜单删除 

export const reqMenuDel=(data)=>{
    return axios({
        url:baseurl+'/api/menudelete',
        method:'post',
       data:data
    })
}

///////角色管理

//角色添加

export const reqRoleAdd=(data)=>{
    return axios({
        url:baseurl+'/api/roleadd',
        method:'post',
       data:data
    })
}


//角色列表
export const reqRoleList=()=>{
    return axios({
        url:baseurl+'/api/rolelist',
        method:'get',
     
    })
}


 //获取一条数据

 export const reqRoleListOne=(id)=>{
    return axios({
        url:baseurl+'/api/roleinfo',
        method:'get',
         params:id
    })
}

//角色修改

export const reqRoleEdit=(id)=>{
    return axios({
        url:baseurl+'/api/roleedit',
        method:'post',
         data:id
    })
}

//角色删除
export const reqRoleDel=(id)=>{
    return axios({
        url:baseurl+'/api/roledelete',
        method:'post',
         data:id
    })
}


//////////////////////////管理员管理///////////////////////////////////
// 管理员添加
export const requserAdd=(data)=>{
    return axios({
        url:baseurl+'/api/useradd',
        method:'post',
        data:qs.stringify(data)
    })
}
// 管理员列表
export const requserList=(params)=>{
    return axios({
        url:baseurl+'/api/userlist',
        method:'get',
        params:params
    })
}

// 管理员一条数据
export const requserListOne=(id)=>{
    return axios({
        url:baseurl+'/api/userinfo',
        method:'get',
        params:id
    })
}

// 管理员编辑
export const requserEdit=(id)=>{
    return axios({
        url:baseurl+'/api/useredit',
        method:'post',
        data:id
    })
}

// 管理员删除
export const requserDel=(id)=>{
    return axios({
        url:baseurl+'/api/userdelete',
        method:'post',
        data:id
    })
}

// 管理员总数
export const requserCount=()=>{
    return axios({
        url:baseurl+'/api/usercount',
        method:'get',
       
    })
}


//////////////////////////商品分类管理///////////////////////////////////
// 商品分类添加
export const reqcateAdd=(data)=>{
    // 由于上传的是文件 所以需要用qs转一下
    var form  = new FormData()
    // {pid:1,catename:'s',img,status}
    for(var i in data){
        form.append(i,data[i])
    }
    return axios({
        url:baseurl+'/api/cateadd',
        method:'post',
        data:form
    })
}
// 商品分类列表
export const reqcateList=(params)=>{
    return axios({
        url:baseurl+'/api/catelist',
        method:'get',
        params:params
    })
}

// 商品分类一条数据
export const reqcateListOne=(id)=>{
    return axios({
        url:baseurl+'/api/cateinfo',
        method:'get',
        params:id
    })
}

// 商品分类编辑
export const reqcateEdit=(data)=>{
    var form  = new FormData()
    // {pid:1,catename:'s',img,status}
    for(var i in data){
        form.append(i,data[i])
    }
    return axios({
        url:baseurl+'/api/cateedit',
        method:'post',
        data:form
    })
}

// 商品分类删除
export const reqcateDel=(id)=>{
    return axios({
        url:baseurl+'/api/catedelete',
        method:'post',
        data:id
    })
}

