import { createContext, useContext, useState } from "react";
import { getStorage } from "../utils/storage";
import { STORAGE_KEY_USER } from "../utils/storageKeys";

//Context Object  -> expose state
const UserContext = createContext()

//custom hook
export const useUser = () => {
    return useContext(UserContext) // returns object {user, setUser}
}


//Provider -> manage state
const UserProvider = ({children}) => {
    const [user, setUser] = useState(getStorage(STORAGE_KEY_USER))

    const state = {
        user,
        setUser
    }

    return( //return component
        <UserContext.Provider value={state}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider