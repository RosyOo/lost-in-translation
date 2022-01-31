import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { loginUser } from "../../api/user"
import { setStorage } from "../../utils/storage";
import { useNavigate } from 'react-router-dom';
import { useUser } from "../../state/UserContext";
import { STORAGE_KEY_USER } from "../../utils/storageKeys";

const usernameConfig = {
  required: true,
  minLength: 3,
};

const LoginForm = () => {
  //Hooks  
  const {register, handleSubmit, formState: { errors }} = useForm();
  const {user, setUser} = useUser()
  const navigate = useNavigate()

  //Local states
  const [ loading, setLoading ] = useState(false)
  const [ apiError, setApiError] = useState(null)
  
  
  //Side effects
  useEffect(() => {
    if(user !== null){
      navigate('/translation')
    }
    console.log("User has changed", user)
  }, [user, navigate])
  
  
  //Event handlers
  const onSubmit = async ({ username }) => {
    setLoading(true);
    const [ error, userResponse ] = await loginUser(username);
    if(error !== null){
        setApiError(error)
    }
    if(userResponse !== null){
        setStorage(STORAGE_KEY_USER, userResponse)
        setUser(userResponse)
    }
    setLoading(false);
  };
  console.log(errors);

  //Render functions
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
      <form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
      { errorMessage }
        <fieldset>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            placeholder="What's your name?"
            {...register("username", usernameConfig)}
          />
        </fieldset>
        <button type="submit" disabled={loading}>continue</button>
        { loading && <p>Logging in...</p>}
        { apiError && <p>{apiError}</p>}
      </form>
    </>
  );
};
export default LoginForm;
