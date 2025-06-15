
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
      <DialogContent className="max-w-[95vw] sm:max-w-2xl md:max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-maroon via-maroon/95 to-maroon/90 border-2 border-gold-light/60 text-cream p-4 sm:p-6 backdrop-blur-lg shadow-2xl">
        {/* Decorative corner elements */}
        <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-gold-light/50"></div>
        <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-gold-light/50"></div>
        <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-gold-light/50"></div>
        <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-gold-light/50"></div>
        
        <div className="absolute right-3 top-3 z-10">
          <button 
            onClick={() => onOpenChange(false)}
            className="rounded-full bg-gradient-to-r from-gold-light to-gold-dark border border-cream/20 p-2 text-maroon hover:from-gold-dark hover:to-gold-light transition-all duration-300 transform hover:scale-110 shadow-lg"
          >
            <X className="h-4 w-4 font-bold" />
            <span className="sr-only">Close</span>
          </button>
        </div>
        
        <DialogHeader className="pt-2 relative z-10">
          <DialogTitle className="text-center">
            <div className="relative">
              <span className="gold-text text-2xl sm:text-3xl font-cormorant flex items-center justify-center gap-2 mb-2">
                {familyDetails.side === "bride" ? (
                  <Flower className="text-gold-light h-6 w-6 animate-pulse" />
                ) : (
                  <Heart className="text-gold-light h-6 w-6 animate-pulse" />
                )}
                {familyName} Family
                {familyDetails.side === "bride" ? (
                  <Flower className="text-gold-light h-6 w-6 animate-pulse" />
                ) : (
                  <Heart className="text-gold-light h-6 w-6 animate-pulse" />
                )}
              </span>
              <div className="w-24 h-0.5 bg-gold-gradient mx-auto rounded-full shadow-lg"></div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="mt-6 relative z-10">
          <div className="space-y-3">
            {familyDetails.members.map((member, index) => (
              <Card 
                key={index} 
                className="group bg-gradient-to-r from-maroon/70 via-maroon/60 to-maroon/50 border border-gold-light/30 hover:border-gold-light/60 transition-all duration-300 transform hover:shadow-lg hover:shadow-gold-light/10 overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <Avatar className="h-16 w-16 sm:h-20 sm:w-20 border-2 border-gold-light/50 group-hover:border-gold-light shadow-lg ring-2 ring-gold-light/20 group-hover:ring-gold-light/40 transition-all duration-300">
                          <AvatarImage src={member.photo} alt={member.name} className="object-cover" />
                          <AvatarFallback className="bg-gradient-to-br from-gold-light/30 to-gold-dark/30 text-lg font-bold text-gold-light border border-gold-light/50">
                            {member.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="gold-text text-lg sm:text-xl font-cormorant font-bold group-hover:text-gold-light transition-colors duration-300 truncate">
                        {member.name}
                      </h3>
                      <p className="text-cream/90 italic text-sm font-medium tracking-wide mt-1">
                        {member.relation}
                      </p>
                      
                      {member.description && (
                        <div className="mt-2">
                          <p className="text-cream/80 text-xs leading-relaxed line-clamp-2">
                            {member.description}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
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
