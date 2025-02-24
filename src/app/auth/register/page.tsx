"use client"

import { InputText } from "@/components/parts/Input"
import { ErrorNotification, SuccessNotification } from "@/components/parts/Notification"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function RegisterPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const router = useRouter()
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    //React.FormEvent was missing HTMLFormElement
    event.preventDefault()

    try {
      const response = await fetch("/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
          name: name,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccessMessage("Registration successful!")
        // Reset form
        router.push('/auth/login');
      } else {
        setErrorMessage(data.message || "Registration failed. Please try again.")
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later."+ error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#4d0d0d]">
      <div className="bg-red-700 p-8 rounded-lg shadow-md w-96">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-4 text-black my-2">
          <InputText label="Name" value={name} onChange={(e) => setName(e.target.value)} id="name" required />
          <InputText
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="username"
            required
          />
          <InputText
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            required
          />
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-bold oxanium text-white bg-[#a10f0f] hover:bg-[#4d0d0d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#a10f0f] transition-colors duration-200"
        >
          Register
        </button>
        </form>
      <Link href="/auth/login" className=" text-white oxanium oxanium-semibold">Have an <span className="text-[#ffe2e2] underline  rounded-md">Account?</span></Link>

      </div>
      {successMessage && <SuccessNotification message={successMessage} onClose={() => setSuccessMessage("")} />}
      {errorMessage && <ErrorNotification message={errorMessage} onClose={() => setErrorMessage("")} />}
    </div>
  )
}

