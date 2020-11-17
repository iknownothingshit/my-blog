//注册全局组件
import topNav from './top-nav'
import blog from './blog'
import cropper from './cropper'
import commentBox from './commentBox'
import sidebar from './sidebar'

const components = {
    topNav,
    blog,
    cropper,
    commentBox,
    sidebar
}

export default function registerAllComponents(instance) {
    Object.keys(components).forEach(key => {
        instance.component(key, components[key]);
    })
}