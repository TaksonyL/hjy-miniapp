import { Ref, ref } from "vue"
import { Response } from '@/utils/request'

const useRequest = <T, K>(callback: (options: T) => Promise<Response<K>>) => {
  const data = ref({}) as Ref<K>

  const getData = (options: T) => {
    callback(options).then(res => {
      data.value = res.data
    })
  }

  return {
    data,
    getData
  }
}

export default useRequest
