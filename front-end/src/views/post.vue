<template>
    <div class="container col-12">
        <Nav/>
        <!--bloc publication--> 
        <div  v-for="(post) in posts" :key="post.postId" >

            <div v-if="post.postId==IdUrl" class="bg-light col-12 col-md-8 col-lg-6 m-auto mt-5 mb-5  pb-3" >
                <!--si la publication n'est pas un partage d'une autre publication-->
                <div class="col-12 publication-header bg-light" v-if="post.postShared==null">
                    <div class="d-flex align-items-center">
                        <div class="image-user ms-2">
                            <img :src="post.imageUrl" alt="" v-if="post.imageUrl !=null">
                            <img src="../assets/image/images.png" v-if="post.imageUrl==null">
                        </div>
                        <div>
                          <p class="user mt-2 mb-0 ms-2">{{post.prenom}}</p>
                          <p class="date mt-0 ms-2">{{post.date}}</p>
                        </div> 
                    </div>
    
                    <div class="btn" role="group">
                       <button id="btnGroupDrop1" type="button" class="btn text-light bg-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                         <i class="fas fa-ellipsis-h"></i>
                       </button>
                       <ul class="dropdown-menu text-center" aria-labelledby="btnGroupDrop1" >
                          <button class="btn btn-outline-danger delete-publication-btn" :id="post.postId" v-if="userId==post.userId || status !=1" @click="deletePost($event)"><i class="fas fa-trash-alt"></i></button>
                          <button class="btn btn-primary ms-2" @click="Share($event)" :id="post.postId"><i class="fas fa-share-square"></i></button>  
                          <button class="btn btn-primary ms-2" v-if="userId==post.userId || status !=1" :id="post.postId" @click="Edit($event)"><i class="fas fa-edit"></i></button>
                       </ul>
                    </div>
                </div>
            
                <!--si la publication est un partage-->
                <div v-if="post.postShared" class="col-12">
                    
                    <div class="col-12 publication-header bg-light">
                        <div class="d-flex align-items-center">
                            <div class="image-user ms-2">
                                <img :src="post.imageUrl" alt="" v-if="post.imageUrl !=null">
                                <img src="../assets/image/images.png" v-if="post.imageUrl==null">
                            </div>
                            <div>
                              <p class="user mt-2 mb-0 ms-2">{{post.prenom}}</p>
                              <p class="date mt-0 ms-2">{{post.date}}</p>
                            </div> 
                        </div>
        
                        <div class="btn" role="group">
                           <button id="btnGroupDrop1" type="button" class="btn text-light bg-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                             <i class="fas fa-ellipsis-h"></i>
                           </button>
                           <ul class="dropdown-menu text-center" aria-labelledby="btnGroupDrop1" >
                              <button class="btn btn-outline-danger delete-publication-btn" :id="post.postId" v-if="userId==post.userId || status !=1" @click="deletePost($event)" ><i class="fas fa-trash-alt"></i></button>
                              <button class="btn btn-primary ms-2" :id="post.postId" @click="Share($event)"><i class="fas fa-share-square"></i></button>  
                              <button class="btn btn-primary ms-2" v-if="userId==post.userId || status !=1" :id="post.postId" @click="Edit($event)"><i class="fas fa-edit"></i></button>
                           </ul>
                        </div>
                    </div>
                     
                    <div class="col-12 d-flex bg-light description mb-1" v-if="post.postDescription">
                       <p>{{post.postDescription}}</p>
                    </div> 
                     
                    <!--Recuperer la publication partagée--> 
                    <div v-for="(user) in posts" :key="user.postId">
    
                        <div v-if="post.postShared==user.postId" class="mb-3 container-fluid bg-light col-11 postShared">
    
                            <div class="d-flex align-items-center">
                               <div class="image-user ms-2">
                                   <img :src="user.imageUrl" alt="" v-if="user.imageUrl !=null">
                                   <img src="../assets/image/images.png" v-if="user.imageUrl==null">
                               </div>
                               <div>
                                 <p class="user mt-2 mb-0 ms-2">{{user.prenom}}</p>
                                 <p class="date mt-0 ms-2">{{user.date}}</p>
                               </div> 
                            </div>    
                          
                             <div class="col-12 publication-image" v-if="user.file">
                                 <img :src="user.file" alt="">
                             </div>
                             <div class="col-12 d-flex bg-light description mb-1">
                                 <p>{{user.postDescription}}</p>
                             </div> 
    
                        </div>
    
                    </div>
                    <!-----------------------fin------------------------->
    
                </div>  
                <!-------------------fin affichage si la publication est un partage-------------->

                <div class="col-12 publication-image" v-if="post.file">
                     <img :src="post.file" alt="">
                </div>
                <div class="col-12 d-flex bg-light description mb-1" v-if="post.postDescription && post.postShared==null">
                    <p>{{post.postDescription}}</p>
                </div>

            
                <div class="col-12 d-flex bg-light">  
                    <div class="col-6 avis btn text-center like" :id="post.postId">
                        <div :id="post.postId" @click="Likes($event)" :class="{red:post.usersLiked==userId}">
                            <i class="fas fa-thumbs-up"><span class="ms-2">{{post.likes}}</span></i>
                        </div>
                    </div>            
                    
                    <div class="col-6 avis btn  text-center dislike">
                        <div  :id="post.postId"  @click="disLikes($event)" :class="{red:post.usersDisliked==userId}">
                            <i class="fas fa-thumbs-down"></i><span class="ms-2">{{post.dislikes}}</span>
                        </div>
                    </div>
                </div>
                    
                <div class="col-12 mb-3 mt-3 d-flex" v-for="comment in comments" :key="comment.id">
                    <div class="d-flex col-12 justify-content-between" v-if="comment.postId==post.postId">
                        <div class="d-flex col-12">
                            <div class="image-user me-3 ms-2 mt-2 col-4">
                               <img :src="comment.imageUrl" alt="" v-if="comment.imageUrl !=null">
                               <img src="../assets/image/images.png" v-if="comment.imageUrl==null">
                            </div>
                            <div class="bg-success p-2 text-dark bg-opacity-10 me-2 col-8">
                                <h2 class="comment-title">{{comment.prenom}}</h2>
                                <div class="col-12">
                                    <textarea class='comment hidden' :id="comment.commentId" type="textarea"  @change="activateButton($event)"></textarea>
                                    <p class="comment">{{comment.comment}}</p>
                                    <div class="col-12 justify-content-between" v-if="comment.userId==userId || status !=1 "> 
                                      <div class="d-flex justify-content-between mb-2">
                                        <button class="btn btn-outline-secondary hidden save" :id="comment.commentId" @click="quit($event)">Quitter</button>
                                        <button class="btn btn-outline-info disabled hidden save" :id="comment.commentId" @click="saveComment($event)">Enregistrer</button>
                                      </div>
                                      
                                      <div class="d-flex justify-content-between">
                                        <button class="btn btn-outline-danger delete-publication-btn" :id="comment.commentId" @click="deleteComment($event)"><i class="fas fa-trash-alt"></i></button>                                  
                                        <button class="btn btn-primary ms-2" :id="comment.commentId" @click="EditComment($event)"><i class="fas fa-edit"></i></button> 
                                      </div>
                                    </div> 
                                </div>
                            </div>
                        </div>    
                    </div>
                </div>
                    
                <div class="col-12">
                    <div class="d-flex align-items-center">
                        <div class="image-user me-3 ms-2 mt-1">
                            <img :src="user.imageUrl" alt="" v-if="user.imageUrl !=null">
                            <img src="../assets/image/images.png" v-if="user.imageUrl==null"> 
                        </div>
                        <div class="add-comment-input">
                            <input type="text"  placeholder="Ajouter un commentaire..." v-on:keyup.enter="createComment($event)" :id="post.postId"  @keyup="comment=$event.target.value">
                        </div>
                    </div>
                </div>  

            </div>  

        </div> 
    </div>
