<script setup lang="ts">
import { ref } from 'vue'
import { onUnmounted } from 'vue'
import JSON5 from 'json5'

import { usedocumentStore } from '@/stores/document'
// 解析数学公式
import katex from 'katex'
import 'katex/dist/katex.min.css'
// 解析表格
import mermaid from 'mermaid'
import { watch, nextTick } from 'vue'

// 解析图表
import * as echarts from 'echarts'
// 获取dom元素
const previewRef = ref<HTMLElement | null>(null)




// 引入markdown解析插件 解析为html
import { marked } from 'marked'
import { computed } from 'vue';
import  markedKatex  from 'marked-katex-extension'

marked.use(markedKatex({
  nonStandard: true,
  throwOnError: false
}))

const renderer = new marked.Renderer()
// 判断是否为mermaid,改变html生成.   判断是否为echarts
renderer.code = ({ text, lang }) => {
  if (lang === 'mermaid') {
    return `<div class="mermaid">${text}</div>`
  }

  if (lang === 'echarts') {
    return `<div
      class="echarts"
      style="width: 100%; height: 300px;"
      data-option="${encodeURIComponent(text)}"
    ></div>`
  }

  return `<pre><code>${text}</code></pre>`
}

// 解决上标下标的解析问题
marked.use({
  extensions: [
    {
      name: 'subscript',
      level: 'inline',

      start(src) {
        return src.indexOf('~')
      },

      tokenizer(src) {
        const match = /^~(?!~)([^~\n]+)~(?!~)/.exec(src)

        if (match) {
          return {
            type: 'subscript',
            raw: match[0],
            text: match[1] ?? ''
          }
        }
      },

      renderer(token) {
        return `<sub>${token.text ?? ''}</sub>`
      }
    },
    {
      name: 'superscript',
      level: 'inline',

      start(src) {
        return src.indexOf('^')
      },

      tokenizer(src) {
        const match = /^\^([^^\n]+)\^/.exec(src)

        if (match) {
          return {
            type: 'superscript',
            raw: match[0],
            text: match[1] ?? ''
          }
        }
      },

      renderer(token) {
        return `<sup>${token.text ?? ''}</sup>`
      }
    }
  ]
})

marked.use({ renderer })

mermaid.initialize({
  startOnLoad: false
})

const documentStore = usedocumentStore()

const preview  =  computed(() => marked.parse(documentStore.activeDocument.content,{breaks:true}))
// 监听表格，更新后就执行渲染1
watch(preview, async () => {
  
  await nextTick()

  await mermaid.run({
    querySelector: '.mermaid'
  })
}, { immediate: true })


// 销毁图表实例函数
const disposeCharts = () => {
  chartInstances.forEach(chart => {
    chart.dispose()
  })

  chartInstances.length = 0
}
// 组件卸载后销毁所有实例

// 监听图表，更新后就执行渲染
// 重复初始化时销毁旧实例，以及组件离开时销毁所有实例。
// 记录所有chart的数组
const chartInstances: echarts.ECharts[] = []
watch(preview, async () => {
    // 先销毁之前的图表实例
  disposeCharts()

  await nextTick()

  const domList = previewRef.value?.querySelectorAll('.echarts')

  if (!domList?.length) return

  domList.forEach((dom) => {
    const code = decodeURIComponent(
      dom.getAttribute('data-option') || ''
    )

    const option = JSON5.parse(code)

    const chart = echarts.init(dom as HTMLElement)

    chart.setOption(option)
    // 放入同一个数组
    chartInstances.push(chart)
  })
}, { immediate: true })


onUnmounted(() => disposeCharts())



</script>

<template>
  <div class="pane-content">
    <div class="markdown-preview" v-html="preview" ref="previewRef">
      
    </div>
  </div>
</template>

<style scoped lang="scss">
.pane-content {
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;

  .markdown-preview {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 16px 20px;
    overflow-y: auto;
    overflow-x: hidden;

    color: #333;
    font-size: 14px;
    line-height: 1.8;
    overflow-wrap: break-word;
    background: #fff;
    :deep(blockquote) {
  margin: 12px 0;
  padding: 8px 16px;
  border-left: 4px solid #409eff;
  background: #f5f6f7;
  color: #666;
}
  }
}
</style>