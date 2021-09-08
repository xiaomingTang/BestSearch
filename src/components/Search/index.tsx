import React, {
  ChangeEvent, HTMLAttributes, KeyboardEvent, useState, useCallback,
} from 'react'
import { useHistory } from 'react-router-dom'
import { Search as SearchIcon } from '@material-ui/icons'

import { joinSpace } from 'src/utils/base'

import Styles from './index.module.scss'

export type SearchBoxProps = Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'onChange'> & {
  defaultValue?: string;
  /**
   * input onchange 时触发, 可以用于处理用户输入, 如添加 trim 之类的
   * @param word 用户输入/修改的值
   * @returns 赋给 input 的值
   */
  onChange?: (word: string) => string;
  onSearch?: (word: string) => void;
}

const defaultOnChange = (word: string) => word

export default function SearchBox({
  className,
  defaultValue = '',
  onSearch,
  onChange = defaultOnChange,
  ...props
}: SearchBoxProps) {
  const history = useHistory()
  const [value, setValue] = useState(defaultValue)

  const defaultOnSearch = useCallback((word) => {
    history.push(`/search/${word}`)
  }, [history])

  const onInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(onChange(e.target.value || ''))
  }, [onChange])

  const onKeyPress = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      (onSearch ?? defaultOnSearch)(value)
    }
  }, [defaultOnSearch, onSearch, value])

  const onButtonClick = useCallback(() => {
    (onSearch ?? defaultOnSearch)(value)
  }, [defaultOnSearch, onSearch, value])

  return <div className={joinSpace(Styles.container, className)} {...props}>
    <input
      value={value}
      className={Styles.input}
      placeholder='Enter键搜索'
      onKeyPress={onKeyPress}
      onChange={onInputChange}
    />
    <button className={Styles.btn} onClick={onButtonClick}>
      <SearchIcon style={{ verticalAlign: 'bottom' }} fontSize='small' />
    </button>
  </div>
}
