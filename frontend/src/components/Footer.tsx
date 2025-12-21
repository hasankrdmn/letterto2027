import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-8 mt-12">
      <div className="container">
        <div className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
          <span>Made by</span>
          <span className="font-semibold text-foreground">Hasan Karaduman</span>
          <Heart className="w-4 h-4 text-primary fill-primary" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
