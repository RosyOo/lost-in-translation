import { useForm } from "react-hook-form"

const TranslationForm = ({onTranslation}) => {
    const { register, handleSubmit} = useForm()
    const onSubmit = ({ translationNotes}) => {onTranslation(translationNotes)}

 return (
     <form className="translationForm" onSubmit={handleSubmit(onSubmit)}>
         <section>
            <label htmlFor="translation-notes"> Type in text you want to translate</label>
            <input type="text" {...register('translationNotes')} />
         </section>
         <button type="submit">Translate</button>
     </form>
 )

}
export default TranslationForm 