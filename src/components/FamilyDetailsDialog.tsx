
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
  age?: string;
  phone?: string;
  email?: string;
  location?: string;
  description?: string;
  birthdate?: string;
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
      <DialogContent className="max-w-[95vw] sm:max-w-lg md:max-w-2xl max-h-[90vh] overflow-y-auto bg-maroon/95 border-gold-light/50 text-cream p-3 sm:p-6">
        <div className="absolute right-3 top-3 z-10">
          <button 
            onClick={() => onOpenChange(false)}
            className="rounded-full bg-maroon/80 border border-gold-light/30 p-1 text-gold-light hover:bg-gold-light/10 transition-colors"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </div>
        
        <DialogHeader className="pt-2">
          <DialogTitle className="text-center">
            <span className="gold-text text-2xl sm:text-3xl font-cormorant flex items-center justify-center gap-2">
              {familyDetails.side === "bride" ? (
                <Flower className="text-gold-light h-5 w-5 sm:h-6 sm:w-6" />
              ) : (
                <Heart className="text-gold-light h-5 w-5 sm:h-6 sm:w-6" />
              )}
              {familyName} Family
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="mt-6">
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 px-1">
            {familyDetails.members.map((member, index) => (
              <Card 
                key={index} 
                className="bg-maroon/60 border-gold-light/30 hover:shadow-gold transition-all duration-300"
              >
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <div className="mb-3">
                    {member.photo ? (
                      <Avatar className="h-20 w-20 border-2 border-gold-light/50">
                        <AvatarImage src={member.photo} alt={member.name} />
                        <AvatarFallback className="bg-gold-light/20 text-lg font-medium text-gold-light">
                          {member.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    ) : (
                      <Avatar className="h-20 w-20 border-2 border-gold-light/50">
                        <AvatarFallback className="bg-gold-light/20 text-lg font-medium text-gold-light">
                          {member.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                  
                  <h3 className="gold-text text-lg font-cormorant font-bold mt-1">{member.name}</h3>
                  <p className="text-cream/80 italic text-sm">{member.relation}</p>
                  
                  {member.description && (
                    <p className="text-cream/70 mt-2 text-xs px-2">{member.description}</p>
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
