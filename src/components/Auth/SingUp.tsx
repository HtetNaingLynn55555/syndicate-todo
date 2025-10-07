import { useState } from "react"
import supabase from "../../config/supabaseClient"
import { Button, Card, Label, TextInput } from "flowbite-react"
import { Link } from "react-router"
import { JSX } from "react"

export const SingUp = (): JSX.Element => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/login`,
      },
    })
    if (error) {
      setError(error.message)
    } else {
      setSuccess("Check your email for confirmation link.")
      setEmail("")
      setPassword("")
    }
  }

  return (
    <div className="min-h-dvh bg-black text-white flex justify-center font-Roboto items-center ">
      <Card className="max-w-sm">
        <h2 className="text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1">Email</Label>
            </div>
            <TextInput
              id="email1"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="name@flowbite.com"
              autoComplete="off"
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1">Password</Label>
            </div>
            <TextInput
              id="password1"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="text-red-500">{error}</div>}
          {success && <div className="text-green-500">{success}</div>}
          <div>
            <div className="mb-2 block">
              <Label>Already have an account?</Label>
            </div>
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Card>
    </div>
  )
}
