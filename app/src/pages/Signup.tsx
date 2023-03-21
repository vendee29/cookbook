import * as React from "react";
import { useSignup } from "../hooks/useSignup";
import { CustomizedSnackbar } from "../components/Snackbar";

export const Signup = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    await signup(email, password);
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign up</h3>

      <label>Email:</label>
      <input
        type="email"
        onChange={(ev) => setEmail(ev.target.value)}
        value={email}
      />

      <label>Password:</label>
      <input
        type="password"
        onChange={(ev) => setPassword(ev.target.value)}
        value={password}
      />
      <button disabled={isLoading}>Sign up</button>
      {error && <CustomizedSnackbar severity="error" message={error} />}
    </form>
  );
};
