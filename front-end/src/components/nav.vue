<template>
    <div class="nav-container ">
        <nav class="navbar container-fluid navbar-expand-lg navbar-light d-flex justify-content-between align-items-center">
            <div class="image col-3">
               <a class="" href="#" @click.prevent="goHome"><img src="../assets/image/icon-left-font-monochrome-white.png" alt=""></a> 
            </div>
            
            <div class="">
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
            </div>
            <div class="collapse navbar-collapse d-lg-flex justify-content-lg-end align-items-center block-icon" id="navbarNav">
                <ul class="navbar-nav">
                  <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#"  @click.prevent="goUsers"><i class="fas fa-users"></i></a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link active" href="#" @click.prevent="goNotifs"><i class="fas fa-bell"><span class="total-notifs bg-light" v-if="notifications!=0">{{notifications}}</span></i></a>
                  </li>
                  <li class="nav-item profil">
                      <a class="nav-link" href="#" @click.prevent="goProfil" v-if="user.imageUrl"><img :src="user.imageUrl" alt=""  v-if="user.imageUrl"></a>
                      <a class="nav-link no-profil" href="#" @click.prevent="goProfil" v-if="!user.imageUrl"><img :src="user.imageUrl" alt="" v-if="user.imageUrl"></a>
                  </li>
      
                  <li class="nav-item d-flex flex-lg-column align-items-center">
                    <a class="nav-link active me-1" data-bs-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1"><i class="fas fa-power-off"></i></a>
             
                    <div class="collapse" id="multiCollapseExample1">
                       <button class="btn btn-danger" @click.prevent="deconnexion">Deconnéxion</button>
                    </div>
                  </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'Nav',
    data() {
       return{
          userId:'',
          user:'',
          notifications:'',
          token:''
       }
    },
    //recuperer l'utilisateur dans la base de données
    async created(){
     let local=localStorage.getItem('response')
     let getLocal=JSON.parse(local)
     this.token=getLocal.token
     this.userId = getLocal.userId
     this.user= ((await axios.get(`http://localhost:3000/api/auth/users/${this.userId}`)).data)
     const Total=((await axios.get(`http://localhost:3000/api/notifications/count/${this.userId}`)).data) 
     this.notifications=Total[0].total
    },
    methods:{
      goHome(){
        window.location.replace(`/user/${this.userId}`);
      },

      goUsers(){
        window.location.replace(`/users/${this.userId}`);
      },

      goNotifs(){
        const data={
            userId:this.userId
        }
        const config = {
          headers:{Authorization:`Bearer ${this.token}`}
        };
        const url=`http://localhost:3000/api/notifications/${this.userId}`

        axios.put(url,data,config)
        .then(res =>{ 
          console.log(res)
          window.location.replace(`/notifications/${this.userId}`);
        })
        
      },

      goProfil(){
        window.location.replace(`/profil/${this.userId}`);
      },
      
      deconnexion(){
        localStorage.removeItem('response')
        window.location.replace(`/login`);
      }
    }
}
</script>


<style scoped>
  .nav-container{
      margin:0;
      padding:0;
      margin-top:-52px;
      height: 50px;
      background-color: rgb(224, 120, 120);
      height:75px
  }
  
  .image{
      height: 70px;
      display: flex;
      align-items: center;
      width:19%
  }

  .image a img{
      height: 100%;
      width:100%;
  }
   
    .profil{
      padding: 0;
      margin-top:-5px;
    } 

    .profil a img{
      width:100%;
      height:100%;
      border-radius: 50%;
    }

    .profil a{
        width:60px;
        height:60px;
    }

     .no-profil{
      background-image:url('../assets/image/images.png');
      background-size: 100%;
      border-radius: 50%;
    }

    ul li{
        margin-left: 10px;
    }
     
    .total-notifs{
      position:absolute;
      margin-top:-10px;
      margin-left:-5px;
      color:rgb(224, 120, 120);
      border-radius:50%;
      padding-top:2px;
      padding-bottom:2px;
      padding-left:5px;
      padding-right:5px;
    }
@media screen and (max-width:668px)  {
    .image{
      width:35%
    }
}

@media screen and (min-width:0px) and (max-width:1000px){
   .profil{
       border-radius: 50%;
       margin-left: -8px;
   }

   .deconnexion{
     width:25%
   }
}
</style>