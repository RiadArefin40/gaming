import { Progress } from "@/components/ui/progress"
import { CheckCircle } from "lucide-react"

interface TurnoverCardProps {
  title: string
  amount: string
  progress: number
  progressText: string
  status?: "completed" | "active"
}

export default function TurnoverCard({
  title,
  amount,
  progress,
  progressText,
  status = "active",
}: TurnoverCardProps) {
  return (
    <div className="rounded-xl bg-slate-700 p-4">
      {/* Status */}
      {status === "completed" && (
        <div className="mb-2 flex items-center gap-1 text-green-500 text-xs">
          <CheckCircle size={14} />
          টার্নওভার সমাপ্ত
        </div>
      )}

      {/* Title */}
      <div className="text-sm text-neutral-300">{title}</div>

      {/* Amount */}
      <div className="mt-1 text-xl font-semibold">{amount}</div>

      {/* Progress */}
      <div className="mt-3 space-y-1">
        <Progress value={80} className="h-2 " />
        <div className="flex justify-between text-xs text-orange-500">
          <span>{progressText}</span>
          <span>{progress.toFixed(2)}%</span>
        </div>
      </div>
    </div>
  )
}
