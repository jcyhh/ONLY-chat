<template>
    <div>
        <div class="flex col headbar" :class="show?'menuShow':'menuHide'" :style="{
            background: show ? 'rgba(0,12,34,0.8)' : 'rgba(0, 12, 34, 0.1)'
        }">
            <div class="bar flex jb ac">
                <img src="@/assets/logo.png" class="logo" @click="goHome">
                <div class="flex ac">
                    <div class="tag" v-if="address" @click="delayFun(connect)" v-scale>{{ address | hideAddress}}</div>
                    <div class="tag" v-else @click="delayFun(connect)" v-scale>{{$t('链接钱包')}}</div>
                    <img src="@/assets/menu.png" class="img60 ml20" v-show="!show" @click="menuSwitch(true)">
                    <img src="@/assets/menuClose.png" class="img60 ml20" v-show="show" @click="menuSwitch(false)">
                </div>
            </div>

            <div class="menu flex1" v-if="show">
                <div class="gap60"></div>
                <div class="item" v-for="(item,index) in menu" :key="index" @click="menuClick(index)">
                    <div class="flex jb ac">
                        <div class="size28 bold mainColor">{{ item.name }}</div>
                        <van-icon :name="item.children?'arrow-down':'arrow'" />
                    </div>
                    <div class="pt20" v-if="item.show">
                        <div class="sub" :class="child.lang==lang?'mainColor':''" v-for="child in item.children" :key="child.name" @click="subMenuClick(child)">{{ child.name }}</div>
                    </div>
                </div>

                <div class="size28 bold mt60">{{$t('分享好友')}}</div>

                <div class="flex size26 mt40">
                    <div class="share line1">{{ shareUrl }}</div>
                    <div class="btn ml10 flex0 mainColor" v-copy="shareUrl">{{$t('复制链接')}}</div>
                </div>
                <div class="gap60"></div>
            </div>

        </div>
        
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { setLang } from '@/config/storage'
import { publicPath } from '@/config/index'
export default {
    name:'HeadBar',
    data(){
        return {
            opacity: 0,

            // 侧边栏是否展开
            show: false,
            // 当前路由
            activeRoute:'',

            menu:[],
        }
    },
    computed: {
        ...mapState('dapp', ['address','userInfo']),
        ...mapState('app', ['lang']),
        shareUrl(){
            return `${location.origin}${publicPath}?ref=${this.userInfo.referral_code}`
        }
    },
    mounted(){
        window.addEventListener('scroll', this.handleScroll);

        this.menu = [
            {
                name: this.$t('首页'),
                path:'/home/index'
            },
            {
                name: this.$t('闪兑'),
                path: '/home/exchange'
            },
            {
                name: this.$t('我的铸造'),
                path: '/home/myCast'
            },
            {
                name: this.$t('我的资产'),
                path: '/home/asset'
            },
            {
                name: this.$t('我的团队'),
                path: '/home/team'
            },
            {
                name: this.$t('销毁挖矿'),
                path: ''
            },
            {
                name: this.$t('终极大奖池'),
                path: '/home/pool'
            },
            {
                name: this.$t('节点'),
                path: ''
            },
            {
                name: this.$t('语言'),
                show: false, // 是否展开二级菜单
                children: [
                    { name: 'English', lang: 'en' },// 英语
                    { name: '简体中文', lang: 'zh' },// 简体中文
                ]
            },
        ]
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods:{
        handleScroll() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const opacity = Math.min(scrollTop / 150, 1); // 根据滚动距离计算透明度
            if (this.opacity != opacity) {
                this.opacity = opacity > 0.8 ? 0.8 : opacity;
            }
        },
        menuSwitch(type) {
            this.show = type
            if (type) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        },
        menuClick(index){
            const data = this.menu[index]
            if(data.children){
                this.$set(this.menu[index], 'show', !data.show)
            }else{
                if(data.path){
                    this.jump(data.path)
                    setTimeout(() => {
                        this.menuSwitch(false)
                    }, 100);
                }else{
                    this.toast(this.$t('暂未开放'))
                }
            }
        },
        subMenuClick(data){
            const lang = data.lang
            if(lang == this.lang)return
            this.$i18n.locale = lang;
            setLang(lang)
            this.$store.commit('app/SET_LANG', lang)
            // 刷新页面来重新请求接口
            location.reload()
        },
        goHome(){
            this.jump('/home/index')
            setTimeout(() => {
                this.menuSwitch(false)
            }, 100);
        },
        connect(){
            this.$store.dispatch('dapp/logout')
        }
    }
}
</script>

<style lang="scss" scoped>
.menuHide{
    height: 100px;
}
.menuShow{
    height: 100vh;
}
.headbar{
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2000;
    padding: 0 30px;
    background: rgba(0, 12, 34, 0.1);
    backdrop-filter: blur(20px);
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
    transition: all 0.3s;

    .bar{
        height: 100px;
        .logo{
            width: 170px;
            height: 50px;
        }
        .tag{
            @include mainTag(60);
        }
    }

    .menu{
        flex: 1;
        overflow-y: scroll;
        &::-webkit-scrollbar{
            display: none;
        }
        .item{
            padding: 40px 0;
            border-bottom: 1PX solid #FFFFFF;
            .sub{
                padding: 20px 40px;
                font-size: 20px;
                font-weight: bold;
            }
        }
        .share{
            height: 88px;
            line-height: 88px;
            border: 2px solid #FFFFFF;
            border-radius: 20px;
            padding: 0 30px;
            text-align: center;
        }
        .btn{
            height: 88px;
            line-height: 88px;
            border: 2px solid $main-color;
            border-radius: 20px;
            padding: 0 30px;
            min-width: 200px;
            text-align: center;
        }
    }
}
</style>