<template>
  <div>
    <van-field :label="label" :type="type" :placeholder="placeholder" :rule="rule" 
    v-model="content"
    
    />
  </div>
</template>

<script>
export default {
    data(){
        return {
            content:''
        }
    },
  props: ["label",'type','placeholder','rule'],
  methods:{
      handelrulg(){
          const rule=new RegExp(this.rule)
          if(rule.test(this.content)){
              this.$emit('inputChange',this.content)
          }
      }
  }
  ,
  watch:{
      content(){
          this.handelrulg()
      }
  }
};
</script>

<style>
</style>