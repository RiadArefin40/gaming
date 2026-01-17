"use client"
import { Progress } from "@/components/ui/progress"
import { CheckCircle ,Check } from "lucide-react"

interface TurnoverCardProps {
  title: string
  amount: string
  progress: number
  progressText: string
  progressClassName: string
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
    <div className="rounded-md bg-black-600 p-2">
      {/* Status */}
 
      {/* Title */}
      <div className="flex justify-between">
              <div className="w-2/3">
         <div className="text-md text-slate-100 font-bold border-l-4 border-yellow-400 pl-4 ">{title}</div>

      {/* Amount */}
      <div className="mt-1 text-xl font-semibold">{amount}</div>

      {/* Progress */}
      <div className="mt-3 space-y-1">
        <Progress value={progress}  className={`h-[5px] !rounded-full ${status === "completed" ? "!bg-yellow-500 !text-yellow-300" : "bg-yellow-100"}`} />
        <div className="flex justify-between text-xs text-slate-300">
          <span>{progressText}</span>
          <span>{progress.toFixed(2)}%</span>
        </div>
      </div>

      </div>

             {status === "completed" && (
           
                    <div className="mb-2 border-l border-gray-500 mt-4 pl-4 ml-6 w-1/3 flex-col items-center gap-1 text-yellow-500 text-lg">

          <CheckCircle size={28} className="ml-6 text-green-500" />
         <p className="text-green-500 text-lg font-bold">Completed</p>
        </div>

          
    
      )}


      </div>

     
    </div>
  )
}
