import { RequestPageData, ResponsePageData } from "@/types/api"
import { useReachBottom } from "@tarojs/taro"
import { onMounted, reactive, Ref, ref } from "vue"
import { Response } from '@/utils/request'

export default function useDataList <K>(
  fn: (options: RequestPageData) => Promise<Response<ResponsePageData<K>>>,
  options?: {
    immediate?: boolean     // 首次自动加载
  }
) {
  const data = ref<K[]>([]) as Ref<K[]>
  const pageData = reactive({
    pageNum: 10,
    page: 1,
    pageLast: 99
  })

  const getData = (reload: boolean = false) => {
    if (reload) {
      pageData.page = 1
      pageData.pageLast = 99
    }
    if (pageData.page === 1) data.value = []
    if (pageData.page > pageData.pageLast) return
    fn({
      page: pageData.page,
      pageNum: pageData.pageNum
    }).then((res) => {
      pageData.pageLast = res.data.last_page
      pageData.page++
      data.value.push(...res.data.data)
    })
  }
  
  const immediate = options?.immediate === undefined? true : options.immediate
  onMounted(() => {
    if (immediate) {
      getData(true)
    }
  })
  
  useReachBottom(() => {
    getData()
  })

  return {
    data,
    getData
  }
}
