
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Flower, Heart, PhoneIcon, Mail, MapPin, Cake } from "lucide-react";

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
      <DialogContent className="max-w-2xl bg-maroon/95 border-gold-light/50 text-cream">
        <DialogHeader>
          <DialogTitle className="text-center">
            <span className="gold-text text-3xl font-cormorant flex items-center justify-center gap-2">
              {familyDetails.side === "bride" ? (
                <Flower className="text-gold-light h-6 w-6" />
              ) : (
                <Heart className="text-gold-light h-6 w-6" />
              )}
              {familyDetails.title}
            </span>
          </DialogTitle>
          <DialogDescription className="text-center text-cream/80 text-lg font-cormorant mt-2">
            {familyDetails.description}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          {familyDetails.address && (
            <div className="text-center mb-4 flex items-center justify-center gap-2">
              <MapPin className="text-gold-light h-4 w-4" />
              <span className="text-cream/80">{familyDetails.address}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {familyDetails.members.map((member, index) => (
              <div 
                key={index} 
                className="relative gold-border group bg-maroon/60 rounded-lg p-4 hover:shadow-gold transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gold-light/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <h3 className="gold-text text-xl font-cormorant font-bold">{member.name}</h3>
                  <p className="text-cream/80 italic">{member.relation}</p>
                  
                  {member.description && (
                    <p className="text-cream/70 mt-2 text-sm">{member.description}</p>
                  )}
                  
                  <div className="mt-3 flex flex-col space-y-1.5">
                    {member.birthdate && (
                      <div className="flex items-center gap-2 text-xs text-cream/70">
                        <Cake className="h-3.5 w-3.5 text-gold-light/70" />
                        <span>{member.birthdate}</span>
                      </div>
                    )}
                    
                    {member.phone && (
                      <div className="flex items-center gap-2 text-xs text-cream/70">
                        <PhoneIcon className="h-3.5 w-3.5 text-gold-light/70" />
                        <span>{member.phone}</span>
                      </div>
                    )}
                    
                    {member.email && (
                      <div className="flex items-center gap-2 text-xs text-cream/70">
                        <Mail className="h-3.5 w-3.5 text-gold-light/70" />
                        <span>{member.email}</span>
                      </div>
                    )}
                    
                    {member.location && (
                      <div className="flex items-center gap-2 text-xs text-cream/70">
                        <MapPin className="h-3.5 w-3.5 text-gold-light/70" />
                        <span>{member.location}</span>
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
