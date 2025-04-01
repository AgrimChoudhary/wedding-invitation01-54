
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Flower, Heart, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

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
              {familyDetails.title}
            </span>
          </DialogTitle>
          <DialogDescription className="text-center text-cream/80 text-base sm:text-lg font-cormorant mt-2">
            {familyDetails.description}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 px-1">
            {familyDetails.members.map((member, index) => (
              <div 
                key={index} 
                className={cn(
                  "relative gold-border rounded-lg overflow-hidden",
                  "transition-all duration-300 hover:shadow-gold",
                  isMobile ? "p-3" : "p-4"
                )}
              >
                {member.photo && (
                  <div className="mb-3 w-full h-32 sm:h-40 overflow-hidden rounded-md">
                    <img 
                      src={member.photo} 
                      alt={member.name} 
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                )}
                
                <div className="space-y-1.5">
                  <h3 className="gold-text text-lg sm:text-xl font-cormorant font-bold">{member.name}</h3>
                  <p className="text-cream/80 italic text-sm sm:text-base">{member.relation}</p>
                  
                  {member.description && (
                    <p className="text-cream/70 mt-2 text-xs sm:text-sm">{member.description}</p>
                  )}
                </div>
                
                {/* Show contact information on click for mobile users */}
                {isMobile && (member.phone || member.email || member.location || member.birthdate) && (
                  <Collapsible className="mt-3 pt-2 border-t border-gold-light/20">
                    <CollapsibleTrigger className="w-full text-xs text-gold-light/80 flex items-center justify-center">
                      <span>Show details</span>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-2 pt-2 space-y-1.5 text-xs text-cream/70">
                      {member.birthdate && <p>Birthday: {member.birthdate}</p>}
                      {member.phone && <p>Phone: {member.phone}</p>}
                      {member.email && <p>Email: {member.email}</p>}
                      {member.location && <p>Location: {member.location}</p>}
                    </CollapsibleContent>
                  </Collapsible>
                )}
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FamilyDetailsDialog;
