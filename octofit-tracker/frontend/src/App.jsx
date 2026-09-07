import { NavLink, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const views = [
  { path: '/activities', label: 'Activities', component: Activities },
  { path: '/leaderboard', label: 'Leaderboard', component: Leaderboard },
  { path: '/teams', label: 'Teams', component: Teams },
  { path: '/users', label: 'Users', component: Users },
  { path: '/workouts', label: 'Workouts', component: Workouts },
]

function App() {
  const location = useLocation()
  const activeView = views.find((view) => view.path === location.pathname) ?? views[0]
  const View = activeView.component

  return <div className="app-shell"><header className="app-header"><NavLink className="brand" to="/activities"><span className="brand-mark">O</span><span>OctoFit <em>Tracker</em></span></NavLink><nav className="nav-pills" aria-label="Primary navigation">{views.map((view) => <NavLink key={view.path} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to={view.path}>{view.label}</NavLink>)}</nav></header><main className="container-fluid dashboard"><div className="dashboard-heading"><div><span className="eyebrow">OCTOFIT / OVERVIEW</span><h1>{activeView.label}</h1><p>Keep momentum visible, one session at a time.</p></div><span className="status-chip"><span />API connected</span></div><section className="content-panel"><Routes><Route path="/activities" element={<Activities />} /><Route path="/leaderboard" element={<Leaderboard />} /><Route path="/teams" element={<Teams />} /><Route path="/users" element={<Users />} /><Route path="/workouts" element={<Workouts />} /><Route path="*" element={<Navigate to="/activities" replace />} /></Routes></section></main><footer className="app-footer">Build consistency. Track the climb.</footer></div>
}

export default App