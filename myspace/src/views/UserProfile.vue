<template>
    <ContentBase>
        <div class="row">
            <div class="col-3">
                <!--将user信息传递给子组件的userInfo-->
                <!--触发了follow123事件会调用follow函数-->
                <!--触发了follow1234事件会调用unfollow函数-->
                <UserProfileInfo @follow123="follow" @unfollow1234="unfollow" :userInfo="user" />
                <!--父组件的send_msg事件会调用父组件send_msg函数(@某事件="某个函数"，事件与函数绑定起来了)-->
                <UserProfileWrite v-if="is_me" @send_msg="send_msg" />
            </div>
            <div class="col-9">
                <div class="alert alert-primary" role="alert">
                    <div class="all-post"> 我的帖子 </div>
                </div>
                <UserProfilePost :user="user" :posts="posts" @delete_a_post="delete_a_post" />
            </div>
        </div>
    </ContentBase>

</template>
<!--父组件的信息发送给子组件，利用prop实现-->
<!--子组件想更新父组件的内容，通过emit实现-->
<script>
import ContentBase from "@/components/ContentBase.vue";
import UserProfileInfo from "@/components/UserProfileInfo.vue";
import UserProfilePost from "@/components/UserProfilePost.vue";
import UserProfileWrite from "@/components/UserProfileWrite.vue";
import { reactive } from "vue";
import { useRoute } from "vue-router";
import $ from "jquery";
import {useStore} from "vuex";
import {computed} from "vue";

export default {
    name: "UserProfile",
    components: {
        ContentBase,
        UserProfileInfo,
        UserProfilePost,
        UserProfileWrite,
    },

    setup() {
        const route = useRoute();
        const store = useStore();
        // 提取路径中的用户id
        const userId = parseInt(route.params.userId);
        // 下面的数据从云端拉取
        const user = reactive({});
        const posts = reactive({});

        $.ajax({
            url: "https://app165.acapp.acwing.com.cn/myspace/getinfo/",
            type: "GET",
            headers: {
                "Authorization": "Bearer " + store.state.user.access,
            },
            data: {
                user_id : userId,
            },
            success(resp) {
                user.id = resp.id;
                user.username = resp.username;
                user.photo = resp.photo;
                user.followerCount = resp.followerCount;
                user.is_followed = resp.is_followed; 
            }
        });

        $.ajax({
            url: "https://app165.acapp.acwing.com.cn/myspace/post/",
            type: "GET",
            headers: {
                "Authorization": "Bearer " + store.state.user.access,
            },
            data: {
                user_id : userId,
            },
            success(resp) {
                posts.count = resp.count;
                posts.posts = resp;
            }
        });

        // 判断当前页面是不是自己
        const is_me = computed(() => userId === store.state.user.id);

        // 收到子组件的点击关注
        const follow = () => {
            if (user.is_followed) return; // 不重复关注
            user.is_followed = true;
            user.followerCount++;
        }

        // 收到子组件的取消关注

        const unfollow = () => {
            if (!user.is_followed) return; // 不重复取消关注
            user.is_followed = false;
            user.followerCount--;
        }

        // 收到子组件发来的帖子内容content
        const send_msg = (content) => {
            posts.count++;
            // 收到的帖子内容放在第一个位置
            // 进行发帖操作
            posts.posts.unshift({
                id: posts.count,
                userId: 2,
                content: content,
            })
        };


        // 删除一个帖子,根据post_id依次判断所有帖子，和post_id相同删除掉
        const delete_a_post = post_id => {
            posts.posts = posts.posts.filter(post=> post.id !== post_id);
            posts.count = posts.posts.length;
        }

        return {
            user: user,
            follow,
            unfollow,
            posts: posts,
            send_msg: send_msg,
            is_me,
            delete_a_post,
        }
    }


}
</script>

<style scoped>
.all-post {
    font-weight: bold;
    font-size: 20px;
    color: red;
}
</style>


