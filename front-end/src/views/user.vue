<template>
    <div class="home-container">
        <header class="">
            <Nav/>
        </header>
        <section>
           <addPublication/>
        </section>

        <section>
            <publication/>
        </section>
    </div>
</template>



<script>
import Nav from '../components/nav.vue'
import addPublication from '../components/addPublication.vue'
import publication from '../components/publication.vue'
export default {
    components:{Nav,  addPublication ,publication},
    data(){
        return{
            
        }
    },
    //verifier l'utilisateur avant de d'afficher la page
    beforeCreate(){
        if(localStorage.getItem('response')){
            let local=localStorage.getItem('response')
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
}
</script>

<style  scoped>
   .home-container{
       height: 100%;
       background-color: rgb(243, 204, 204);
       padding-bottom: 50px;
   }
</style>