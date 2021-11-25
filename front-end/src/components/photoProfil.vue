<template>
    <div class="col-md-6 text-center col-12">
        <h2 class="col-12 text-center title-2">Photo de profil</h2>
        <div class="image">
            <img  :src="user.imageUrl" alt="" v-if="user.imageUrl && preview==null">
            <img :src="preview" alt="" v-if="preview"  >
        </div>
        <div class="col-12 text-center">
            <input type="file" style="display:none" @change="onFileSelected" ref="fileInput">
            <button class="btn btn-danger mt-2 mb-3" @click="$refs.fileInput.click()">Changer ma photo de profil</button>
        </div>
    </div>
</template>


<script>
import axios from 'axios'
export default {
    name:'photoProfil',
    data() {
        return{
            preview:null,
            user:''
        }
    },
    //recuperer l'utilisateur dans la base de données
    async created(){
        const local=localStorage.getItem('response')
        let getLocal=JSON.parse(local)
        this.userId = getLocal.userId
        this.user= ((await axios.get(`http://localhost:3000/api/auth/users/${this.userId}`)).data)
    },
    methods:{
        //changer la photo de profil
        onFileSelected(e){
            this.$store.state.imageUrl=e.target.files[0]
            
            var input = e.target;
            if (input.files) {
              var reader = new FileReader();
              reader.onload = (e) => {
                this.preview = e.target.result;
              }
              this.image=input.files[0];
              reader.readAsDataURL(input.files[0]);
            }
        }, 
    }
}
</script>

<style scoped>
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

</style>