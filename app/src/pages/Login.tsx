import * as React from "react";
import { useLogin } from "../hooks/useLogin";

export const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    await login(email, password)
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log in</h3>

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
      <button disabled={isLoading}>Log in</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};
