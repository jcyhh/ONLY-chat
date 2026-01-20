import en from './en.json'
import zh from './zh.json'
import ko from './ko.json'
import ja from './ja.json'
import th from './th.json'
import vi from './vi.json'
import { getLang } from '@/config/storage'
import chatEn from '@/chat/locale/en.json'
import chatZh from '@/chat/locale/zh.json'
import chatJa from '@/chat/locale/ja.json'
import chatKo from '@/chat/locale/ko.json'
import chatTh from '@/chat/locale/th.json'
import chatVi from '@/chat/locale/vi.json'

export const messages = {
    en:{...en, ...chatEn},
	zh:{...zh, ...chatZh},
    ja:{...ja, ...chatJa},
    ko:{...ko, ...chatKo},
    th:{...th, ...chatTh},
    vi:{...vi, ...chatVi}
}

/**
 * 第一个为默认语言
 * name => 前端使用的多语言名称
 * value => 后端使用的多语言名称
 */
const langs = [
    {name:'en',value:'en'},// 英语
    {name:'zh',value:'zh-Hans'},// 简体中文
    {name:'ja',value:'ja'},// 日语
    {name:'ko',value:'ko'},// 韩语
    {name:'th',value:'th'},// 泰语
    {name:'vi',value:'vi'} // 越南语
]
// 获取当前本地语言对应的后端使用的语言名称
export function getHeaderLang(){
    let lang = getLang()
    const langInfo = langs.find(item=>item.name==lang)
    if(langInfo===undefined)return langs[1].value
    else return langInfo.value
}