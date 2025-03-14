
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Flower, Heart, PhoneIcon, Mail, MapPin, Cake, X } from "lucide-react";
import { cn } from "@/lib/utils";

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
  if (!familyDetails) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] sm:max-w-lg md:max-w-2xl h-[90vh] sm:h-auto overflow-y-auto bg-maroon/95 border-gold-light/50 text-cream p-3 sm:p-6">
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

        <div className="mt-4">
          {familyDetails.address && (
            <div className="text-center mb-4 flex items-center justify-center gap-2">
              <MapPin className="text-gold-light h-4 w-4" />
              <span className="text-cream/80 text-sm sm:text-base">{familyDetails.address}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-6 px-1">
            {familyDetails.members.map((member, index) => (
              <div 
                key={index} 
                className={cn(
                  "relative gold-border group bg-maroon/60 rounded-lg p-3 sm:p-4",
                  "transition-all duration-300 hover:shadow-gold",
                  "before:absolute before:inset-0 before:rounded-lg before:bg-gold-light/5 before:opacity-0",
                  "before:transition-opacity before:duration-300 group-hover:before:opacity-100"
                )}
              >
                <div className="relative z-10">
                  <h3 className="gold-text text-lg sm:text-xl font-cormorant font-bold">{member.name}</h3>
                  <p className="text-cream/80 italic text-sm sm:text-base">{member.relation}</p>
                  
                  {member.description && (
                    <p className="text-cream/70 mt-2 text-xs sm:text-sm">{member.description}</p>
                  )}
                  
                  <div className="mt-3 flex flex-col space-y-1.5">
                    {member.birthdate && (
                      <div className="flex items-center gap-2 text-xs text-cream/70">
                        <Cake className="h-3.5 w-3.5 text-gold-light/70 flex-shrink-0" />
                        <span className="truncate">{member.birthdate}</span>
                      </div>
                    )}
                    
                    {member.phone && (
                      <div className="flex items-center gap-2 text-xs text-cream/70">
                        <PhoneIcon className="h-3.5 w-3.5 text-gold-light/70 flex-shrink-0" />
                        <a 
                          href={`tel:${member.phone.replace(/\s+/g, '')}`} 
                          className="truncate hover:text-gold-light/90 transition-colors"
                        >
                          {member.phone}
                        </a>
                      </div>
                    )}
                    
                    {member.email && (
                      <div className="flex items-center gap-2 text-xs text-cream/70">
                        <Mail className="h-3.5 w-3.5 text-gold-light/70 flex-shrink-0" />
                        <a 
                          href={`mailto:${member.email}`} 
                          className="truncate hover:text-gold-light/90 transition-colors"
                        >
                          {member.email}
                        </a>
                      </div>
                    )}
                    
                    {member.location && (
                      <div className="flex items-center gap-2 text-xs text-cream/70">
                        <MapPin className="h-3.5 w-3.5 text-gold-light/70 flex-shrink-0" />
                        <span className="truncate">{member.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FamilyDetailsDialog;
