const addressKey = 'Address' // 存储钱包地址的KEY

const refKey = 'Ref' // 存储邀请码的KEY

const tokenKey = 'Token' // 存储TOKEN的KEY

const langKey = 'Lang' // 存储多语言的KEY

const accountsKey = 'Accounts' // 登录账户记录

const userIdKey = 'UserId'

// 存储多语言
export const setLang = data => localStorage.setItem(langKey, data)
export const getLang = () => localStorage.getItem(langKey) || process.env.VUE_APP_DEFAULT_LANG
export const delLang = () => localStorage.removeItem(langKey)

// 存储钱包地址
export const setAddress = data => localStorage.setItem(addressKey, data)
export const getAddress = () => localStorage.getItem(addressKey)
export const delAddress = () => localStorage.removeItem(addressKey)

// 存储邀请码
export const setRef = data => localStorage.setItem(refKey, data)
export const getRef = () => localStorage.getItem(refKey)
export const delRef = () => localStorage.removeItem(refKey)

// 存储Token
export const setToken = data => localStorage.setItem(tokenKey, data)
export const getToken = () => localStorage.getItem(tokenKey)
export const delToken = () => localStorage.removeItem(tokenKey)

// 存储Token
export const setUserId = data => localStorage.setItem(userIdKey, data)
export const getUserId = () => localStorage.getItem(userIdKey)
export const delUserId = () => localStorage.removeItem(userIdKey)

// 存储登录账户
export const setAccounts = data => localStorage.setItem(accountsKey, data)
export const getAccounts = () => localStorage.getItem(accountsKey)
export const delAccounts = () => localStorage.removeItem(accountsKey)

// 替换或添加账户记录信息
export function saveAccount(accountInfo){
    let accounts = JSON.parse(getAccounts() || '[]')
    accounts = accounts.map(item=>{
        return {...item,...{isLogin: false}}
    })
    const { account, password } = accountInfo
    const index = accounts.findIndex(item=>item.account==account)
    const update = {
        account,
        password,
        isLogin:true
    }
    if(index>=0){
        accounts[index] = {
            ...accounts[index],
            ...update
        }
    }else{
        accounts.push(update)
    }
    setAccounts(JSON.stringify(accounts))
}
// 更新当前账户的头像昵称
export function updateAccount(accountInfo){
    let accounts = JSON.parse(getAccounts() || '[]')
    const { avatar, nickname } = accountInfo
    const index = accounts.findIndex(item=>item.isLogin)
    let update = {
        ...accounts[index],
        ...{
            avatar,
            nickname
        }
    }
    accounts[index] = update
    setAccounts(JSON.stringify(accounts))
}
// 获取当前账户
export function getAccount(){
    const accounts = JSON.parse(getAccounts() || '[]')
    return accounts.find(item=>item.isLogin)
}
// 删除指定账户
export function delAccount(account){
    let accounts = JSON.parse(getAccounts() || '[]')
    accounts = accounts.filter(item=>item.account != account)
    setAccounts(JSON.stringify(accounts))
}
