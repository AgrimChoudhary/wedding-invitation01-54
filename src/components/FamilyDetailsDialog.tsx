
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Flower, Heart, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

export type FamilyMember = {
  name: string;
  relation: string;
  photo?: string;
  description?: string;
};

export type FamilyDetails = {
  side: "bride" | "groom";
  title: string;
  description: string;
  members: FamilyMember[];
  address?: string;
};

interface FamilyDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  familyDetails: FamilyDetails | null;
}

const FamilyDetailsDialog = ({
  open,
  onOpenChange,
  familyDetails,
}: FamilyDetailsDialogProps) => {
  const isMobile = useIsMobile();
  
  if (!familyDetails) return null;

  // Extract just the family name without "& Family" part
  const familyName = familyDetails.title.split(" Family")[0];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] sm:max-w-lg md:max-w-3xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-maroon via-maroon/95 to-maroon/90 border-2 border-gold-light/60 text-cream p-4 sm:p-8 backdrop-blur-lg shadow-2xl">
        {/* Decorative corner elements */}
        <div className="absolute top-2 left-2 w-8 h-8 border-l-2 border-t-2 border-gold-light/50"></div>
        <div className="absolute top-2 right-2 w-8 h-8 border-r-2 border-t-2 border-gold-light/50"></div>
        <div className="absolute bottom-2 left-2 w-8 h-8 border-l-2 border-b-2 border-gold-light/50"></div>
        <div className="absolute bottom-2 right-2 w-8 h-8 border-r-2 border-b-2 border-gold-light/50"></div>
        
        {/* Elegant pattern background */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFD700' fill-opacity='0.3'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
        
        <div className="absolute right-4 top-4 z-10">
          <button 
            onClick={() => onOpenChange(false)}
            className="rounded-full bg-gradient-to-r from-gold-light to-gold-dark border-2 border-cream/20 p-2 text-maroon hover:from-gold-dark hover:to-gold-light transition-all duration-300 transform hover:scale-110 shadow-lg"
          >
            <X className="h-5 w-5 font-bold" />
            <span className="sr-only">Close</span>
          </button>
        </div>
        
        <DialogHeader className="pt-4 relative z-10">
          <DialogTitle className="text-center">
            <div className="relative">
              <span className="gold-text text-3xl sm:text-4xl font-cormorant flex items-center justify-center gap-3 mb-2">
                {familyDetails.side === "bride" ? (
                  <Flower className="text-gold-light h-7 w-7 sm:h-8 sm:w-8 animate-pulse" />
                ) : (
                  <Heart className="text-gold-light h-7 w-7 sm:h-8 sm:w-8 animate-pulse" />
                )}
                {familyName} Family
                {familyDetails.side === "bride" ? (
                  <Flower className="text-gold-light h-7 w-7 sm:h-8 sm:w-8 animate-pulse" />
                ) : (
                  <Heart className="text-gold-light h-7 w-7 sm:h-8 sm:w-8 animate-pulse" />
                )}
              </span>
              <div className="w-32 h-1 bg-gold-gradient mx-auto rounded-full shadow-lg"></div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="mt-8 relative z-10">
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 px-1">
            {familyDetails.members.map((member, index) => (
              <Card 
                key={index} 
                className="group bg-gradient-to-br from-maroon/80 via-maroon/70 to-maroon/60 border-2 border-gold-light/40 hover:border-gold-light/80 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-gold-light/20 overflow-hidden relative"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Shine effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-light/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                <CardContent className="p-6 flex flex-col items-center text-center relative z-10">
                  <div className="mb-4 relative">
                    <div className="absolute -inset-1 bg-gold-gradient rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                    <Avatar className="relative h-24 w-24 border-3 border-gold-light/60 group-hover:border-gold-light shadow-xl ring-4 ring-gold-light/20 group-hover:ring-gold-light/40 transition-all duration-300">
                      <AvatarImage src={member.photo} alt={member.name} className="object-cover" />
                      <AvatarFallback className="bg-gradient-to-br from-gold-light/30 to-gold-dark/30 text-xl font-bold text-gold-light border border-gold-light/50">
                        {member.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    {/* Decorative ring around avatar */}
                    <div className="absolute -inset-2 border border-gold-light/30 rounded-full animate-spin-slow opacity-50"></div>
                  </div>
                  
                  <h3 className="gold-text text-xl font-cormorant font-bold mt-2 group-hover:text-gold-light transition-colors duration-300">{member.name}</h3>
                  <div className="w-16 h-0.5 bg-gold-gradient mx-auto my-2 rounded-full"></div>
                  <p className="text-cream/90 italic text-sm font-medium tracking-wide">{member.relation}</p>
                  
                  {member.description && (
                    <div className="mt-3 p-3 bg-gradient-to-r from-gold-light/10 to-gold-dark/10 rounded-lg border border-gold-light/20">
                      <p className="text-cream/80 text-xs leading-relaxed">{member.description}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FamilyDetailsDialog;
