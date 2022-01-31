import withAuth from "../hoc/withAuth"
import { useUser } from "../state/UserContext"
import { useState } from "react"
import { addTranslation } from "../api/translation"
import { setStorage } from "../utils/storage"
import { STORAGE_KEY_USER } from "../utils/storageKeys"
import TranslationForm from "../components/Translation/TranslationForm"

const Translation = () => {
    const { user, setUser } = useUser()
    const [ translated, setTranslated ] = useState([])

    const handleSubmit = async ( notes ) => {
        const translation = notes.trim()
        const [error, userUpdate] = await addTranslation(user, translation)

        if( error !== null ){
            return;
        }
        //Keep UI state and Server state in sync
        setStorage(STORAGE_KEY_USER, userUpdate)
        //Update context state
        setUser(userUpdate)

        const sentence = translation.split("").map((char, index) => {
            if(char === " "){ 
                return ""
            } else{
                return <img src={"assets/signs/" + char.toLowerCase() + ".png"} alt={char.toLowerCase()} key={index + '-' + char.toLowerCase()} width="60" />
            }
            })
            setTranslated(sentence)
    }

    return(
        <>
            <h1>Translation page</h1>
            <div className="translationPageBox">
                <section>
                    <TranslationForm onTranslation={handleSubmit}></TranslationForm>
                </section>
                <ul className="list">
                    {translated}
                </ul>
            </div>
        </>
    )
}
export default withAuth(Translation)