
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Flower, Heart, X } from "lucide-react";
import { cn } from "@/lib/utils";

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
      <DialogContent className="max-w-[95vw] sm:max-w-lg md:max-w-xl h-[90vh] sm:h-auto overflow-y-auto bg-maroon/95 border-gold-light/50 text-cream p-3 sm:p-6">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {familyDetails.members.map((member, index) => (
              <div 
                key={index} 
                className={cn(
                  "relative p-4 rounded-lg overflow-hidden gold-border",
                  "bg-gradient-to-br from-maroon/90 to-maroon/70",
                  "transform transition-all duration-300 hover:shadow-gold hover:scale-[1.02]"
                )}
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-2">
                    {member.photo ? (
                      <div className="h-14 w-14 rounded-full overflow-hidden gold-border flex-shrink-0">
                        <img 
                          src={member.photo} 
                          alt={member.name} 
                          className="object-cover w-full h-full"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <div className="h-14 w-14 rounded-full overflow-hidden flex items-center justify-center bg-gold-light/10 text-gold-light gold-border flex-shrink-0">
                        {member.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h3 className="gold-text text-lg font-cormorant font-bold leading-tight">{member.name}</h3>
                      <p className="text-cream/80 text-sm italic">{member.relation}</p>
                    </div>
                  </div>
                  
                  {member.description && (
                    <p className="text-cream/70 text-sm mt-2 line-clamp-3">{member.description}</p>
                  )}
                </div>
                
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold-light/0 via-gold-light/40 to-gold-light/0"></div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FamilyDetailsDialog;
