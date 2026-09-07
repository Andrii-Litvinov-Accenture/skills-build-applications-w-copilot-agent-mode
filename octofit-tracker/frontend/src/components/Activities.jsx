import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { EmptyState, ErrorState, LoadingState } from './CollectionState.jsx'

const activitiesEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : undefined

export default function Activities() {
  const [activities, setActivities] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => { fetchCollection('activities', activitiesEndpoint).then(setActivities).catch((err) => setError(err.message)) }, [])

  if (error) return <ErrorState message={error} />
  if (!activities) return <LoadingState />
  if (!activities.length) return <EmptyState label="activities" />

  return <div className="table-responsive"><table className="table align-middle mb-0"><thead><tr><th>Activity</th><th>Duration</th><th>Calories</th><th>Completed</th></tr></thead><tbody>{activities.map((activity) => <tr key={activity._id}><td><strong>{activity.type}</strong></td><td>{activity.durationMinutes} min</td><td>{activity.calories ?? '—'}</td><td>{new Date(activity.completedAt).toLocaleDateString()}</td></tr>)}</tbody></table></div>
}