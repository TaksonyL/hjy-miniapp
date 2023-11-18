/**
 * 获取格式化日期
 * @param {any} timeStamp  时间戳 默认今天
 * @param {string} formt      时间格式
 * @returns 
 */
export const getDateFormt = (timeStamp:Date | number | '' = '', formt:string = 'YY-MM-DD hh:mm:ss') => {
  let date;
  if(timeStamp === 0) return '--'
  if(typeof(timeStamp) === 'string') timeStamp = Number(timeStamp)
  if(timeStamp) {
    let timeStampNumber = Number(timeStamp)
    if (timeStampNumber < 9999999999) timeStampNumber = timeStampNumber * 1000
    date = new Date(timeStampNumber);
  } else {
    date = new Date();
  }
 
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();

  // 补0
  function numFormt(num:number):string {
    if(num < 10) return '0' + num
    return num.toString()
  }

  const result = formt.replace('YY', numFormt(year)).replace('MM', numFormt(month)).replace('DD', numFormt(day))
                    .replace('hh', numFormt(hour)).replace('mm', numFormt(min)).replace('ss', numFormt(sec))

  return result;
}

/**
 * 防抖
 * @param {function} fn   触发函数
 * @param {number} delay  触发事件
 * @returns
 */
export function debounce(fn: Function, delay:number = 600):() => void {
  let timeout: number | null | NodeJS.Timeout;
  return function (...args: any[]) {
    if(timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}
