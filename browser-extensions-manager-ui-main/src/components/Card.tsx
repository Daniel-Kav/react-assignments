import type { CardProps } from "./types"

const Card = ({ title, description, image, isActive, onToggle, onRemove }: CardProps) => {
  return (
    <div className="bg-slate-800 rounded-xl p-5 flex flex-col gap-4 shadow-md relative min-h-[180px]">
      <div className="flex items-center gap-3">
        <img src={image} alt={title} className="w-10 h-10 rounded" />
        <div>
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          <p className="text-slate-300 text-sm mt-1">{description}</p>
        </div>
      </div>
      <div className="flex items-center justify-between mt-auto">
        <button
          className="text-xs px-3 py-1 bg-slate-700 text-red-400 rounded hover:bg-slate-600 transition"
          onClick={onRemove}
        >
          Remove
        </button>
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isActive}
            onChange={onToggle}
            className="sr-only peer"
          />
          <div className="w-9 h-5 bg-slate-600 rounded-full peer peer-checked:bg-green-500 transition relative">
            <div className={`absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform ${isActive ? 'translate-x-4' : ''}`}></div>
          </div>
        </label>
      </div>
    </div>
  )
}

export default Card
