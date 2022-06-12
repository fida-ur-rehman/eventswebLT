export const showReport = (obj)=>{
    return {
        type:"SHOW_REPORT",
        payload:obj
    }
}


export const hideReport = ()=>{
    return {
        type:"HIDE_REPORT",
        payload:false
    }
}