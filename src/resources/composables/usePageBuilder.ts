/**
 * Page builder instruction
 * Not in state because it's used and built on "generate" (es: nuxt 2)
 */
export interface pageBuilderInstructionsMap {
    type :string
    variant?: string
    title?: string
    subtitle?: string
    text?: string
    image?: string
    imageThumbnail?: string
    order ?: number
}

export interface pageBuilderMap {
    id :string
    uri :string
    lang :string
    instructions :pageBuilderInstructionsMap[]
}

export default () => {
    return {}
}