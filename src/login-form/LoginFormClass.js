import React from 'react'
import './index.css'
import { set, has} from 'loadsh'
import produce from 'immer';
// 这里操作完数据之后把最终的数据返回回来，替换原来的state数据
function enhanceReducer(state, updateArgs) {
  console.log('state?>>>', state, updateArgs)
  if (updateArgs.constructor === Function) {
    return { ...state, ...updateArgs[state]}
  }

  if (updateArgs.constructor === Object) {
    if (has(updateArgs, '_path' ) && has(updateArgs, '_value')) {
      const { _path, _value } = updateArgs
      return produce(state, draft => {
        set(draft, _path, _value)
      })
    } else {
      return { ...state, ...updateArgs}
    }
  }
}
// The same component written as a Class component, for comparison
const initialState = {
  firstName: '',
  lastName: '',
  address: {
    addressLine1: '',
    addressLine2: '',
    pinCode: ''
  },
  isMember: false
}
function Form() {
  const [state, updateState] = React.useReducer(enhanceReducer, initialState)

  // 函数的变化回调用一个函数来统一处理
  const updateForm = React.useCallback(({ target: { value, name, type}}) => {
    const updatePath = name.split('.')

    console.log('callBck>>>>>', value, name, type)
    // 这里返回的数据传入到enhanceReducer函数中
    if (type === 'checkbox') {
      updateState(prevState => ({
        [name]: !prevState[name]
      }))

      return
    }

    if (updatePath.length === 1) {
      const [ key ] = updatePath
      updateState({
        [key]: value
      })
    }

    if (updatePath.length === 2) {
      updateState({
        _path: updatePath,
        _value: value
      })
    }
  }, [])

  function handleClick() {
    console.log('state>>>>', state)
  }
  return(
    <div className='app'>
      <input 
        className='input'
        type='text'
        name='firstName'
        placeholder='名字'
        onChange={updateForm}
        defaultValue={state.firstName}
      />
      <br/>
       <input 
        className='input'
        type='text'
        name='lastName'
        placeholder='姓氏'
        onChange={updateForm}
        defaultValue={state.lastName}
      />
      <input 
        className='input'
        type='text'
        name='address.addressLine1'
        placeholder='地址1'
        onChange={updateForm}
        value={state.address.addressLine1}
      />
      <br/>
      <input 
        className='input'
        type='text'
        name='address.addressLine2'
        placeholder='地址2'
        onChange={updateForm}
        value={state.address.addressLine2}
      />
      <br/>
      <input 
        className='input'
        type='text'
        name='address.pinCode'
        placeholder='邮政编码'
        onChange={updateForm}
        value={state.address.pinCode}
      />
      <br/>
      <label className='container'>
        已经注册
        <input type='checkbox' name='isMember' onChange={updateForm} checked={state.isMember} />
        <span className='checkMark' />

      </label>
      <button onClick={handleClick}>测试</button>
    </div>
  )
}
export default Form