import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { EmptyState, ErrorState, LoadingState } from './CollectionState.jsx'

const leaderboardEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : undefined

export default function Leaderboard() {
  const [entries, setEntries] = useState(null)
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('leaderboard', leaderboardEndpoint).then(setEntries).catch((err) => setError(err.message)) }, [])
  if (error) return <ErrorState message={error} />
  if (!entries) return <LoadingState />
  if (!entries.length) return <EmptyState label="leaderboard entries" />
  return <div className="leaderboard-list">{entries.sort((a, b) => b.points - a.points).map((entry, index) => <div className="leaderboard-row" key={entry._id}><span className="rank">{String(index + 1).padStart(2, '0')}</span><span className="flex-grow-1"><strong>{entry.userId?.displayName ?? entry.userId ?? 'Athlete'}</strong><small>{entry.period}</small></span><strong className="points">{entry.points} pts</strong></div>)}</div>
}