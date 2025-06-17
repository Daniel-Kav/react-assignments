export interface CardProps {
  title: string
  description: string
  image: string
  isActive: boolean
  onToggle: () => void
  onRemove: () => void
}