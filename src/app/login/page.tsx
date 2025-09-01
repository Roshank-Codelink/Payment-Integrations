"use client";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import Custominput from "../components/Custominput";
import Link from "next/link";
import { Signin } from "../Utils/User";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Cookies from "js-cookie";


function Login() {
  const [loading, setLoading] = useState(false);
  const Router = useRouter();
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Please enter a valid email address.")
      .required("Email is required."),

    password: Yup.string()
      .min(6, "Password must be at least 6 characters.")
      .required("Password is required."),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    setLoading(true);
    try {
      console.log("Signin attempt with:", values);
      const res = await Signin(values);
      console.log("Signin response:", res);
      
      if (res?.data?.success) {
        // Save user data to cookies
        const userData = res.data.data;
        Cookies.set('userData', JSON.stringify(userData), { expires: 7 }); // 7 days
        Cookies.set('isLoggedIn', 'true', { expires: 7 });
        
        toast.success("Login successful!");
        Router.push("/products");
      } else {
        // Show error from API response
        toast.error(res?.data?.message || "Signin failed. Please try again.");
      }
    } catch (error: any) {
      console.error("Signin error:", error);
      // Show error from Utils function
      if (error?.data?.message) {
        toast.error(error.data.message);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } 

  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg">
            <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
          </div>
          <h1 className="mt-6 text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="mt-3 text-gray-600 font-medium">
            Sign in to your account
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white/80 backdrop-blur-sm py-10 px-8 shadow-2xl rounded-3xl border border-white/50">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="space-y-5">
              <Custominput 
                label="Email Address" 
                name="email" 
                type="email" 
                placeholder="john@example.com"
              />
              
              <Custominput 
                label="Password" 
                name="password" 
                type="password" 
                placeholder="Enter your password"
              />

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full flex justify-center py-4 px-6 border border-transparent text-base font-semibold rounded-2xl text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 active:scale-95"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing In...
                    </>
                  ) : (
                    <>
                      <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      Sign In
                      <svg className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </Form>
          </Formik>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link 
                href="/signup" 
                className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
              >
                Create one here
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            Secure login with end-to-end encryption
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;