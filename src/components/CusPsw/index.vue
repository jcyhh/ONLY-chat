<template>
    <div class="flex1 flex ac">
        <input v-show="show" :type="type" :value="value" :maxlength="type=='number'?6:20" :placeholder="tip" class="size28 flex1" @input="onInput">
        <input v-show="!show" type="password" :value="value" :placeholder="tip" class="size28 flex1" @input="onInput">
        <div class="ml30" @click="show = !show">
            <img src="@/assets/text.png" class="img44 animate__animated animate__zoomIn fastAni" v-if="show">
            <img src="@/assets/psw.png" class="img44" v-else>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        value: {
            type: String,
            required: true
        },
        tip:{
            type: String,
            required: true
        },
        type:{
            type: String,
            default: 'text'
        }
    },
    data() {
        return {
            show: false
        }
    },
    methods:{
        onInput(event){
            this.$emit('input', event.target.value)
        }
    }
}
</script>

<style>

</style>