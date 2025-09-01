"use client";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import Custominput from "../components/Custominput";
import Link from "next/link";
import { Signup } from "../Utils/User";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

function Page() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Name must be at least 2 characters.")
      .max(50, "Name must be 50 characters or fewer.")
      .matches(/^[A-Za-z\s]+$/, "Name should contain only letters and spaces.")
      .required("Name is required."),
    
    email: Yup.string()
      .email("Please enter a valid email address.")
      .required("Email is required."),

    password: Yup.string()
      .min(6, "Password must be at least 6 characters.")
      .max(20, "Password must not exceed 20 characters.")
      .required("Password is required."),
  });

    const handleSubmit = async (values: typeof initialValues) => {
    setLoading(true);
    try {
      const res = await Signup(values);
      console.log(res);
      if (res?.data?.success) {
        toast.success(res?.data?.success);
        router.push("/login");
      } else {
        // Show error from API response
        toast.error(res?.message);
      }
    } catch (error: any) {
      
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="mt-6 text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Create Account
          </h1>
          <p className="mt-3 text-gray-600 font-medium">
            Join thousands of satisfied customers
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
                label="Full Name" 
                name="name" 
                type="text" 
                placeholder="John Doe"
              />
              
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
                placeholder="Enter secure password"
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
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Create Account
                      <svg className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </Form>
          </Formik>

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link 
                href="/login" 
                className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            By creating an account, you agree to our{' '}
            <a href="#" className="text-blue-600 hover:text-blue-500">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-blue-600 hover:text-blue-500">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Page;
