import { useEffect, useRef } from "react"

export default function RadarVisualization() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        // Set canvas dimensions
        canvas.width = 400
        canvas.height = 400

        // Center of the radar
        const centerX = canvas.width / 2
        const centerY = canvas.height / 2
        const radius = Math.min(centerX, centerY) - 10

        // Animation variables
        let rotation = 0
        const blips: { x: number; y: number; alpha: number; size: number; color: string }[] = []

        // Generate random blips
        for (let i = 0; i < 8; i++) {
            const angle = Math.random() * Math.PI * 2
            const distance = Math.random() * radius * 0.8

            // Randomly choose between blue and orange colors
            const color =
                Math.random() > 0.3
                    ? `rgba(45, 164, 255, ${0.7 + Math.random() * 0.3})`
                    : `rgba(255, 139, 50, ${0.7 + Math.random() * 0.3})`

            blips.push({
                x: centerX + Math.cos(angle) * distance,
                y: centerY + Math.sin(angle) * distance,
                alpha: 0.7 + Math.random() * 0.3,
                size: 2 + Math.random() * 3,
                color,
            })
        }

        const drawRadar = () => {
            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Draw radar background
            const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius)
            gradient.addColorStop(0, "rgba(4, 38, 77, 0.3)")
            gradient.addColorStop(0.7, "rgba(4, 38, 77, 0.1)")
            gradient.addColorStop(1, "rgba(4, 38, 77, 0.05)")

            ctx.fillStyle = gradient
            ctx.beginPath()
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
            ctx.fill()

            // Draw radar circles
            ctx.strokeStyle = "rgba(45, 164, 255, 0.4)"
            ctx.lineWidth = 1

            for (let i = 1; i <= 4; i++) {
                const circleRadius = (radius / 4) * i
                ctx.beginPath()
                ctx.arc(centerX, centerY, circleRadius, 0, Math.PI * 2)
                ctx.stroke()
            }

            // Draw radar lines
            for (let i = 0; i < 8; i++) {
                const angle = (Math.PI / 4) * i
                ctx.beginPath()
                ctx.moveTo(centerX, centerY)
                ctx.lineTo(centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius)
                ctx.stroke()
            }

            // Draw scanning line
            const scanGradient = ctx.createLinearGradient(
                centerX,
                centerY,
                centerX + Math.cos(rotation) * radius,
                centerY + Math.sin(rotation) * radius,
            )
            scanGradient.addColorStop(0, "rgba(45, 164, 255, 1)")
            scanGradient.addColorStop(1, "rgba(45, 164, 255, 0.2)")

            ctx.strokeStyle = scanGradient
            ctx.lineWidth = 3
            ctx.beginPath()
            ctx.moveTo(centerX, centerY)
            ctx.lineTo(centerX + Math.cos(rotation) * radius, centerY + Math.sin(rotation) * radius)
            ctx.stroke()

            // Draw scanning arc
            const arcGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius)
            arcGradient.addColorStop(0, "rgba(45, 164, 255, 0.4)")
            arcGradient.addColorStop(0.7, "rgba(45, 164, 255, 0.1)")
            arcGradient.addColorStop(1, "rgba(45, 164, 255, 0)")

            ctx.fillStyle = arcGradient
            ctx.beginPath()
            ctx.moveTo(centerX, centerY)
            ctx.arc(centerX, centerY, radius, rotation - 0.3, rotation, false)
            ctx.fill()

            // Draw center point
            ctx.fillStyle = "rgba(45, 164, 255, 0.8)"
            ctx.beginPath()
            ctx.arc(centerX, centerY, 4, 0, Math.PI * 2)
            ctx.fill()

            // Draw pulsing ring around center
            const pulseSize = 10 + Math.sin(Date.now() * 0.005) * 5
            ctx.strokeStyle = "rgba(45, 164, 255, 0.6)"
            ctx.lineWidth = 2
            ctx.beginPath()
            ctx.arc(centerX, centerY, pulseSize, 0, Math.PI * 2)
            ctx.stroke()

            // Draw blips
            blips.forEach((blip) => {
                ctx.fillStyle = blip.color
                ctx.beginPath()
                ctx.arc(blip.x, blip.y, blip.size, 0, Math.PI * 2)
                ctx.fill()

                // Add glow effect
                ctx.beginPath()
                ctx.arc(blip.x, blip.y, blip.size * 2, 0, Math.PI * 2)
                const glowGradient = ctx.createRadialGradient(blip.x, blip.y, blip.size, blip.x, blip.y, blip.size * 2)
                // Fix: Correctly format the color string for the gradient
                const baseColor = blip.color.match(/\d+(\.\d+)?/g)
                if (baseColor && baseColor.length >= 3) {
                    const [r, g, b, a = 1] = baseColor.map(Number)
                    glowGradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${a * 0.3})`)
                    glowGradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)
                } else {
                    // Fallback to a default color if parsing fails
                    glowGradient.addColorStop(0, "rgba(45, 164, 255, 0.3)")
                    glowGradient.addColorStop(1, "rgba(45, 164, 255, 0)")
                }
                ctx.fillStyle = glowGradient
                ctx.fill()
            })

            // Update rotation
            rotation += 0.01
            if (rotation >= Math.PI * 2) {
                rotation = 0
            }

            // Request next frame
            requestAnimationFrame(drawRadar)
        }

        drawRadar()

        return () => {
            // Cleanup if needed
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="w-full max-w-md h-auto aspect-square rounded-md bg-black shadow-lg shadow-main-900/20"
        />
    )
}

