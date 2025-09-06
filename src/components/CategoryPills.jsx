export default function CategoryPills({ categories, active, onSelect }){
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map(c => (
        <button
          key={c}
          onClick={() => onSelect(c === active ? null : c)}
          className={"pill " + (c === active ? "bg-brand-500 text-white border-brand-600" : "")}>
          {c}
        </button>
      ))}
    </div>
  )
}
