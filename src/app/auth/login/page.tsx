"use client"

import { InputText } from "@/components/parts/Input"
import { ErrorNotification, SuccessNotification } from "@/components/parts/Notification"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const response = await fetch("/api/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccessMessage("Login successful!")
        // Here you would typically store the user's session token
        // and redirect to a dashboard or home page
        // For example:
        document.cookie = `token=${data.token}; path=/;`
        router.push('/dashboard');
      } else {
        setErrorMessage(data.message || "Login failed. Please check your credentials and try again.")
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later. "+`${error}`)
    }
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-96">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#a10f0f]">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
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
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#a10f0f] hover:bg-[#4d0d0d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#a10f0f] transition-colors duration-200"
        >
          Login
        </button>
      </form>
      {successMessage && <SuccessNotification message={successMessage} onClose={() => setSuccessMessage("")} />}
      {errorMessage && <ErrorNotification message={errorMessage} onClose={() => setErrorMessage("")} />}
    </div>
  )
}

