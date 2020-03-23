import callImgUploader from '@/components/imgUploader'
export default {
    methods:{
        mixinCallImgUploader(anchor,callback,roleType){
            if (document.querySelector('#recognizeId')) {
                return
            }
            let instance = new callImgUploader({
                propsData:{
                    anchor:anchor,
                    callback:callback,
                    roleType:roleType
                },
                store:this.$store
            }).$mount()
            document.querySelector(anchor).appendChild(instance.$el)
        }
    }
}