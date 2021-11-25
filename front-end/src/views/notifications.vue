<template>
    <div class="notifs-container text-center mb-2">
        <header class="">
            <Nav/>
        </header>
         <h1 class="title mb-5">Notifications</h1>
        <section class="container-sm bg-light notifs-section pb-3" v-if="urlId==userId && notifications">
            <button class="btn btn-outline-danger mt-2 mb-3" :id="userId" @click="deleteAllNotifs()">Supprimer tout</button>
            <div class="col-12 block-notifs d-flex align-items-center justify-content-evenly" v-for="notif in notifications" :key="notif.id">
                <a :href="`/post/${notif.postId}`" class="col-10 pb-2 pt-2">
                    <div class="me-3 notif d-flex align-items-center mb-2">
                        {{notif.prenom + ' ' + notif.nom  + ' ' + notif.form}}
                    </div>
                </a>
                <button class="btn btn-outline-danger bt-notif" :id="notif.notifId" @click="deleteOneNotif($event)"><i class="fas fa-trash-alt"></i></button>
            </div>
        </section>
    </div>
</template>


<script>
import Nav from '../components/nav.vue'
import axios from'axios'
export default{
    components:{Nav},
    name:'Notifications',
    data() {
        return{
            notifications:'',
            userId:'',
            token:'',
            urlId:''
        }
    },
    async created(){
        this.urlId=this.$route.params.id
        let local=localStorage.getItem('response')
        let getLocal=JSON.parse(local)
        this.token=getLocal.token
        this.userId = getLocal.userId
        this.notifications=((await axios.get(`http://localhost:3000/api/notifications/${this.userId}`)).data) 
    },
    methods:{
        deleteOneNotif(e){
            const notifId=e.currentTarget.id
            
            const config = {
              headers: { Authorization: `Bearer ${this.token}` }
            };

            const url=`http://localhost:3000/api/notifications/${notifId}`
   
            axios.delete(url,config)
            .then(res =>{ 
                alert(res.data.Message)
                this.$router.go()
            })
        },

        deleteAllNotifs(){
            const data={
                userId:this.userId
            }

            const config = {
              headers: { Authorization: `Bearer ${this.token}` }
            };

            const url=`http://localhost:3000/api/notifications`
   
            axios.post(url,data,config)
            .then(res =>{ 
                alert(res.data.Message)
                this.$router.go()
            })
        }
    }
}
</script>


<style scoped>
  .notifs-section{
      box-shadow: 1px 2px 1px rgb(231, 231, 231);
      border-radius: 5px;
  }

  .notif{
      border-radius: 5px;
      height:35px;
      text-align: center;
      padding:20px;
      background-color: rgb(247, 209, 207);
      color: rgb(192, 13, 7);
  }

  .title{
      color:rgb(192, 13, 7);
      border-bottom: 1px solid rgb(192, 13, 7);
      padding-bottom:5px;
  }

  .notif:hover{
      background-color: rgb(192, 13, 7);
      color: lavender;
  }

  a{
      text-decoration:none
  }
</style>