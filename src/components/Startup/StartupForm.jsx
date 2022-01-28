import { useForm } from "react-hook-form";
import { loginUser } from "../../api/user"

const usernameConfig = {
  required: true,
  minLength: 3,
};

const StartupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ username }) => {
    const [ error, user ] = await loginUser(username)
    console.log("Error: ", error);
    console.log("User: ",user)
  };
  console.log(errors);


const errorMessage = (() =>{
      if(!errors.username){
          return null;
      }
      if(errors.username.type === "required"){
          return <span>Username is required</span>
      }
      if(errors.username.type === "minLength"){
          return <span>Username is too short, minimum 3 characters</span>
      }
  })()

  return (
    <>
      <h2>What's your name?</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
      { errorMessage }
        <fieldset>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            placeholder="What's your name?"
            {...register("username", usernameConfig)}
          />
        </fieldset>
        <button type="submit">continue</button>
      </form>
    </>
  );
};
export default StartupForm;
