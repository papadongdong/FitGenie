import { useEffect, useRef } from "react";

interface BMIGaugeProps {
  bmi: number;
}

export default function BMIGauge({ bmi }: BMIGaugeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = 100;
    const centerY = 80;
    const radius = 60;

    // Clear canvas
    ctx.clearRect(0, 0, 200, 100);

    // Draw gauge background
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, 0);
    ctx.lineWidth = 15;
    ctx.strokeStyle = '#1F2937';
    ctx.stroke();

    // Draw colored segments
    const segments = [
      { start: Math.PI, end: Math.PI * 1.25, color: '#3B82F6' }, // Underweight
      { start: Math.PI * 1.25, end: Math.PI * 1.75, color: '#10B981' }, // Normal
      { start: Math.PI * 1.75, end: Math.PI * 1.9, color: '#F59E0B' }, // Overweight
      { start: Math.PI * 1.9, end: 0, color: '#EF4444' } // Obese
    ];

    segments.forEach(segment => {
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, segment.start, segment.end);
      ctx.lineWidth = 15;
      ctx.strokeStyle = segment.color;
      ctx.stroke();
    });

    // Draw needle
    let needleAngle;
    if (bmi < 18.5) needleAngle = Math.PI + (bmi / 18.5) * (Math.PI * 0.25);
    else if (bmi < 25) needleAngle = Math.PI * 1.25 + ((bmi - 18.5) / 6.5) * (Math.PI * 0.5);
    else if (bmi < 30) needleAngle = Math.PI * 1.75 + ((bmi - 25) / 5) * (Math.PI * 0.15);
    else needleAngle = Math.PI * 1.9 + Math.min((bmi - 30) / 10, 1) * (Math.PI * 0.1);

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(
      centerX + Math.cos(needleAngle) * (radius - 10),
      centerY + Math.sin(needleAngle) * (radius - 10)
    );
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#FFFFFF';
    ctx.stroke();

    // Draw center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 5, 0, 2 * Math.PI);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
  }, [bmi]);

  return (
    <div className="bmi-gauge" data-testid="bmi-gauge">
      <canvas ref={canvasRef} width="200" height="100" />
    </div>
  );
}
