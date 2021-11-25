<template>
    <div class="container-fluid form-container">
        <div class="image col-12 text-center mt-3">
            <img src="../assets/image/icon-above-font.png" alt="">
        </div>
        <form action="" class="m-auto col-md-4 col-10 mt-3">
            <div class="col-12 text-center mb-3 border-bottom">
                <h1 class="title"><strong>Connectez vous á Groupomania</strong> </h1>
            </div>
            <div class="mb-3">
                <input type="email" id="email" class="form-control" placeholder="Email" v-model="email">
            </div>
            <div class="mb-3">
                <input type="password" id="password" class="form-control" placeholder="Password" v-model="password">
                <small class="text-danger"></small>
            </div>
            <div class="col-12 text-center">
                <button class="text-center btn btn-outline-success form-button m-auto" @click.prevent="valid">Entrer</button>
            </div>
            <div class="col-12 text-center mt-3"><p class="text-danger"><strong id="error"></strong></p></div> 

            <div class="col-12 text-center mt-1">
                <a href="/">Créer un nouveau compte</a>
            </div>
        </form>
    </div>
</template>


<script>
import axios from 'axios'
export default{
    name:'Login',
    data() {
        return{
            email:'',
            password:'',
        }
    },
    methods:{
       valid(){
           //verifier l'email de l'utilisateur
           //eslint-disable-next-line
           let emailRegexp='^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$';
           let emailRegexpValue=new RegExp(emailRegexp)
           let testemail=emailRegexpValue.test(this.email);
           if(testemail){
               document.querySelector('#email').classList.add('is-valid')
               document.querySelector('#email').classList.remove('is-invalid')
           }else{
               document.querySelector('#email').classList.add('is-invalid')
               document.querySelector('#email').classList.remove('is-valid')
           }


           //verifier le mot de passe de l'utilisateur
           //eslint-disable-next-line
           let passwordRegexp='^[a-zA-Z0-9]{8,32}$';
           let passwordRegexpValue=new RegExp(passwordRegexp)
           let testPassword=passwordRegexpValue.test(this.password);
           if(testPassword){
               document.querySelector('#password').classList.add('is-valid')
               document.querySelector('#password').classList.remove('is-invalid')
           }else{
               document.querySelector('#password').classList.add('is-invalid')
               document.querySelector('#password').classList.remove('is-valid')
               let small=document.querySelector('#password').nextElementSibling
               small.textContent='Le mot de passe doit contenir au minimum 8 caractéres contenant au minimum une lettre'
           } 

           //envoyer les données si l'email et le mot de passe sont valide
            if(testemail && testPassword){
               const Data={
                    email:this.email,
                    password:this.password
                }
                axios.post('http://localhost:3000/api/auth/login',Data)
                .then( response => { if(response.data.error){
                    console.log(response.data.error)
                    document.querySelector('#error').innerHTML=(response.data.error)
                   }else{
                        localStorage.setItem('response' , JSON.stringify(response.data))
                         const getResponse=localStorage.getItem('response')
                         const getId=JSON.parse(getResponse)
                         let userId=getId.userId
                         this.$router.push({ path:`/user/${userId}` })
                   }})
                  .catch(error =>document.querySelector('#error').innerHTML=error)
                
            }else{
               document.querySelector('#error').innerHTML='veuillez remplir correctement les champs'
            }
       }
    }
}
</script>

<style scoped>
   .form-container{
    width:100%;
    height:625px;
    background-color: rgb(243, 204, 204);
    display: flex;
    align-items: center;
    flex-direction: column;
}

form{
    background-color: white;
    border: 1px solid white;
    border-radius: 8px;
    padding:10px;
}

.title{
   font-size:1em
}

.subtitle{
    font-size:1em;
    color: rgb(122, 124, 123);
}

.image{
      height: 200px;
}

.image img{
    height: 100%;
}
</style>