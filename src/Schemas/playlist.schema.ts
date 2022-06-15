export default interface PlaylistSchema{
    readonly id: string
    readonly name: string
    readonly isPublic: boolean
    readonly listens: number
    readonly tracks: string[]
    readonly owner: string
}