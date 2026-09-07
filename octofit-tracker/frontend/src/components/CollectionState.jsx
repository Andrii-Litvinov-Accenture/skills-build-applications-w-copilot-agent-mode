export function LoadingState() {
  return <div className="empty-state"><span className="spinner-border spinner-border-sm me-2" />Loading data</div>
}

export function ErrorState({ message }) {
  return <div className="alert alert-warning border-0 mb-0" role="alert">{message}</div>
}

export function EmptyState({ label }) {
  return <div className="empty-state">No {label} have been added yet.</div>
}