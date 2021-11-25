<template>
    <div class="container col-11 col-md-8 row profil-container m-auto bg-light">
        <div class="profil col-6" :class="{noProfil : !user.imageUrl}">
           <img :src="user.imageUrl" class="" alt="..." v-if="user.imageUrl">
           <span class="no-profil"></span>
        </div>  

        <div class="col-6">
            <div class="fullname col-12 ms-5 text-dark">
               <h1><span class="nom">{{user.nom}}</span> <span class="nom">{{user.prenom}}</span></h1> 
            </div>
            
            <div class="description col-12 ms-5 text-dark">
                <p>{{user.description}}</p>
            </div>
        </div>
    </div>    
</template>


<script>
import axios from 'axios'
export default{
    name:'userProfil',
    data() {
        return{
            userId:'',
            user:'',
        }
    },
    //recuperer l'utilisateur dans la base de données
    async created(){
        this.userId = this.$route.params.id
        this.user= ((await axios.get(`http://localhost:3000/api/auth/users/${this.userId}`)).data)
    },
}
</script>

<style scoped>
  
    .profil{
     border-radius: 50%;
     height:200px;
     width:200px;
     border: 2px solid rgb(233, 64, 64);
    }
    
    .noProfil{
     background-image:url('../assets/image/images.png');
     background-size: 100%;
    }

    .profil img{
        width:100%;
        height:100%;
        border-radius:50%;
    }

   .profil-container{
       border: 1px solid rgb(233, 64, 64);
       border-radius:10px;
       padding-top:10px;
       padding-bottom:10px;
   }
    
   .nom{
       text-transform: capitalize;
   } 

   .description{
       font-size:1.2em
   }
</style>