</template>


<script>
import axios from 'axios'
import Nav from '../components/nav.vue'
export default {
    components:{Nav},
    name:'post',
    data(){
        return{
            posts:[],
            comments:[],
            token:'',
            userId:'',
            status:'',
            access:false,
            IdUrl:'',
            user:'',
        }
    },
    beforeCreate(){
        if(!localStorage.getItem('response')){
            this.$router.push('/') 
        } 
    },
    async created(){
        const local=localStorage.getItem('response')
        const getLocal=JSON.parse(local)
        this.token=getLocal.token
        this.userId =getLocal.userId
        this.IdUrl=this.$route.params.id
        this.status=getLocal.status
        const config = {
            headers: { Authorization: `Bearer ${this.token}` }
        };
        const url=`http://localhost:3000/api/posts/${this.userId}`
        this.posts= ((await axios.get(url,config)).data)

        const urlcomments=`http://localhost:3000/api/comments`
        this.comments=((await axios.get(urlcomments,config)).data)  

        this.user=((await axios.get(`http://localhost:3000/api/auth/users/${this.userId}`)).data)
    },
    methods:{
        verify(event){
            console.log(event.currentTarget.id)
        },

        Edit(e){
            const postId=e.currentTarget.id
            localStorage.setItem('edit', postId)
            window.location.replace(`/modifyPublication/${postId}`);
        },

        deletePost(e){
            const postId=e.currentTarget.id
            const config = {
              headers: { Authorization: `Bearer ${this.token}` }
            };
            const url=`http://localhost:3000/api/posts/${postId}`
   
            axios.delete(url,config)
            .then(res =>{ 
                alert(res.data.Message)
                this.$router.go()
            })
        },

        Share(e){
            const postId=e.currentTarget.id
            const userId=this.userId
            const data={
                postId:parseInt(postId),
                userId:userId
            }
            const current = new Date();
            const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`
            data.date=date
            const url=`http://localhost:3000/api/posts/share/${this.userId}`

            const config = {
              headers: { Authorization: `Bearer ${this.token}` }
            };

            axios.post(url,data,config)

            .then(res => {
                alert(res.data.Message)
                this.$router.go()
            })  

        },
        createComment(e){
            const postId=e.currentTarget.id
            const userId=this.userId
            const comment=e.currentTarget.value
            const data={
                postId:postId,
                userId:userId,
                comment:comment
           }
           const config = {
             headers: { Authorization: `Bearer ${this.token}` }
           };
           const url=`http://localhost:3000/api/comments/${userId}`
            axios.post(url,data,config)
            .then(res => {
                const notUrl=`http://localhost:3000/api/notifications/comments`
                data.form='a commenter votre post'
                axios.post(notUrl,data,config)
                alert(res.data.Message)
                this.$router.go()
            })
        },
        EditComment(e){
            const commentId=e.currentTarget.id
            const getEl=document.querySelectorAll('.hidden')
            const getbutton=document.querySelectorAll('.save')
            let btn=''
            let el=''
            for(el of getEl){
                if(el.id == commentId){
                    let comment=''
                    for(comment of this.comments){
                        if(comment.commentId==commentId){
                            el.value=comment.comment
                            for(btn of getbutton){
                                if(btn.id==commentId){
                                    btn.classList.remove('hidden')
                                }
                            }
                        }
                    }
                    el.classList.remove('hidden')
                    el.nextElementSibling.classList.add('hidden')
                }
            }
        },
        activateButton(e){
            console.log(true)
            const Id=e.currentTarget.id
            let el=''
            const getEl=document.querySelectorAll('.save')
            for(el of getEl){
                if(el.id==Id){
                    el.classList.remove('disabled',) 
                }
            }
        },
        quit(e){
            const Id=e.currentTarget.id
            const getEl=document.querySelectorAll('textarea')
            const getbutton=document.querySelectorAll('.save')
            let el=''
            let btn=''
            for(el of getEl){
                if(el.id==Id){
                    el.nextElementSibling.classList.remove('hidden')
                    el.classList.add('hidden')
                }
            }
            for(btn of getbutton){
                if(btn.id==Id){
                    btn.classList.add('hidden')
                }
            }
        },
        saveComment(e){
            const commentId=e.currentTarget.id
            const getEl=document.querySelectorAll('textarea')
            let el=''
            const data={
            }
            for(el of getEl){
                if(el.id == commentId){
                    data.commentId=el.id
                    data.comment=el.value
                    const url=`http://localhost:3000/api/comments/${this.userId}`
                    console.log(data) 
                   const config = {
                     headers: { Authorization: `Bearer ${this.token}` }
                   };

                    axios.put(url,data,config)
                    .then(res => {
                        alert(res.data.Message)
                        this.$router.go()
                    })  
                }
            }
        },
        deleteComment(e){
            const Id=e.currentTarget.id
            const data={
                commentId:Id
            }
            const url=`http://localhost:3000/api/comments/${data.commentId}`
            const config = {
              headers: { Authorization: `Bearer ${this.token}` }
            };
            axios.delete(url,config)
            .then(res => {
                alert(res.data.Message)
                this.$router.go()
            })  
        },
        Likes(e){
            const postId=e.currentTarget.id
            const getEl=document.querySelectorAll('.like')
            const config = {
             headers: { Authorization: `Bearer ${this.token}` }
            };
            const url=`http://localhost:3000/api/posts/like/${this.userId}`
            let el=''
            let post=''
            const data={}
            for(el of getEl){
                if(el.id==postId){
                    for(post of this.posts){
                        if(post.postId==postId && post.usersLiked==this.userId){
                            data.like=0
                            data.usersLiked=this.userId
                            data.avisPostId=postId
                            axios.post(url,data,config)
                            .then(res => {
                                alert(res.data.Message)
                                this.$router.go()
                            })
                        }
                        if(post.postId==postId && post.usersLiked!=this.userId){
                            data.like=1
                            data.usersLiked=this.userId
                            data.avisPostId=postId
                            data.avisUserId=this.userId
                            axios.post(url,data,config)
                            .then(res => {
                                const data={
                                    postId:postId,
                                    userId:this.userId
                                }
                                const notUrl=`http://localhost:3000/api/notifications/like`
                                data.form='a aimer votre post'
                                axios.post(notUrl,data,config)
                                alert(res.data.Message)
                                this.$router.go()
                            })  
                        }

                    }
                }
            }
        },
        disLikes(e){
            const postId=e.currentTarget.id
            const getEl=document.querySelectorAll('.like')
            const config = {
             headers: { Authorization: `Bearer ${this.token}` }
            };
            const url=`http://localhost:3000/api/posts/like/${this.userId}`
            let el=''
            let post=''
            const data={}
            for(el of getEl){
                if(el.id==postId){
                    for(post of this.posts){
                        if(post.postId==postId && post.usersDisliked==this.userId){
                            data.like=0
                            data.usersDisliked=this.userId
                            data.avisPostId=postId
                            axios.post(url,data,config)
                            .then(res => {
                                alert(res.data.Message)
                                this.$router.go()
                            })
                        }
                        if(post.postId==postId && post.usersDisliked!=this.userId){
                            data.like=-1
                            data.usersDisliked=this.userId
                            data.avisPostId=postId
                            data.avisUserId=this.userId
                            axios.post(url,data,config)
                            .then(res => {
                                alert(res.data.Message)
                                this.$router.go()
                            })  
                        }

                    }
                }
            }
        },

    }
}
</script>


<style scoped>
.hidden{
    display:none
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

.publication-header{
    display: flex;
    justify-content: space-between
}

.delete-publication-btn{
    height: 35px;
    padding: 5px;
    align-self: center;
    margin-right: 5px;
}

.publication-image{
    height: 450px;
}

.publication-image img{
    width: 100%;
    height: 100%;
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

.avis{
    border: 1px solid rgb(192, 13, 7);
    cursor: pointer;
}

.avis:hover{
   background-color:1px solid rgb(192, 13, 7);
   border: 1px solid rgb(211, 179, 179);
}

.avis .red{
    color:red
}

.comment{
    word-wrap: break-word;
    
}

textarea{
    overflow:initial;
    word-wrap: break-word;
    width:100%;
    height:150px
}

.comment-title{
   font-size:1.2em
}



.add-comment-input{
   width:80% ;
   display: flex;
   align-items: center;
}

.add-comment-input input{
    width:100%;
    height:35px;
    border-radius: 10px;
    border:0px solid white;
    background-color: rgba(173, 191, 206, 0.507);
}

.postShared{
   border: 1px solid rgb(192, 13, 7);
   border-radius: 5px;
}

</style>