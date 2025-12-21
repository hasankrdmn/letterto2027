import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Lock, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const MessageForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: '',
    title: '',
    message: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "🎄 Mesajın geleceğe gönderildi!",
      description: "1 Ocak 2027'de e-postanı kontrol etmeyi unutma.",
    });
    
    setFormData({ email: '', title: '', message: '', password: '' });
    setIsSubmitting(false);
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="glass-card-strong rounded-2xl p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-semibold text-foreground">
              E-posta adresin
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="ornek@mail.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-card border-border/60"
            />
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-semibold text-foreground">
              Mesaj başlığı
            </Label>
            <Input
              id="title"
              name="title"
              type="text"
              placeholder="2027 hedeflerim"
              value={formData.title}
              onChange={handleChange}
              required
              className="bg-card border-border/60"
            />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message" className="text-sm font-semibold text-foreground">
              Gelecekteki kendine mesajın
            </Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Umarım bu yıl hayallerimi gerçekleştirdim…"
              value={formData.message}
              onChange={handleChange}
              required
              className="bg-card border-border/60"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-semibold text-foreground">
              Mesaj şifresi
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
              className="bg-card border-border/60"
            />
            <p className="text-xs text-muted-foreground flex items-center gap-1.5">
              <Lock className="w-3 h-3" />
              Bu şifre mesajı okumak için gereklidir. Biz bu şifreyi görmeyiz.
            </p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="festive"
            size="xl"
            className="w-full mt-6"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Gönderiliyor...
              </span>
            ) : (
              "🎄 Mesajı Geleceğe Gönder"
            )}
          </Button>
        </form>

        {/* Security Note */}
        <div className="mt-6 pt-5 border-t border-border/40">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/15 border border-secondary/20">
            <Shield className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
            <p className="text-sm text-foreground/80">
              Mesajın tarayıcında şifrelenir. Biz dahil kimse içeriği okuyamaz.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageForm;
