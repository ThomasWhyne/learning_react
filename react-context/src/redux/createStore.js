export const createStore = (state = {
    head: "I am the head from context",
    body: "I am the body from context",
    headBtn: "change head",
    bodyBtn: "change body"
}, storeChange)=>{
    let store=state || {};
    const listeners=[];
    const subscribe = (listene)=>{
        listeners.push(listene)
    };
    const dispatch=(action)=>{
        const newStore=storeChange(store, action);
        store=newStore;
        listeners.forEach(item=>item());
    }
    const getStore = () => {
        return store
    }
    return{
        store,
        dispatch,
        subscribe,
        getStore
    };
}  