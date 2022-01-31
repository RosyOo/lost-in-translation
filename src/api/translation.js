import { createHeaders } from "./index"

const apiURL = process.env.REACT_APP_API_URL


 // Add translation to user 
export const addTranslation = async (user, translation) => {
    try{
        const response = await fetch(`${apiURL}/${user.id}`, {
            method: 'PATCH',
            headers: createHeaders(),
            body: JSON.stringify({
                translations: [...user.translations, translation]
            })
        })

        if (!response.ok){
            throw new Error("Could not update the translation")
        }

        const result = await response.json()
        return [ null, result ]
    } catch (error){
        return [ error.message, null ]
    }
}


// Clear the user's translation list
export const clearTranslationHistory = async (userId) => {
    try {
        const response = await fetch(`${apiURL}/${userId}`, {
            method: 'PATCH', 
            headers: createHeaders(),
            body: JSON.stringify({
                translations: []
            })
        })
        if (!response.ok){
            throw new Error("Could not update translations")
        }

        const result = await response.json()
        return [ null, result ]

    } catch (error) {
        return [ error.message, null ]
    }
}
