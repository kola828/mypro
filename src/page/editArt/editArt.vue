<template>

  <div>
    <!--<header id='nav-top'>-->
    <!--&lt;!&ndash;<router-link to="home">&ndash;&gt;-->
    <!--<div class="head-left" onclick="window.history.go(-1)">-->
    <!--<i class="iconfont">&#xe615;</i>-->
    <!--<span>返回</span>-->
    <!--</div>-->
    <!--&lt;!&ndash;</router-link>&ndash;&gt;-->
    <!--</header>-->
    <head-nav></head-nav>
    <div class="container">
      <p>选择版块：</p>
      <flexbox :gutter="15">
        <flexbox-item>
          <div :class="['flex-demo',tab=='share' ? 'active':'']" @click="chooseTabs('share')">分享</div>
        </flexbox-item>
        <flexbox-item>
          <div :class="['flex-demo',tab=='ask' ? 'active':'']" @click="chooseTabs('ask')">问答</div>
        </flexbox-item>
        <flexbox-item>
          <div :class="['flex-demo',tab=='weex' ? 'active':'']" @click="chooseTabs('weex')">weex</div>
        </flexbox-item>
        <flexbox-item>
          <div :class="['flex-demo',tab=='job' ? 'active':'']" @click="chooseTabs('job')">招聘</div>
        </flexbox-item>
      </flexbox>
      <group>
        <x-input placeholder="标题" :max="20" v-model="title"></x-input>
        <x-textarea :max="600" name="description" v-model="content" :height="400" placeholder="正文..."></x-textarea>
      </group>
      <div class="submit" @click="submit">发 布</div>
    </div>
  </div>

</template>

<script>
  import {XTextarea, Group, XInput, Flexbox, FlexboxItem, Alert} from 'vux'
  import {mapState, mapActions, mapMutations} from 'vuex'
  import {getStore} from '../../config/mUtils'
  import headNav from "../../components/header/headNav.vue";

  export default {
    data() {
      return {
        tab: '',
        title: '',
        content: '',
        token: getStore('token')
      }
    },
    mounted() {
      let self = this;
      if (getStore('token') === '' || getStore('token') === undefined || getStore('token') === null) {
        this.$vux.alert.show({
          title: '提示',
          content: '您还没有登录，请先登录',
          onHide() {
            self.$router.push({path: '/login'})
          }
        })
      }
    },
    methods: {
      ...mapActions([
        'addNewArt',
      ]),
      ...mapMutations([
        'ADD_ART_PARAM'
      ]),
      submit() {
        let self = this;
        if (self.tab === '') {
          self.$vux.alert.show({
            title: '提示',
            content: '请选择板块',
          })
        } else if (self.title === '') {
          self.$vux.alert.show({
            title: '提示',
            content: '标题不能为空',
          })
        } else if (self.content === '') {
          self.$vux.alert.show({
            title: '提示',
            content: '内容不能为空',
          })
        } else {
          let params = {
            accesstoken: self.token,
            title: self.title,
            tab: self.tab,
            content: self.content
          };

          self.ADD_ART_PARAM({
            params: params
          });

          self.addNewArt()
              .then((response) => {
                self.$router.push({path: '/home'})
              })
              .catch((error) => {
                console.log(error)
              })

        }
      },
      /**
       * methods chooseTabs
       * describe 选择版块
       * @param tab
       */
      chooseTabs(tab) {
        let self = this;
        self.tab = tab;
      }
    },
    components: {
      XTextarea,
      Group,
      XInput,
      Flexbox,
      FlexboxItem,
      Alert,
      headNav
    },

  }
</script>
<style lang="scss">

  @import '../../style/editArt';

</style>