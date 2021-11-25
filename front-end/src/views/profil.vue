<template>
    <div class="container-fluid">
        <Nav/>
        <userProfil v-if="access==false" class="mt-3" ></userProfil>
        <div v-if="access" class="mb-3">
            <div class="col-12 m-auto col-md-10 bg-light  mt-3">
                <div class="title text-center col-11 m-auto mb-3 ">
                   <h1>{{fullname}}</h1>
                </div>
                
        
                <div class="col-12 ">
    
                    <div  id="info-user" class="col-12 d-flex bg-white justify-content-between  mb-3 flex-column flex-md-row">
    
                        <photoProfil/>
            
                        <div class="col-12 col-md-6 text-center text-md-start">
                            <div class="d-flex flex-column mb-2">
                               <label for="email" class="mb-1">Email</label>
                               <input type="email" id="email" class="user-data" v-model="email">
                               <small class="text-danger"></small>
                            </div>
                             
                            <div class="d-flex flex-column mb-2">
                               <label for="name" class="mb-1">Nom</label>
                               <input type="text" id="name" class="user-data" v-model="nom">
                            </div>
    
                            <div class="d-flex flex-column mb-2">
                               <label for="secondName" class="mb-1">Prénom</label>
                               <input type="text" id="secondName" class="user-data" v-model="prenom">
                            </div>
    
                        
                            <div class="d-flex flex-column mb-2">
                                <label for="description" class="mb-1">Description</label>
                                <textarea name="description" id="description" cols="30" rows="10" placeholder="Votre nouvelle description" v-model="description"></textarea>
                            </div>
    
                            <div class="col-12 text-center mt-5">
                                <button class="btn btn-danger m-auto" @click.prevent="updateUser">Mettre á jour mon profil</button>
                            </div>
    
                        </div>
    
                    </div>
                        
                    <div class="col-12 d-flex text-center ">
                        <div class="col-6">
                            <h1 class="change-password-title mb-3">Changer de mot de passe</h1>
                            <div class="d-flex m-auto flex-column mb-3">
                                <label for="password" class="mb-1">Mot de passe actuel</label>
                                <input type="password" name="password"  class="form-control password-change" id="password" v-model="password">
                                <small class="text-danger"></small>
                            </div>
    
                            <div class="d-flex m-auto flex-column mb-3">
                                <label for="password" class="mb-1">Nouveau mot de passe</label>
                                <input type="password" name="new_password"  class="form-control password-change" id="new_password" v-model="newPassword">
                                <small class="text-danger"></small>
                            </div>
            
                            <div>
                                <button class="btn btn-danger  mb-3 mt-2" @click.prevent="updatePassword">Enregistrer</button>
                            </div>
                        </div>
        
                        <div class="col-6">
                            <h1 class="change-password-title">Supprimer mon compte</h1>
                            <div>
                                <button class="btn btn-danger" data-bs-toggle="collapse" href="#avis" role="button" aria-expanded="false" aria-controls="avis">Supprimer</button>
                            </div>
                            <div class="collapse mt-2 mb-3" id="avis">
                                 <h2 class="change-password-title">Voulez vous vraiment supprimer le compte</h2>
                                 <button class="btn btn-danger" @click.prevent="deleteUser">Oui</button>
                            </div>
                        </div>
                    </div>
                </div>
        
            </div>
        </div> 

        <userPublication/>   
    </div>

</template>


