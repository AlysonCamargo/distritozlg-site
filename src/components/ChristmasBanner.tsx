import { useState, useEffect } from 'react';
import { X, Gift } from 'lucide-react';

const ChristmasBanner = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const christmas = new Date('2025-12-25T00:00:00');
            const now = new Date();
            const difference = christmas.getTime() - now.getTime();

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                });
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <div className="fixed top-20 left-0 right-0 z-40 animate-slideDown">
            <div className="bg-gradient-christmas text-white py-3 px-4 shadow-lg">
                <div className="container mx-auto flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 flex-1">
                        <Gift className="w-5 h-5 animate-float-gentle hidden sm:block" />
                        <div className="flex-1">
                            <p className="font-bold text-sm sm:text-base">
                                🎄 ESPECIAL DE NATAL - Frete Grátis em compras acima de R$ 150!
                            </p>
                            <div className="flex gap-4 mt-1 text-xs sm:text-sm">
                                <span className="font-mono">
                                    {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
                                </span>
                                <span className="hidden sm:inline">até o Natal</span>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsVisible(false)}
                        className="text-white hover:text-christmas-snow transition-colors p-1"
                        aria-label="Fechar banner"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChristmasBanner;
