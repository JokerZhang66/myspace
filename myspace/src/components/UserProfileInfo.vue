<template>
    <div class="card">
        <div class="card-body">
            <div class="row">
                <div class="col-3 img-field">
                    <img class="img-fluid" :src="userInfo.photo" alt="">
                </div>
                <div class="col-9">
                    <div class="username">{{ userInfo.username }}</div>
                    <div class="fans">粉丝数: {{ userInfo.followerCount }}</div>
                    <button @click="follow" v-if="!userInfo.is_followed&&!is_me" type="button"
                        class="btn btn-success btn-sm">+关注</button>
                    <button @click="unfollow" v-if="userInfo.is_followed&&!is_me" type="button"
                        class="btn btn-danger btn-sm">取消关注</button>
                </div>
            </div>
        </div>
    </div>


</template>

<script>
import {useStore} from "vuex";
import {computed} from "vue";
import $ from "jquery";

export default {
    name: "UserProfileInfo",
    props: {
        userInfo: {
            type: Object,
            required: true,
        },
    },
    setup(props, context) {
        const store = useStore();
        const follow = () => {
            $.ajax({
                url: "https://app165.acapp.acwing.com.cn/myspace/follow/",
                type: "POST",
                headers: {
                    "Authorization": "Bearer " + store.state.user.access,
                },
                data: {
                    target_id: props.userInfo.id,
                },
                success(resp) { 
                    if(resp.result === "success")
                    // 在前端进行修改
                    context.emit("follow123"); // 触发父组件中的follow123事件
                }
            });
        };
        const unfollow = () => {
            $.ajax({
                url: "https://app165.acapp.acwing.com.cn/myspace/follow/",
                type: "POST",
                headers: {
                    "Authorization": "Bearer " + store.state.user.access,
                },
                data: {
                    target_id: props.userInfo.id,
                },
                success(resp) { 
                    if(resp.result === "success")
                    // 在前端进行修改
                    context.emit("unfollow1234"); // 触发父组件中的follow1234事件
                }
            });
        };
    
        // 如果是自己的页面，不展示关注和取消关注按钮
        let is_me = computed(()=> store.state.user.id === props.userInfo.id);
    
        return {
            follow,
            unfollow,
            is_me,
        }


    },

}
</script>

<style scoped>
img {
    border-radius: 50%;
}

.username {
    font-weight: bold;
}

.fans {
    color: gray;
    font-size: 12px;
}

button {
    padding: 2px 4px;
    font-size: 12px;
}

.img-field {
    display: flex;
    flex-direction: column;
    justify-content: center;

}
</style>