<script>
import axios from 'axios'
import userPublication from '../components/userPublication.vue'
import Nav from '../components/nav.vue'
import photoProfil from '../components/photoProfil.vue'
import userProfil from '../components/userProfil.vue'
export default {
    components:{userPublication , Nav , photoProfil , userProfil},
    name:'Profil',
    data() {
        return{
            password:'',
            newPassword:'',
            user:'',
            userId:'',
            email:'',
            nom:'',
            prenom:'',
            description:'',
            fullname:'',
            access:'true'
        }
    },
    beforeCreate(){
        if(!localStorage.getItem('response')){
            this.$router.push('/') 
        } 
    },
    async created(){
        let local=localStorage.getItem('response')
        let getLocal=JSON.parse(local)
        this.userId = getLocal.userId
        this.user= ((await axios.get(`http://localhost:3000/api/auth/users/${this.userId}`)).data)
        this.email=this.user.email
        this.nom=this.user.nom
        this.prenom=this.user.prenom
        this.description=this.user.description
        this.fullname=this.user.prenom + ' ' + this.user.nom
        if(this.$route.params.id != this.userId){
            this.access=false
        }
    },
    methods:{  
       //modification du profil  
        async updateUser(){
           let getLocal=localStorage.getItem('response')
           const getToken=JSON.parse(getLocal)
           const token=getToken.token
           //verifier l'email de l'utilisateur
           //eslint-disable-next-line
           let emailRegexp='^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$';
           let emailRegexpValue=new RegExp(emailRegexp)
           let testemail=emailRegexpValue.test(this.email);
           if(!testemail){
               const emailInput=document.querySelector('#email')
               const small =emailInput.nextElementSibling
               small.innerHTML='Cet email est invalide'
           }
           let data={
              email:this.email,
              nom:this.nom,
              prenom:this.prenom,
              description:this.description,
           }
            const config = {
              headers: { Authorization: `Bearer ${token}` }
            };
            const urlData=`http://localhost:3000/api/profil/${this.userId}`;
    
            let formData = new FormData();
            formData.append('image', this.$store.state.imageUrl);
            
            if(testemail){
               axios.put(urlData ,data,config)
               .then(res => alert(res.data.Message))
   
               const configUpload = {
                 headers: { Authorization: `Bearer ${token}` },
                 'Content-Type': 'multipart/form-data'
               };
   
               const urlImage=`http://localhost:3000/api/upload/${this.userId}`; 
   
               if(this.$store.state.imageUrl !==null){
                   axios.put(urlImage ,formData,configUpload)
               }
               this.$router.go()
            }    
        },

        //Changer le mot de passe 
        updatePassword(){
            let data={
                password:this.password,
                newPassword:this.newPassword
            }

           let passwordInput=document.querySelector('#password')
           let newPasswordInput=document.querySelector('#new_password') 

           //verifier le mot de passe de l'utilisateur
           //eslint-disable-next-line
           let passwordRegexp='^[a-zA-Z0-9]{8,32}$'
           let passwordRegexpValue=new RegExp(passwordRegexp)
           let testPassword=passwordRegexpValue.test(this.password)
           if(testPassword){
               document.querySelector('#password').classList.add('is-valid')
               document.querySelector('#password').classList.remove('is-invalid')
               let small=passwordInput.nextElementSibling;
               small.innerHTML=''
           }else{
               document.querySelector('#password').classList.add('is-invalid')
               document.querySelector('#password').classList.remove('is-valid')
               let small=passwordInput.nextElementSibling;
               small.textContent='Le mot de passe doit contenir au minimum 8 caractéres avec au minimu 2 lettres'
           } 

           let newPasswordRegexp='^[a-zA-Z0-9]{8,32}$'
           let newPasswordRegexpValue=new RegExp(newPasswordRegexp)
           let testNewPassword=newPasswordRegexpValue.test(this.newPassword)
           if(testNewPassword){
               document.querySelector('#new_password').classList.add('is-valid')
               document.querySelector('#new_password').classList.remove('is-invalid')
               let small=newPasswordInput.nextElementSibling;
               small.textContent=''
           }else{
               document.querySelector('#new_password').classList.add('is-invalid')
               document.querySelector('#new_password').classList.remove('is-valid')
               let small=newPasswordInput.nextElementSibling;
               small.textContent='Le mot de passe doit contenir au minimum 8 caractéres avec au minimu 2 lettres'
           } 
           
           //envoyer les données au serveur
           if(testNewPassword && testPassword){
                const getLocal=localStorage.getItem('response')
                const getToken=JSON.parse(getLocal)
                const token=getToken.token
                const config = {
                   headers: { Authorization: `Bearer ${token}` }
                };
                const url=`http://localhost:3000/api/profil/password/${this.userId}`
                axios.put(url,data,config)
                .then(res=>{
                    if(res.data.Message){
                     alert(res.data.Message)
                     this.$router.go()
                    }else{
                        document.querySelector('#password').classList.add('is-invalid')
                        document.querySelector('#password').classList.remove('is-valid')
                        let small=passwordInput.nextElementSibling;
                        small.textContent=res.data.error
                    }
                })
                .catch(error => console.log(error))
                
           }
        },
        
        //supprimer le compte 
        deleteUser(){
            const getLocal=localStorage.getItem('response')
            const getToken=JSON.parse(getLocal)
            const token=getToken.token
            const config = {
               headers: { Authorization: `Bearer ${token}` }
            };
            const url=`http://localhost:3000/api/profil/${this.userId}`
            axios.delete(url,config)
            .then(res =>{
                if(res.data.Message){
                    localStorage.removeItem('response')
                    this.$router.push({ path:`/` })
                }
            })
        }
    }
}
</script>


<style scoped>
.title{
    border-bottom:2px solid rgb(224, 120, 120);
    padding-top:10px;
    padding-bottom: 10px;
    color:rgb(233, 64, 64);
}

.image{
   height:200px;
   width:200px;
   border-radius: 50%;
   margin:auto;
   background-image:url('../assets/image/images.png');
   background-size: 100%;
   border-radius: 50%;
}

.image img{
    height: 100%;
    width:100%;
    border: 1px solid rgb(233, 64, 64);
    border-radius: 50%;
    background-color: black;
}


#input-description{
    width:80%;
    height:100px;
    border: 1px solid black;
    text-align: center;
    border-radius: 10px;
}

#info-user{
    border-bottom: 2px solid rgb(233, 64, 64);
    padding-bottom:30px;
    width: 98%;
    margin:auto
}

.password-change{
   width:50%;
   margin: auto;
}

.change-password-title{
    font-size: 1.5em;
}

label{
    font-weight: bold;
}

.user-data{
   border: none;
   border-bottom: 2px solid rgb(233, 64, 64);
}

.user-data:focus{
    outline: none;
}

#description{
    border:0.8px solid  rgb(233, 64, 64);
    border-radius:5px;
}

#description:focus{
    outline-color:rgb(233, 64, 64);
    outline-style: ridge;
}

</style>