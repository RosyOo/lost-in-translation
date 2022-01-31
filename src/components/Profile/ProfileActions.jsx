import { Link } from "react-router-dom"
import { clearStorage, setStorage } from "../../utils/storage"
import { useUser } from "../../state/UserContext"
import { STORAGE_KEY_USER } from "../../utils/storageKeys"
import { clearTranslationHistory } from "../../api/translation"

const ProfileActions = () => {

    const { user, setUser } = useUser()

    const handleLogoutClick = () => {
        if(window.confirm('Are you sure you want to log out?')){
            clearStorage(STORAGE_KEY_USER)
            setUser(null)
        }
    }
    const handleClearTranslationHistory = async () => {
        if(!window.confirm('Are you sure you want to clear out the translation history? foh real?')){
            return
        }
        const [ clearError ] = await clearTranslationHistory(user.id)
        
        if(clearError !== null){
            return

        }
        const updateUser = {
            ...user, 
            translations: []
        }
        setStorage(updateUser)
        setUser(updateUser)
    }

    return (
        <ul className="list">
            <li><Link to="/translation"> Translation </Link></li>
            <li><button onClick={ handleClearTranslationHistory}> Clear translations </button></li>
            <li><button onClick={ handleLogoutClick}> Logout</button></li>
        </ul>
    )
}
export default ProfileActions