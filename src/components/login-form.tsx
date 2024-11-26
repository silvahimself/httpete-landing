'use client'
import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import Link from "next/link"
import { BitbucketIcon, GitHubIcon, GoogleIcon } from "./icons/bitbucket"
import { signIn } from "next-auth/react"
import { PageProps } from "~/model"

const LoginForm = (props: PageProps) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulating API request
    setIsLoading(false)
  }

  const handleOAuthLogin = (provider: string) => {
    signIn(provider.toLowerCase(), {redirectTo: '/dashboard'})
  }

  return <>
    <form onSubmit={handleLogin} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-white">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-gray-700 border-gray-600 text-white"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password" className="text-white">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="bg-gray-700 border-gray-600 text-white"
        />
      </div>
      <Button
        type="submit"
        className="w-full bg-white text-black shadow-md hover:shadow-lg transition-shadow"
        disabled={isLoading}
      >
        {isLoading ? 'Logging in...' : 'Log in'}
      </Button>
    </form>
    <div className="mt-4 text-center">
      <Link href="/forgot-password" className="text-sm text-white hover:underline">
        Forgot password?
      </Link>
    </div>
    <div className="mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-600" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-gray-800 px-2 text-gray-400">Or continue with</span>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => handleOAuthLogin('GitHub')}
          className="bg-white hover:bg-gray-600 text-white"
        >
          <GitHubIcon size={5} />
          <span style={{ color: 'black' }} >GitHub</span>
        </Button>
        <Button
          type="button"
          onClick={() => handleOAuthLogin('atlassian')}
          className="bg-white hover:bg-gray-600 text-white"
        >
          <BitbucketIcon size={5} />
          <span style={{ color: 'black' }} >Atlassian</span>
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => handleOAuthLogin('Google')}
          className="bg-white hover:bg-gray-600 text-white"
        >
          <GoogleIcon size={5} />
          <span style={{ color: 'black' }} >Google</span>
        </Button>
      </div>
    </div>
  </>
}

export default LoginForm;