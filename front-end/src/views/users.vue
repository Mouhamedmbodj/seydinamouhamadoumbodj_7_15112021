<template>
   <div>
       <Nav/>
       <div class="col-12 text-center">
            <h1 class="mt-2 title"> Notre équipe</h1> 

            <div class="col-10 col-md-6 m-auto mt-3">
              <input type="text" class="form-control" placeholder="Rechercher un collégue" v-model="search">
            </div>
           
            <div class="col-12 links-container mt-3 d-flex justify-content-center flex-wrap">
                <div v-for="(user) in filteredUsers" :key="user.id">
                    <a :href="`/profil/${user.id}`" class="user-link " v-if="user.status!=2">
                       <div class="image me-1" :class="{noProfil : !user.imageUrl}">
                         <img :src="user.imageUrl" alt="" v-if="user.imageUrl">  
                       </div>
                      <p class="user-name">{{user.fullName}}</p>
                    </a>
                </div>
            </div>        
        </div>
   </div>
</template>


<script>
import Nav from '../components/nav.vue'
import axios from 'axios'
export default {
    components:{Nav},
    name:'Users',
    data() {
        return{
            users:[],
            search:'',
            userId:''
        }
    },
    beforeCreate(){
        const local=localStorage.getItem('response')
        if(local){  
            let getLocal=JSON.parse(local)
            let userId = getLocal.userId
            let Id=this.$route.params.id
            if(userId != Id){
                localStorage.removeItem('response')
                this.$router.push('/') 
            }
        }else{
            this.$router.push('/') 
        } 
    },
    async created(){
       this.users= ((await axios.get(`http://localhost:3000/api/auth/users`)).data)
    },
    computed:{
       filteredUsers(){
            return this.users.filter(user => {
                return user.fullName.toLowerCase().match(this.search.toLowerCase())
            })
       }
    },
}
</script>


<style scoped>

.body{
  background-color: antiquewhite;
  height:100%
}

.user-link{
    width:250px;
    height:75px;
    display: flex;
    align-items: center;
    justify-content:space-between;
    text-decoration:none;
    padding:5px;
    border-radius:5px;
    box-shadow: 2px 2px 2px rgb(245, 144, 144);
    background-color: rgb(241, 241, 241);
    margin-right:20px;
    margin-top: 10px;
}

.user-link:hover{
    background-color: rgb(240, 227, 227);
}

.image{
   height:60px;
   border-radius: 50%;
   width:60px;
}

.image img{
    height: 100%;
    width:100%;
    border-radius:10px
}

.user-name{
    font-size:1.3em;
    color: black;
    margin-right:40px;
    margin-top: 10px;
    text-overflow: ellipsis; 
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-transform: capitalize;
}

.title{
    font-size:2em;
    color: rgba(238, 5, 5, 0.562);
}

  
.noProfil{
 background-image:url('../assets/image/images.png');
 background-size: 100%;
}

</style>