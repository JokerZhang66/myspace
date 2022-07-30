<template>
  <ContentBase>
    <div class="card" v-for="user in users" :key="user.id" @click="open_user_profile(user.id)">
      <div class="card-body">
        <div class="row">
          <div class="col-1 img-field">
            <!--将冒号后的字符串视为变量，而不是一个字符串-->
            <img class="img-fluid" :src="user.photo" alt="" />
          </div>
          <div class="col-11">
            <div class="username">{{ user.username }}</div>
            <div class="followcount">粉丝数: {{ user.followerCount }}</div>
          </div>
        </div>
      </div>
    </div>
  </ContentBase>
</template>

<script>
import ContentBase from "@/components/ContentBase.vue";
import $ from "jquery";
import { ref } from "vue";
import router from "@/router/index";
import { useStore } from "vuex";

export default {
  name: "UserList",
  components: {
    ContentBase,
  },

  setup() {
    const store = useStore();
    let users = ref([]);
    $.ajax({
      url: "https://app165.acapp.acwing.com.cn/myspace/userlist/",
      type: "get",
      success(resp) {
        users.value = resp;
      },
    });
    const open_user_profile = (userId) => {
      // 如果登录成功，跳转到用户动态
      if (store.state.user.is_login) {
        router.push({
          name: "userprofile",
          params: {
            userId: userId,
          },
        });
      }
      else { // 没有登录，跳转到登陆页面
        router.push({name: "login"});
      }
    };

    return {
      users,
      open_user_profile,
    };
  },
};
</script>

<style scoped>
img {
  border-radius: 50%;
}

.username {
  font-weight: bold;
  height: 40%;
}

.followcount {
  font-size: 12px;
  color: gray;
  height: 60%; /*上下46开*/
}

.card {
  margin-bottom: 20px;
  cursor: pointer; /*选中卡片变成鼠标变成小手形状*/
}

.card:hover {
  box-shadow: 2px 2px 10px lightblue;
  transition: 500ms;
}
.img-field {
    display: flex;
    flex-direction: column;
    justify-content: center;

}
</style>


