import { useUnload } from "@tarojs/taro"


// 轮询任务 返回一个布尔值用于继续轮询
type PollingTask = () => Promise<boolean>

interface Options {
  delay?: number         // 轮询时间
  error?: ()=>void      // 错误处理
}

/**
 * 创建轮询任务
 * @param callback
 * @param options
 */
const usePollingTask = (
  callback: PollingTask, 
  options?: Options 
) => {
  const delayTime = options?.delay || 800
  let mistask = 0
  let timer: NodeJS.Timeout | null = null

  const setTask = () => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      callback().then(res => {
        if (res) {
          setTask()
        } else {
          clearTask()
        }
      }).catch(() => {
        mistask++
        if (mistask <= 3) {
          // 失败重试
          setTask()
        } else {
          // 错误处理
          if (options?.error) options.error()
          clearTask()
        }
      })
    }, delayTime)
  }
  setTask()

  const clearTask = () => {
    if (!timer) return
    clearTimeout(timer)
    timer = null
  }

  useUnload(() => {
    clearTask()
  })

  return {
    clearTask
  }
}

export default usePollingTask
