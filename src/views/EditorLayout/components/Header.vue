 <script setup lang="ts">

import { onUnmounted, ref } from 'vue';

// props方法 通过传递兄弟组件含参函数
interface Props {
  title?: (num: number) => void
}

const props = defineProps<Props>()


 const emit = defineEmits(['bold','underline','italic','strikethrough','subscript','superscript','blockquote'])
 // 下拉菜单，过渡
const visible = ref(false)

let timer: ReturnType<typeof setTimeout>
 
const enter = () => {
  clearTimeout(timer)
 timer = setTimeout(() => {
  visible.value = true
}, 300);
}

const leave = () => {
  clearTimeout(timer)
  timer =  setTimeout(() => {
  visible.value = false
}, 300);
}

onUnmounted(() => clearTimeout(timer))


  
const handleClick = (event:MouseEvent) => {

  const target = event.target as HTMLElement
    const li = target.closest('li')

  if (!li) return

  const level = Number(li.dataset.level)
  console.log(level)
  props.title?.(level)
}


 </script>
 
 <template>
  
   <div class="md-editor-toolbar-wrapper">
    <div class="md-editor-toolbar">
      <!-- 左侧工具栏 -->
      <div class="md-editor-toolbar-left">

    <button @click="emit('bold')" class="md-editor-toolbar-item" title="加粗" aria-label="加粗" type="button" ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bold md-editor-icon" aria-hidden="true"><path d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8"></path></svg><!----></button>
   <button @click="emit('underline')" class="md-editor-toolbar-item" title="下划线" aria-label="下划线" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-underline md-editor-icon" aria-hidden="true"><path d="M6 4v6a6 6 0 0 0 12 0V4"></path><line x1="4" x2="20" y1="20" y2="20"></line></svg><!----></button>
   <button @click="emit('italic')" class="md-editor-toolbar-item" title="斜体" aria-label="斜体" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-italic md-editor-icon" aria-hidden="true"><line x1="19" x2="10" y1="4" y2="4"></line><line x1="14" x2="5" y1="20" y2="20"></line><line x1="15" x2="9" y1="4" y2="20"></line></svg><!----></button>
   <button @click="emit('strikethrough')" class="md-editor-toolbar-item" title="删除线" aria-label="删除线" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-strikethrough md-editor-icon" aria-hidden="true"><path d="M16 4H9a3 3 0 0 0-2.83 4"></path><path d="M14 12a4 4 0 0 1 0 8H6"></path><line x1="4" x2="20" y1="12" y2="12"></line></svg><!----></button>
        <!-- 分隔线 -->
        <div class="md-editor-divider"></div>

        <!-- 下拉菜单 -->
        <div    @mouseenter="enter" @mouseleave="leave" class="md-editor-title-wrapper">
          <button   class="md-editor-toolbar-item" title="标题" aria-label="标题" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heading md-editor-icon" aria-hidden="true"><path d="M6 12h12"></path><path d="M6 20V4"></path><path d="M18 20V4"></path></svg><!----></button>
        <div  v-if="visible"   class="md-editor-dropdown md-editor-dropdown-hidden" style="inset-block-start: 28.9815px; inset-inline-start: 130.481px;"><div class="md-editor-dropdown-overlay"><ul class="md-editor-menu" role="menu" @click="handleClick"><li class="md-editor-menu-item md-editor-menu-item-title" role="menuitem" tabindex="0" data-level="1">一级标题</li><li class="md-editor-menu-item md-editor-menu-item-title" role="menuitem" tabindex="0" data-level="2">二级标题</li><li class="md-editor-menu-item md-editor-menu-item-title" role="menuitem" tabindex="0" data-level="3">三级标题</li><li class="md-editor-menu-item md-editor-menu-item-title" role="menuitem" tabindex="0" data-level="4">四级标题</li><li class="md-editor-menu-item md-editor-menu-item-title" role="menuitem" tabindex="0" data-level="5">五级标题</li><li class="md-editor-menu-item md-editor-menu-item-title" role="menuitem" tabindex="0" data-level="6">六级标题</li></ul></div></div>
        </div>
          <!-- 下拉菜单完 -->
        <button @click="emit('subscript')" class="md-editor-toolbar-item" title="下标" aria-label="下标" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-subscript md-editor-icon" aria-hidden="true"><path d="m4 5 8 8"></path><path d="m12 5-8 8"></path><path d="M20 19h-4c0-1.5.44-2 1.5-2.5S20 15.33 20 14c0-.47-.17-.93-.48-1.29a2.11 2.11 0 0 0-2.62-.44c-.42.24-.74.62-.9 1.07"></path></svg><!----></button>
        <button  @click="emit('superscript')" class="md-editor-toolbar-item" title="上标" aria-label="上标" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-superscript md-editor-icon" aria-hidden="true"><path d="m4 19 8-8"></path><path d="m12 19-8-8"></path><path d="M20 12h-4c0-1.5.442-2 1.5-2.5S20 8.334 20 7.002c0-.472-.17-.93-.484-1.29a2.105 2.105 0 0 0-2.617-.436c-.42.239-.738.614-.899 1.06"></path></svg><!----></button>
        <button @click="emit('blockquote')" class="md-editor-toolbar-item" title="引用" aria-label="引用" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-quote md-editor-icon" aria-hidden="true"><path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"></path><path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"></path></svg><!----></button>
      </div>


      <!-- 右侧工具栏 -->
      <div class="md-editor-toolbar-right">

        
      </div>
    </div>
  </div>



 </template>
 
 <style scoped lang="scss">
  .md-editor-toolbar-wrapper {
  width: 100%;
  background-color: #fff;
  border-bottom: 1px solid #e5e7eb;
}

.md-editor-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 52px;
  padding: 0 16px;
  box-sizing: border-box;
}

.md-editor-toolbar-left,
.md-editor-toolbar-right {
  display: flex;
  align-items: center;
}

.md-editor-toolbar-item {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  border-radius: 3px;
  color: #3d4856;
  cursor: pointer;
  margin: 0 2px;
  padding: 4px 6px;
  transition: all 0.3s;
  user-select: none;
  

  svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    background-color: #f0f1f2;
  }
}
.md-editor-title-wrapper {
  position: relative;
}

/* 下拉菜单 */
.md-editor-dropdown {
  position: absolute;
  top: calc(100% + 5px);
  left: -30px !important;
  z-index: 100;

  width: 80px;
  padding: 5px;
  background-color: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* 菜单 */
.md-editor-menu {
  list-style: none;
  margin: 0;
  padding: 0;
}

/* 菜单选项 */
.md-editor-menu-item {
  padding: 8px 12px;
  font-size: 12px;
  text-align: center;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: #f0f1f2;
  }
}
.md-editor-divider {
  width: 1px;
  height: 22px;
  background-color: #e5e7eb;
  margin: 0 10px;
}
 
 </style>