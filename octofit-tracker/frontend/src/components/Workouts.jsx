import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { EmptyState, ErrorState, LoadingState } from './CollectionState.jsx'

const workoutsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : undefined

export default function Workouts() {
  const [workouts, setWorkouts] = useState(null)
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('workouts', workoutsEndpoint).then(setWorkouts).catch((err) => setError(err.message)) }, [])
  if (error) return <ErrorState message={error} />
  if (!workouts) return <LoadingState />
  if (!workouts.length) return <EmptyState label="workouts" />
  return <div className="row g-3">{workouts.map((workout) => <div className="col-md-6 col-xl-4" key={workout._id}><article className="workout-card"><span className="tile-kicker">{workout.difficulty}</span><h3>{workout.title}</h3><p>{workout.description}</p><footer>{workout.durationMinutes} min <span>{workout.tags?.join(' · ')}</span></footer></article></div>)}</div>
}