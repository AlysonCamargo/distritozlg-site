import { useEffect, useState } from 'react';

interface Light {
    id: number;
    color: string;
    delay: number;
}

const ChristmasLights = () => {
    const [lights, setLights] = useState<Light[]>([]);

    useEffect(() => {
        const colors = [
            'bg-christmas-red',
            'bg-christmas-green',
            'bg-christmas-gold',
            'bg-christmas-ice',
        ];

        const lightArray: Light[] = Array.from({ length: 25 }, (_, i) => ({
            id: i,
            color: colors[i % colors.length],
            delay: i * 0.15,
        }));

        setLights(lightArray);
    }, []);

    return (
        <div className="w-full bg-background/95 backdrop-blur-sm border-b border-border/50 pointer-events-none relative z-40">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-start py-1">
                    {lights.map((light) => (
                        <div
                            key={light.id}
                            className="relative flex flex-col items-center"
                            style={{ animationDelay: `${light.delay}s` }}
                        >
                            {/* Wire coming from top */}
                            <div className="w-px h-3 bg-gradient-to-b from-gray-400/40 to-gray-400/70" />

                            {/* Light bulb */}
                            <div
                                className={`w-2.5 h-3.5 ${light.color} rounded-b-full animate-twinkle relative`}
                                style={{
                                    animationDelay: `${light.delay}s`,
                                    filter: 'brightness(1.6) saturate(1.4)',
                                    boxShadow: '0 0 8px currentColor, 0 2px 4px rgba(0,0,0,0.3)',
                                }}
                            >
                                {/* Highlight on bulb */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-white/60 rounded-full" />
                            </div>

                            {/* Glow effect underneath */}
                            <div
                                className={`absolute top-3 left-1/2 -translate-x-1/2 w-5 h-5 ${light.color} rounded-full opacity-30 blur-sm`}
                                style={{ animationDelay: `${light.delay}s` }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ChristmasLights;
