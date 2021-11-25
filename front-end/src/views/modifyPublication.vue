<template>
    <div class="container-fluid bloc-publication">
        <Nav/>
        <h1 class="col-12 text-center title">MODIFICATION</h1>

        <div class="col-12  col-md-7 col-lg-6 m-auto bg-light new-publication pb-3" v-for="(post) in posts" :key="post.postId">
            <div v-if="post.postId==paramsId">
                <div class="d-flex align-items-center col-10 m-auto mb-2">
                    <div class="image-user ms-2">
                        <img :src="post.imageUrl" alt="" v-if="post.imageUrl !=null">
                        <img src="../assets/image/images.png" v-if="post.imageUrl==null">
                    </div>
                    <div>
                      <p class="user mt-2 mb-0 ms-2">{{post.prenom}}</p>
                      <p class="date mt-0 ms-2">{{post.date}}</p>
                    </div> 
                </div>
    
                <div class="col-10 m-auto">
                    <textarea id="text-publication" name="w3review" rows="4" cols="50" class="col-12" placeholder="Exprimez vous....." v-model='description'>
                     
                    </textarea>
                </div>
    
                
                <div class="col-10 col-md-5 m-auto image" v-if="post.postShared==null && file" >
                    <img :src="preview" alt="" v-if="preview">
                    <img :src="file" v-if="preview==null && file">
                    <button class="btn btn-danger text-light close" @click="closeImage"><i class="fas fa-times"></i></button>
                </div>
                
    
                <div v-if="post.postShared">
                    <div v-for="(user) in posts" :key="user.postId">
                        <div v-if="post.postShared==user.postId" class="postShared col-9 m-auto">
                            <div class="d-flex align-items-center" id="postShared">
                                <div class="image-user ms-2">
                                   <img :src="user.imageUrl" alt="" v-if="user.imageUrl !=null">
                                   <img src="../assets/image/images.png" v-if="user.imageUrl==null">
                                </div>
                                <div class="mt-1">
                                   <p class="user mt-2 mb-0 ms-2">{{user.prenom}}</p>
                                   <p class="date mt-0 ms-2">{{user.date}}</p>
                                </div>

                            </div>

                            <div class="col-12 publication-image text-center" v-if="user.file">
                               <img :src="user.file" alt="">
                            </div>
                            <div class="col-12 d-flex bg-light description mb-1">
                                <p>{{user.postDescription}}</p>
                            </div> 
                        </div>  
                    </div>
                </div>

                <div class="col-12 col-md-7 col-lg-5 m-auto d-flex justify-content-around pb-2 mt-2 bg-light pt-2">
                    <button class="btn  btn-outline-danger ms-2"  @click="$refs.fileInput.click()" v-if="post.postShared==null">Changer l'image</button>
                    <button class="btn  btn-outline-danger me-2" @click="savePost">Enregistrer</button>
                </div>  
            </div>
        </div> 

        <input type="file" style="display:none" @change="onFileSelected" ref="fileInput">

    </div>
   
</template>




<script>
import axios from 'axios'
import Nav from '../components/nav.vue'
export default {
    components:{Nav},
    name:'modifyPublication',
     data() {
       return{
           preview:null,
           description:null,
           file:null,
           userId:'',
           token:'',
           paramsId:'',
           posts:'',
           buttonImage:true,
       } 
    },
    beforeCreate(){
       const getPostId=localStorage.getItem('edit')
       this.paramsId=this.$route.params.id
       if(getPostId!=this.paramsId){
            localStorage.removeItem('edit')
            this.$router.push('/login') 
       }
    },
    async created(){
        let local=localStorage.getItem('response')
        let getLocal=JSON.parse(local)
        this.token=getLocal.token
        this.userId = getLocal.userId
        this.paramsId=this.$route.params.id
        const config = {
            headers: { Authorization: `Bearer ${this.token}` }
        };
        const url=`http://localhost:3000/api/posts/${this.userId}`
        this.posts= ((await axios.get(url,config)).data)
        let post={}
        for(post of this.posts){
            if(post.postId ==this.paramsId){
                this.description=post.postDescription
                this.file=post.file
            }
        }
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

            const urlData=`http://localhost:3000/api/posts/${this.paramsId}`
            
            const Data={
                PostId:this.paramsId,
                description:this.description,
                file:this.file,
                date:'',
            }

             const current = new Date();
             const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`
             Data.date=date

            if(this.description != null || this.file == null){
                if(this.file !=null){
                    const urlImage=`http://localhost:3000/api/upload/posts/${this.paramsId}`
                    axios.put(urlImage,formData,configUpload)
                    .then(res=>{
                        if(res){
                            Data.file=res.data
                            console.log(Data)
                            axios.put(urlData,Data,config)
                            .then(res =>{ 
                                  alert(res.data.Message)
                                  this.$router.push({ path:`/user/${this.userId}` 
                                }) 
                            })
                        }
                    })
                }else{
                    axios.put(urlData,Data,config)
                    .then(res =>{ 
                          alert(res.data.Message)
                          this.$router.push({ path:`/user/${this.userId}` 
                        }) 
                    })
                      
                }  
            } 
        },
        closeImage(){
            this.file=null
        }, 
    }
}
</script>


    
<style scoped>
    
   .bloc-publication{
      height:100%;
      padding-bottom:5px
   }

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

  .image-user img{
    height: 100%;
    width:100%;
    border-radius: 50%;
  }
   
  .image-user{
    width:52px;
    height:52px;
    border-radius: 50%;
   } 

   .description{
     height: auto;
     padding-top: 10px;
     padding-bottom: 10px;
   }

  .description p{
    margin: auto;
    margin-left: 10px;
    width:96%;
  }

  .postShared{
     border: 1px solid rgb(192, 13, 7);
     border-radius: 5px;
  }

  textarea::placeholder{
      color:rgb(226, 122, 118);
  }

  .close{
      position:absolute;
      margin-left:-35px;
      width:25;
      text-align: center;
  }
</style>