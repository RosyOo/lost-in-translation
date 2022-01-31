export const setStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}

export const getStorage = key => {
    const data = localStorage.getItem(key);
    if(data){
        return JSON.parse(data);
    }
    return null;
}

export const clearStorage = key => {
    localStorage.removeItem(key);
}