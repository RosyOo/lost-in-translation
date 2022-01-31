import { useEffect } from "react"
import { userById } from "../api/user"
import ProfileActions from "../components/Profile/ProfileActions"
import ProfileHeader from "../components/Profile/ProfileHeader"
import ProfileTranslationHistory from "../components/Profile/ProfileTranslationHistory"
import withAuth from "../hoc/withAuth"
import { useUser } from "../state/UserContext"
import { setStorage } from "../utils/storage"
import { STORAGE_KEY_USER } from "../utils/storageKeys"

const Profile = () => {

    const { user, setUser } = useUser()

    useEffect(() => {
        const findUser = async () => {
            const [ error, latestUser ] = await userById(user.id)
            if(error === null){
                setStorage(STORAGE_KEY_USER, latestUser)
                setUser(latestUser)
            }
        }
        findUser()
    }, [ setUser, user.id])

    return(
        <>
            <h1>Profile page</h1>
            <ProfileHeader username={user.username}/>
            <ProfileActions/>
            <ProfileTranslationHistory translations={user.translations}/>
        </>
    )
}
export default withAuth(Profile)