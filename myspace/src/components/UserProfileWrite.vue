<template>
    <div class="card edit-field">
        <div class="card-body">
            <div class="mb-3">
                <label for="edit-input" class="form-label">编辑区</label>
                <textarea v-model="content" class="form-control" id="edit-input" rows="3"></textarea>
                <!--点击button会触发子组件send_msg函数-->
                <button @click="send_msg" type="button" class="btn btn-primary btn-sm">发送</button>
            </div>
        </div>
    </div>
</template>


<script>

import { ref } from "vue";
import $ from "jquery";
import {useStore} from "vuex";

export default {
    name: "UserProfileWrite",
    setup(props, context) {
        let content = ref('');
        const store = useStore();
        const send_msg = () => {
            $.ajax({
                url: "https://app165.acapp.acwing.com.cn/myspace/post/",
                type: "POST",
                headers: {
                "Authorization": "Bearer " + store.state.user.access,
                },
                data: {
                    content: content.value,
                },
                success(resp){
                    // 帖子成功提交数据库，前端页面进行刷新
                    if (resp.result === "success"){
                        // 会触发父组件的send_msg事件(发帖)
                        context.emit("send_msg", content.value);
                        content.value = "";
                    }
                },
            });


        };

        return {
            content,
            send_msg,
        }
    }

}

</script>


<style scoped>
.edit-field {
    margin-top: 20px;
}

button {
    margin-top: 10px;
}
</style>