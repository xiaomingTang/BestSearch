import {
  useCallback, useEffect, useMemo, useState,
} from 'react'

interface UseApiOptions<Args extends unknown[], T, S = T> {
  /**
   * 是否调用 api
   */
  enable?: boolean;
  /**
   * 对 api().then 的结果执行管道
   *
   * ！！！不在依赖中, 不会响应变化
   */
  pipe?: (res: T) => S;
  /**
   * api 的参数
   */
  args?: Args;
}

interface UseApiReturnType<T> {
  loading: boolean;
  /**
   * api 报错消息
   */
  error: string;
  data: T | undefined;
  /**
   * 强制重新执行 api
   */
  update: () => Promise<T>;
}

function decodeOptions<Args extends unknown[], T>(options?: UseApiOptions<Args, T, T>): Required<UseApiOptions<Args, T, T>>
function decodeOptions<Args extends unknown[], T, S>(options?: UseApiOptions<Args, T, S>): Required<UseApiOptions<Args, T, S>>
function decodeOptions<Args extends unknown[], T, S = T>(options?: UseApiOptions<Args, T, S>) {
  const {
    enable = true,
    args = [],
    pipe = (res: T) => res,
  } = options || {}

  return {
    enable,
    pipe,
    args,
  }
}

export function useApi<Args extends unknown[], T>(factory: (...args: Args) => Promise<T>, options?: UseApiOptions<Args, T>): UseApiReturnType<T>
export function useApi<Args extends unknown[], T, S>(factory: (...args: Args) => Promise<T>, options?: UseApiOptions<Args, T, S>): UseApiReturnType<S>
export function useApi<Args extends unknown[], T, S = T>(factory: (...args: Args) => Promise<T>, options?: UseApiOptions<Args, T, S>): UseApiReturnType<S> {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [data, setData] = useState<S | undefined>()

  const {
    enable, pipe, args,
  } = useMemo(() => decodeOptions(options), [options])

  const update = useCallback(() => {
    if (enable && factory) {
      setError('')
      setLoading(true)
      return factory(...args)
        .then((res) => {
          const piped = pipe(res)
          setData(piped)
          return piped
        })
        .finally(() => {
          setLoading(false)
        })
        .catch((err) => {
          const message = (err as Error)?.message || '请稍后再试'
          setError(message)
          throw new Error(message)
        })
    }
    return Promise.reject(new Error('disabled'))
    // args 以 ...args 的形式处于 dependencyList 中, 因为我们使用时就是 ...args
    // pipe & afterUpdate 不在 DependencyList 中
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enable, factory, ...args])

  useEffect(() => {
    update().catch((err) => {
      // pass
    })
  }, [update])

  return {
    loading,
    error,
    data,
    update,
  }
}
