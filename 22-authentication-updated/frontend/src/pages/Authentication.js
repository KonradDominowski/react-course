import AuthForm from '../components/AuthForm';
import { json, redirect } from 'react-router-dom'

export default function AuthenticationPage() {
  return <AuthForm />;
}


export async function action({ request, params }) {
  const loginData = Object.fromEntries(await request.formData())

  const searchParams = new URL(request.url).searchParams
  const mode = searchParams.get('mode') || 'login' // If its undefined, then its login

  if (!['login', 'signup'].includes(mode)) {
    throw json({ message: 'Invalid mode' }, { status: 422 })
  }

  const res = await fetch(`http://localhost:8080/${mode}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginData)
  })

  if (res.status === 422 || res.status === 401) {
    return res
  }

  if (!res.ok) {
    throw json({ message: 'Could not authenticate' }, { status: 500 })
  }

  const resData = await res.json()
  const token = resData.token

  localStorage.setItem('token', token)
  const expirationDate = new Date()
  expirationDate.setHours(expirationDate.getHours() + 1)
  localStorage.setItem('expirationDate', expirationDate.toISOString())
  return redirect('/')
}