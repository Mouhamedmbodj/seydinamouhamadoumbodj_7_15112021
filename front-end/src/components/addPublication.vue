<template>
    <div class="container-fluid">
        <h1 class="col-12 text-center title mb-3 mt-2">Dernières publications</h1>

        <div class="col-12 col-md-7 col-lg-5 m-auto new-publication">
            <h2 class="col-12 text-center"> Exprimez-vous...</h2>
            <div class="col-10 m-auto image" v-if="preview" >
                <img :src="preview" alt="">
            </div>
            <div class="col-10 m-auto">
                <textarea id="text-publication" name="w3review" rows="4" cols="50" class="col-12" placeholder="Ajouter un texte" v-model="description">
                 
                </textarea>
            </div>
            
            <div class="col-12 d-flex justify-content-around pb-2">
                <input type="file" style="display:none" @change="onFileSelected" ref="fileInput">
                <button class="btn  btn-outline-danger"  @click="$refs.fileInput.click()">Choisir une image</button>
                <button class="btn  btn-outline-danger" @click="savePost">Publier</button>
            </div>                                                                                                     
        </div>
    </div>
   
</template>


<script>
import axios from 'axios'
export default {
    name:'addPublication',
    data() {
       return{
           preview:null,
           description:null,
           file:null,
           userId:'',
           token:''
       } 
    },
    created(){
       let local=localStorage.getItem('response')
        let getLocal=JSON.parse(local)
        this.token=getLocal.token
        this.userId = getLocal.userId
    },
    methods:{
        onFileSelected(e){
            this.file=e.target.files[0]
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
        savePost(){

            const configUpload = {
              headers: { Authorization: `Bearer ${this.token}` },
              'Content-Type': 'multipart/form-data'
            };

            const config = {
              headers: { Authorization: `Bearer ${this.token}` }
            };
   
            const formData = new FormData();
            formData.append('image', this.file);

            const urlData=`http://localhost:3000/api/posts/${this.userId}`
            
            const Data={
                userId:this.userId,
                description:this.description,
                file:this.file,
                date:'',
            }

             const current = new Date();
             const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`
             Data.date=date

            if(this.description != null || this.file != null){
                if(this.file !=null){
                    const urlImage=`http://localhost:3000/api/upload/posts/${this.userId}`
                    axios.post(urlImage,formData,configUpload)
                    .then(res=>{
                        if(res){
                            Data.file=res.data
                            console.log(Data)
                            axios.post(urlData,Data,config)
                            .then(res => alert(res.data.Message))  
                        }
                    })
                }else{
                     axios.post(urlData,Data,config)
                     .then(res => alert(res.data.Message))  
                }  
                this.$router.go()
            } 
        } 
    }
}
</script>

<style scoped>

  .title{
      font-size: 2em;
      color:rgb(192, 13, 7);
      border-bottom: 1px solid rgb(192, 13, 7);
      padding-bottom:5px;
  }

  h2{
    font-size: 2em;
    color:rgb(226, 122, 118);
  }

  #text-publication{
      color:rgb(226, 122, 118);
  }

  .new-publication{
      background-color:rgb(255, 255, 255);
      border-radius: 5px;
  }

  .image{
      height:300px;
      border:1px solid rgb(192, 13, 7);
  }

  .image img{
      width:100%;
      height:100%;
  }
</style>