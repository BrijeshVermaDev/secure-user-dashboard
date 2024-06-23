import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setCredentials } from "../redux/slice/authSlice";
import { useCreateUserMutation, useSignUpMutation } from "../redux/api/authApi";
import Button from "../components/UI/Button";
import Input from "../components/UI/Input";

const SignUp: React.FC = () => {
  const staticMail = "eve.holt@reqres.in";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    password: "",
  });
  const [signUp] = useSignUpMutation();
  const [createUser] = useCreateUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors: any = {};
    if (!firstName) {
      newErrors.firstName = "First name is required";
    } else {
      newErrors.firstName = "";
    }
    if (!lastName) {
      newErrors.lastName = "Last name is required";
    } else {
      newErrors.lastName = "";
    }
    if (!mobile) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[0-9]{10}$/.test(mobile)) {
      newErrors.mobile = "Mobile number must be 10 digits";
    } else {
      newErrors.mobile = "";
    }
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Enter a valid email";
    } else {
      newErrors.email = "";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password should be of minimum 6 characters length";
    } else {
      newErrors.password = "";
    }

    return newErrors;
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (
      validationErrors.firstName ||
      validationErrors.lastName ||
      validationErrors.mobile ||
      validationErrors.email ||
      validationErrors.password
    ) {
      return;
    }

    try {
      const User = await createUser({
        email,
        first_name: firstName,
        last_name: lastName,
        mobile,
      });
      if (User?.data?.id) {
        const token = await signUp({
          email: staticMail,
          password,
        });
        if (token.data?.id) {
          dispatch(setCredentials(token?.data?.token));
          navigate("/dashboard");
        }
      }
    } catch (err) {
      console.error("Failed to sign up:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign up for a new account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSignUp}>
          <Input
            id="firstName"
            name="firstName"
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          {errors.firstName && (
            <div className="text-red-500 text-sm">{errors.firstName}</div>
          )}
          <Input
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          {errors.lastName && (
            <div className="text-red-500 text-sm">{errors.lastName}</div>
          )}
          <Input
            id="mobile"
            name="mobile"
            type="tel"
            placeholder="Mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />
          {errors.mobile && (
            <div className="text-red-500 text-sm">{errors.mobile}</div>
          )}
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && (
            <div className="text-red-500 text-sm">{errors.email}</div>
          )}
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password && (
            <div className="text-red-500 text-sm">{errors.password}</div>
          )}
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>
        <p className="mt-10 text-center text-sm text-gray-500">
          Already Have An Account?
          <Link
            to="/signin"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
             Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
