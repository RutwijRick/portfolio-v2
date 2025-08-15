
const BlobsBG = () => {
    return (
        <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
            <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full blur-3xl opacity-20 bg-cyan-300 dark:bg-cyan-500 animate-pulse" />
            <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-20 bg-fuchsia-300 dark:bg-fuchsia-500 animate-pulse" />
        </div>
    )
}

export default BlobsBG