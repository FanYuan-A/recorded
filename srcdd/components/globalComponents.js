import textListPopup from '@/components/popup/textListPopup'
function plugin(Vue) {
  if (plugin.installed) {
    return
  }
  Vue.component('glTextListPopup', textListPopup)
}
export default plugin
