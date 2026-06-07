import { getCurrentCount } from "../_lib/helper"
import { MAX_PER_DAY } from "../_lib/config"

export default function AiLimitTracker ({chart}){
    return (<div className="text-center text-xs text-black/40 mt-1">
   {getCurrentCount(chart)} / {MAX_PER_DAY} questions today
</div>)
}