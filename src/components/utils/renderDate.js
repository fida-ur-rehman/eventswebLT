import date from 'date-and-time';
import moment from 'moment'

export const renderDate = (mydate)=>{
    const now = new Date();
    let today = date.format(now, 'DD/MM/YY');  
    let Yesterday = date.addDays(now, -1);
    Yesterday = date.format(Yesterday,'DD/MM/YY');
    let notificationDate = moment.parseZone(mydate).local().format("DD/MM/YY")
    if(notificationDate===today){
        return "Today"
    }else if (notificationDate===Yesterday){
        return "Yesterday"
    }else{
        return notificationDate
    }
}

export const renderTimeDate =(mydate)=>{
    const now = new Date();
    let today = date.format(now, 'HH:mm:ss');  
    let Yesterday = date.addDays(now, -1);
    Yesterday = date.format(Yesterday,'HH:mm:ss');
    let notificationDate = moment.parseZone(mydate).local().format("DD/MM/YY")
    if(notificationDate===today){
        return today
    }else if (notificationDate===Yesterday){
        return `Yesterday ${Yesterday}`
    }else{
        return notificationDate
    }
}


export const renderNormalDate = (mydate)=>{
    let formatedDate = moment.parseZone(mydate).local().format("HH:mm:ss DD/MM/YY")
    return formatedDate;
}