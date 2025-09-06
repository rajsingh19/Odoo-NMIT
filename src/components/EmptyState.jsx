export default function EmptyState({ title="Nothing here yet", hint="Try adding something new." , action=null}){
  return (
    <div className="text-center py-20 border-2 border-dashed border-neutral-200 rounded-2xl bg-white">
      <div className="text-xl font-semibold">{title}</div>
      <div className="text-neutral-500 mt-2">{hint}</div>
      {action}
    </div>
  )
}
