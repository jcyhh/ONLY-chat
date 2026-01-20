<template>
    <div>
        <van-popup v-model="show" position="bottom" style="background-color: transparent !important;">
            <div class="cuspicker" v-if="list.length>0">
                <div class="flex jb ac pl40 pr40 mb60">
                    <div class="size32 bold">{{ title }}</div>
                    <van-icon size="20" name="cross" @click="close()" />
                </div>
                <van-picker :visible-item-count="4" :value-key="valueKey" :default-index="0" :columns="list" @change="onChange"></van-picker>
                <div class="pl30 pr30 mt60">
                    <div class="mainBtn size28" v-scale @click="delayFun(submit)">确定</div>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    props:{
        list:{
            type:Array,
            default(){
                return []
            }
        },
        valueKey:{
            type:String,
            default:'name'
        },
        title:{
            type:String,
            default:''
        }
    },
    watch:{
        list(value){
            if(value){
                this.submit()
            }
        }
    },
    data() {
        return {
            show: false,
            current: 0
        }
    },
    computed: {
        ...mapState('app', ['theme'])
    },
    methods: {
        open() {
            if(this.list.length==0)return
            this.show = true
        },
        close() {
            this.show = false
        },
        onChange(picker, value, index){
            this.current = index
        },
        submit(){
            this.$emit('change', this.list[this.current])
            this.show = false
        }
    }
}
</script>

<style lang="scss" scoped>
.cuspicker{
    border-radius: 40px 40px 0 0;
    padding: 40px 0;
    overflow: hidden;
    background-color: #FFFFFF;
    color: #333333;
}
</style>