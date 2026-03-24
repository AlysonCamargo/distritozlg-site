import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, Send } from "lucide-react";

const BRL = (n: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(n);

interface OrderFormProps {
    onBack: () => void;
}

export default function OrderForm({ onBack }: OrderFormProps) {
    const { items, cartTotal, clearCart } = useCart();
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
        paymentMethod: "pix",
        deliveryType: "now",
        scheduleDate: "",
        scheduleTime: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const phoneNumber = "5511972988072";

        let message = `*NOVO PEDIDO - DISTRITO ZLG*\n\n`;
        message += `*Cliente:* ${formData.name}\n`;
        message += `*Telefone:* ${formData.phone}\n`;
        message += `*Endereço:* ${formData.address}\n`;
        message += `*Entrega:* ${formData.deliveryType === 'now' ? 'Na hora' : `Agendada para ${formData.scheduleDate.split('-').reverse().join('/')} às ${formData.scheduleTime}`}\n`;
        message += `*Pagamento:* ${formData.paymentMethod === 'pix' ? 'PIX' : 'Cartão'}\n\n`;
        message += `*ITENS DO PEDIDO:*\n`;

        items.forEach(item => {
            message += `- ${item.quantity}x ${item.name} (${item.selectedSize}) - ${BRL(item.price * item.quantity)}\n`;
        });

        message += `\n*TOTAL: ${BRL(cartTotal)}*`;

        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

        // Clear cart and open WhatsApp
        // clearCart(); // Optional: clear cart immediately or let user do it? Better to keep it in case they come back.
        // Actually, maybe clear it if they confirm? Let's just open for now.

        window.open(url, "_blank", "noopener,noreferrer");
    };

    return (
        <div className="flex flex-col h-full animate-fadeIn">
            <div className="flex items-center gap-2 mb-6">
                <Button variant="ghost" size="icon" onClick={onBack} className="-ml-2">
                    <ArrowLeft className="w-5 h-5" />
                </Button>
                <h3 className="font-bold text-lg">Finalizar Pedido</h3>
            </div>

            {/* Order Summary */}
            <div className="bg-secondary/10 border border-border p-4 rounded-sm mb-6">
                <h4 className="font-semibold text-xs tracking-widest uppercase mb-3 text-foreground">Resumo</h4>
                <div className="space-y-3 max-h-32 overflow-y-auto pr-2">
                    {items.map((item) => (
                        <div key={`${item.id}-${item.selectedSize}`} className="flex justify-between text-xs text-muted-foreground">
                            <span className="line-clamp-1 flex-1 uppercase tracking-wider">
                                {item.quantity}x {item.name} <span className="font-medium">({item.selectedSize})</span>
                            </span>
                            <span className="font-semibold text-foreground">{BRL(item.price * item.quantity)}</span>
                        </div>
                    ))}
                </div>
                <div className="border-t border-border mt-4 pt-3 flex justify-between font-semibold uppercase tracking-widest text-sm">
                    <span>Total</span>
                    <span>{BRL(cartTotal)}</span>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-6 overflow-y-auto px-1">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Nome Completo</Label>
                        <Input
                            id="name"
                            name="name"
                            required
                            placeholder="Seu nome"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone">Telefone / WhatsApp</Label>
                        <Input
                            id="phone"
                            name="phone"
                            required
                            placeholder="(11) 99999-9999"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="address">Endereço de Entrega</Label>
                        <Input
                            id="address"
                            name="address"
                            required
                            placeholder="Rua, Número, Bairro, Cidade"
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="space-y-3">
                        <Label>Opção de Entrega</Label>
                        <RadioGroup
                            defaultValue="now"
                            onValueChange={(val) => setFormData({ ...formData, deliveryType: val })}
                            className="flex flex-col gap-2"
                        >
                            <div className="flex items-center space-x-2 border p-3 rounded-md cursor-pointer hover:bg-secondary/50">
                                <RadioGroupItem value="now" id="delivery-now" />
                                <Label htmlFor="delivery-now" className="cursor-pointer flex-1 font-medium">Entrega na hora</Label>
                            </div>
                            <div className="flex items-center space-x-2 border p-3 rounded-md cursor-pointer hover:bg-secondary/50">
                                <RadioGroupItem value="schedule" id="delivery-schedule" />
                                <Label htmlFor="delivery-schedule" className="cursor-pointer flex-1 font-medium">Agendar entrega</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {formData.deliveryType === 'schedule' && (
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="scheduleDate">Data da Entrega</Label>
                                <Input
                                    id="scheduleDate"
                                    name="scheduleDate"
                                    type="date"
                                    required={formData.deliveryType === 'schedule'}
                                    value={formData.scheduleDate}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="scheduleTime">Horário</Label>
                                <Input
                                    id="scheduleTime"
                                    name="scheduleTime"
                                    type="time"
                                    required={formData.deliveryType === 'schedule'}
                                    value={formData.scheduleTime}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label>Forma de Pagamento</Label>
                        <RadioGroup
                            defaultValue="pix"
                            onValueChange={(val) => setFormData({ ...formData, paymentMethod: val })}
                            className="flex flex-col gap-2"
                        >
                            <div className="flex items-center space-x-2 border p-3 rounded-md cursor-pointer hover:bg-secondary/50">
                                <RadioGroupItem value="pix" id="pix" />
                                <Label htmlFor="pix" className="cursor-pointer flex-1 font-medium">PIX (5% de desconto)</Label>
                            </div>
                            <div className="flex items-center space-x-2 border p-3 rounded-md cursor-pointer hover:bg-secondary/50">
                                <RadioGroupItem value="card" id="card" />
                                <Label htmlFor="card" className="cursor-pointer flex-1 font-medium">Cartão de Crédito</Label>
                            </div>
                        </RadioGroup>
                    </div>
                </div>

                <div className="mt-auto pt-6 border-t border-border">
                    <div className="flex justify-between items-center mb-6 text-xs uppercase tracking-widest font-semibold text-muted-foreground">
                        <span>A Pagar</span>
                        <span className="text-lg text-foreground">{BRL(cartTotal)}</span>
                    </div>
                    <Button type="submit" className="w-full h-12 text-sm font-semibold tracking-widest uppercase gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-sm">
                        <Send className="w-4 h-4" />
                        Finalizar via WhatsApp
                    </Button>
                    <p className="text-[10px] uppercase tracking-widest text-center text-muted-foreground mt-4">
                        Você será redirecionado para o WhatsApp.
                    </p>
                </div>
            </form>
        </div>
    );
}
