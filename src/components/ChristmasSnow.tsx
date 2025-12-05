import { useEffect, useState } from 'react';

interface Snowflake {
    id: number;
    left: number;
    animationDuration: number;
    size: number;
    delay: number;
}

const ChristmasSnow = () => {
    const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

    useEffect(() => {
        // Generate 50 snowflakes with random properties
        const flakes: Snowflake[] = Array.from({ length: 50 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            animationDuration: 10 + Math.random() * 20, // 10-30 seconds
            size: 2 + Math.random() * 4, // 2-6px
            delay: Math.random() * 10, // 0-10 seconds delay
        }));
        setSnowflakes(flakes);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {snowflakes.map((flake) => (
                <div
                    key={flake.id}
                    className={`absolute rounded-full bg-white/70 ${flake.id % 2 === 0 ? 'animate-snowfall' : 'animate-snowfall-left'
                        }`}
                    style={{
                        left: `${flake.left}%`,
                        width: `${flake.size}px`,
                        height: `${flake.size}px`,
                        animationDuration: `${flake.animationDuration}s`,
                        animationDelay: `${flake.delay}s`,
                        boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
                    }}
                />
            ))}
        </div>
    );
};

export default ChristmasSnow;
