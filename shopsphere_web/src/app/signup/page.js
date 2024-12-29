'use client'

import Link from "next/link"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { signUpUser, resetError } from '@/app/features/user/userSlice';
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();
  const router = useRouter();
  const { status, error } = useSelector((state) => state.user);
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      dispatch(resetError()); // Reset any previous error state

      // Dispatch the sign-in action and wait for the result
      const result  = await dispatch(
        signUpUser({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
        })
      );
      if (result.meta.requestStatus === "fulfilled") {
        // alert("Signup successful!");
        router.push("/"); // Redirect to the main page
      } else {
        // alert("Signup un-successful!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!isClient){
    return null;
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-blue-600">
          ShopSphere
        </h1>
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Create your new account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {["firstName", "lastName", "email", "password", "confirmPassword"].map((field) => (
            <div key={field}>
              <label
                htmlFor={field}
                className="block text-sm/6 font-medium text-gray-900"
              >
                {field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </label>
              <div className="mt-2">
                <input
                  id={field}
                  name={field}
                  type={field.includes("password") || field.includes("confirmPassword") ? "password" : "text"}
                  autoComplete={field.includes("password") || field.includes("confirmPassword") ? "new-password" : "on"}
                  required
                  value={formData[field]}
                  onChange={handleChange}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
          ))}
          <div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {status === "loading" ? "Signing up..." : "Sign up"}
            </button>
          </div>
        </form>

        {status === "failed" && error && error !== "Auth session missing!" && (
          <p className="mt-4 text-center text-sm text-red-500">{error}</p>
        )}

        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/signin" className="font-semibold text-indigo-600 hover:text-indigo-500">
            Sign into your account
          </Link>
        </p>
      </div>
    </div>
  );
}
