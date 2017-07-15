import { Indicator } from 'mint-ui'
import router from '@/router'
import { Toast } from 'mint-ui';
import { Popup } from 'mint-ui';
export default {
    openIndicator () {
        Indicator.open({
            text: '加载中...',
            spinnerType: 'snake'
        })
    },
    comBack () {
    // window.history.go() : 接受一个数值作为参数在历史栈中导航
    // 后退一步记录，等同于 history.back()
		// router.go(-1)
        router.push({ path: 'show' })
	},
    toast () {
		Toast('该功能还未实现')
    },
    popup(){

    },
    closeIndicator () {
        Indicator.close()
    },
    pop () {
        let instance = Toast('未找到相应信息(´･_･`)')
        setTimeout(() => {
             instance.close();
        }, 2000);
    },
    cmtPop () {
        let instance = Toast('您还没有评论(´･_･`)')
        setTimeout(() => {
             instance.close();
        }, 2000);
    }
}