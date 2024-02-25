
const StoreCard = ({ name, description }: { name: string, description: string }) => {
  return (
    <div className='h-60 border rounded p-2 flex flex-col justify-end text-right hover:bg-secondary transition-colors'>
        <h1 className="text-xl font-bold">{name}</h1>
        <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

export default StoreCard;