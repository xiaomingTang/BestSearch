import axios from 'axios'
import { Types } from '.'

export async function search(params: Types.SearchQuery): Promise<Types.SearchRes> {
  const data = await axios.post('http://3.141.23.218:5000/interview/keyword_search', {
    login_token: 'INTERVIEW_SIMPLY2021',
    ...params,
  }).then((res) => {
    if (res?.data?.status === 'OK') {
      return res.data.data
    }
    throw new Error(res.data?.msg ?? '请求失败')
  }).catch((err) => {
    // 500 错误或断网会到这
    throw new Error('服务器繁忙, 请稍后再试')
  })
  return data
}
