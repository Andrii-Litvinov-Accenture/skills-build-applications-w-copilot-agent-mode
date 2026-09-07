import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { EmptyState, ErrorState, LoadingState } from './CollectionState.jsx'

export default function Teams() {
  const [teams, setTeams] = useState(null)
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('teams').then(setTeams).catch((err) => setError(err.message)) }, [])
  if (error) return <ErrorState message={error} />
  if (!teams) return <LoadingState />
  if (!teams.length) return <EmptyState label="teams" />
  return <div className="row g-3">{teams.map((team) => <div className="col-md-6" key={team._id}><article className="team-tile"><span className="tile-kicker">TEAM</span><h3>{team.name}</h3><p>{team.description || 'A team focused on consistent progress.'}</p><span className="text-muted">{team.memberIds?.length ?? 0} members</span></article></div>)}</div>
}