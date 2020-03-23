import callClientList from '@/components/callClientList'
import { Toast } from 'mand-mobile'
export default {
    methods:{
        mixinCallClientListIndexBar(anchor,callback){
            if (document.querySelector('#clientList')) {
                return
            }
            Toast.loading()
            let instance = new callClientList({
                propsData:{
                    anchor:anchor,
                    callback:callback,
                },
                store:this.$store
            }).$mount()
            document.querySelector(anchor).appendChild(instance.$el)
        },    
    }
}