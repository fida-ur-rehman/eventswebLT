const initialStateSocket=false

const reportReducer = (state=initialStateSocket,action)=>{
    switch(action.type){
        case 'SHOW_REPORT':
            return action.payload
        case 'HIDE_REPORT':
            return false
        default:
            return state;
    }
}

export default reportReducer;