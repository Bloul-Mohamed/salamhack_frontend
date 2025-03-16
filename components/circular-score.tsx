interface CircularScoreProps {
    score: number
    size?: number
    strokeWidth?: number
    label?: string
    className?: string
}

export default function CircularScore({ score, size = 120, strokeWidth = 10, label, className = "" }: CircularScoreProps) {
    // Calculate the color based on the score
    const getColor = (score: number) => {
        if (score < 40) return "text-red-500"
        if (score < 70) return "text-yellow-500"
        return "text-green-500"
    }

    // Calculate the background color based on the score
    const getBgColor = (score: number) => {
        if (score < 40) return "bg-red-100 dark:bg-red-900/20"
        if (score < 70) return "bg-yellow-100 dark:bg-yellow-900/20"
        return "bg-green-100 dark:bg-green-900/20"
    }

    // Calculate the stroke color based on the score
    const getStrokeColor = (score: number) => {
        if (score < 40) return "#ef4444"
        if (score < 70) return "#eab308"
        return "#22c55e"
    }

    // Calculate the radius and circumference
    const radius = (size - strokeWidth) / 2
    const circumference = radius * 2 * Math.PI
    const strokeDashoffset = circumference - (score / 100) * circumference

    return (
        <div className={`flex flex-col items-center justify-center ${className}`}>
            <div
                className={`relative flex items-center justify-center rounded-full ${getBgColor(score)}`}
                style={{ width: size, height: size }}
            >
                <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                    <circle
                        className="text-gray-200 dark:text-gray-700"
                        strokeWidth={strokeWidth}
                        stroke="currentColor"
                        fill="transparent"
                        r={radius}
                        cx={size / 2}
                        cy={size / 2}
                    />
                    <circle
                        className="transition-all duration-500 ease-in-out"
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        stroke={getStrokeColor(score)}
                        fill="transparent"
                        r={radius}
                        cx={size / 2}
                        cy={size / 2}
                        transform={`rotate(-90 ${size / 2} ${size / 2})`}
                    />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                    <span className={`text-2xl font-bold ${getColor(score)}`}>{score}</span>
                    <span className="text-xs text-muted-foreground">/ 100</span>
                </div>
            </div>
            {label && <span className="mt-2 text-sm font-medium">{label}</span>}
        </div>
    )
}

