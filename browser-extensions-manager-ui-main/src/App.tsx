import { useEffect, useState } from "react"
import Card from "./components/Card"
import data from "./data.json"

const FILTERS = ["All", "Active", "Inactive"] as const

type Filter = typeof FILTERS[number]

type Extension = {
  logo: string
  name: string
  description: string
  isActive: boolean
}

function App() {
  const [extensions, setExtensions] = useState<Extension[]>([])
  const [filter, setFilter] = useState<Filter>("All")
  const [search, setSearch] = useState("")

  useEffect(() => {
    setExtensions(data as Extension[])
  }, [])

  const handleToggle = (idx: number) => {
    setExtensions((prev) =>
      prev.map((ext, i) =>
        i === idx ? { ...ext, isActive: !ext.isActive } : ext
      )
    )
  }

  const handleRemove = (idx: number) => {
    setExtensions((prev) => prev.filter((_, i) => i !== idx))
  }

  const filtered = extensions.filter((ext) => {
    if (filter === "Active") return ext.isActive
    if (filter === "Inactive") return !ext.isActive
    return true
  }).filter((ext) =>
    ext.name.toLowerCase().includes(search.toLowerCase()) ||
    ext.description.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 text-white px-4 pb-10">
      {/* Header */}
      <header className="flex items-center gap-3 py-8 max-w-5xl mx-auto">
        <img src="./assets/images/logo.svg" alt="Extensions" className="w-10 h-10" />
        <h1 className="text-2xl font-bold flex-1">Extensions</h1>
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search extensions..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-slate-800 text-white rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </div>
        <button className="ml-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 transition">
          <img src="./assets/images/icon-moon.svg" alt="Settings" className="w-6 h-6" />
        </button>
      </header>

      {/* Tabs */}
      <div className="flex gap-3 justify-end max-w-5xl mx-auto mb-6">
        {FILTERS.map(f => (
          <button
            key={f}
            className={`px-4 py-1 rounded-full text-sm font-medium transition border border-transparent ${
              filter === f ? "bg-pink-600 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Extensions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {filtered.length === 0 && (
          <div className="col-span-full text-center text-slate-400 py-10">No extensions found.</div>
        )}
        {filtered.map((ext, idx) => (
          <Card
            key={ext.name}
            title={ext.name}
            description={ext.description}
            image={ext.logo}
            isActive={ext.isActive}
            onToggle={() => handleToggle(extensions.indexOf(ext))}
            onRemove={() => handleRemove(extensions.indexOf(ext))}
          />
        ))}
      </div>
    </div>
  )
}

export default App
