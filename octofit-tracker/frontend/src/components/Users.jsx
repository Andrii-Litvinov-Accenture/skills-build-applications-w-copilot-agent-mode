import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { EmptyState, ErrorState, LoadingState } from './CollectionState.jsx'

const usersEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : undefined

export default function Users() {
  const [users, setUsers] = useState(null)
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('users', usersEndpoint).then(setUsers).catch((err) => setError(err.message)) }, [])
  if (error) return <ErrorState message={error} />
  if (!users) return <LoadingState />
  if (!users.length) return <EmptyState label="users" />
  return <div className="user-grid">{users.map((user) => <article className="user-row" key={user._id}><div className="avatar">{user.displayName?.slice(0, 1).toUpperCase() ?? '?'}</div><span><strong>{user.displayName}</strong><small>@{user.username}</small></span><span className="ms-auto text-muted">{user.email}</span></article>)}</div>
}