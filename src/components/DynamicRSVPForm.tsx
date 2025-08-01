
import React, { useState } from 'react';
import { CheckCircle, Send, User, Users, Utensils, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface RSVPField {
  name: string;
  label: string;
  type: string;
  options?: string[];
  required?: boolean;
}

interface DynamicRSVPFormProps {
  fields: RSVPField[];
  guestName: string;
  onSubmit: (formData: Record<string, any>) => void;
  onCancel?: () => void;
  existingData?: Record<string, any>;
  mode?: 'submit' | 'edit';
  isInIframe?: boolean;
  className?: string;
}

const DynamicRSVPForm: React.FC<DynamicRSVPFormProps> = ({
  fields,
  guestName,
  onSubmit,
  onCancel,
  existingData = {},
  mode = 'submit',
  isInIframe = false,
  className
}) => {
  const [formData, setFormData] = useState<Record<string, any>>(existingData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Update form data when existingData changes
  React.useEffect(() => {
    setFormData(existingData);
  }, [existingData]);

  const handleInputChange = (fieldName: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    const missingFields = fields
      .filter(field => field.required && !formData[field.name])
      .map(field => field.label);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing Required Fields",
        description: `Please fill in: ${missingFields.join(', ')}`,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
      
      const successMessage = mode === 'edit' 
        ? `Thank you ${guestName}! Your RSVP has been updated successfully.`
        : `Thank you ${guestName} for your detailed response. We look forward to celebrating with you!`;
      
      toast({
        title: mode === 'edit' ? "RSVP Updated Successfully!" : "RSVP Submitted Successfully!",
        description: successMessage,
        variant: "default",
        duration: 5000,
      });
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldIcon = (fieldType: string, fieldName: string) => {
    if (fieldName.toLowerCase().includes('guest') || fieldName.toLowerCase().includes('attend')) {
      return <Users className="w-4 h-4" />;
    }
    if (fieldName.toLowerCase().includes('diet') || fieldName.toLowerCase().includes('food')) {
      return <Utensils className="w-4 h-4" />;
    }
    if (fieldType === 'textarea') {
      return <MessageSquare className="w-4 h-4" />;
    }
    return <User className="w-4 h-4" />;
  };

  const renderField = (field: RSVPField) => {
    const fieldId = `rsvp-${field.name}`;
    const icon = getFieldIcon(field.type, field.name);

    switch (field.type) {
      case 'select':
        return (
          <div key={field.name} className="space-y-2">
            <Label htmlFor={fieldId} className="flex items-center text-gold-light font-medium">
              {icon}
              <span className="ml-2">{field.label}</span>
              {field.required && <span className="text-red-400 ml-1">*</span>}
            </Label>
            <Select onValueChange={(value) => handleInputChange(field.name, value)}>
              <SelectTrigger className="bg-maroon/40 border-gold-light/30 text-cream focus:border-gold-light">
                <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
              </SelectTrigger>
              <SelectContent className="bg-maroon border-gold-light/30">
                {field.options?.map((option) => (
                  <SelectItem key={option} value={option} className="text-cream hover:bg-gold-light/20">
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case 'textarea':
        return (
          <div key={field.name} className="space-y-2">
            <Label htmlFor={fieldId} className="flex items-center text-gold-light font-medium">
              {icon}
              <span className="ml-2">{field.label}</span>
              {field.required && <span className="text-red-400 ml-1">*</span>}
            </Label>
            <Textarea
              id={fieldId}
              placeholder={`Enter ${field.label.toLowerCase()}`}
              value={formData[field.name] || ''}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              className="bg-maroon/40 border-gold-light/30 text-cream placeholder:text-cream/60 focus:border-gold-light resize-none"
              rows={3}
            />
          </div>
        );

      case 'number':
        return (
          <div key={field.name} className="space-y-2">
            <Label htmlFor={fieldId} className="flex items-center text-gold-light font-medium">
              {icon}
              <span className="ml-2">{field.label}</span>
              {field.required && <span className="text-red-400 ml-1">*</span>}
            </Label>
            <Input
              id={fieldId}
              type="number"
              placeholder={`Enter ${field.label.toLowerCase()}`}
              value={formData[field.name] || ''}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              className="bg-maroon/40 border-gold-light/30 text-cream placeholder:text-cream/60 focus:border-gold-light"
            />
          </div>
        );

      default: // text input
        return (
          <div key={field.name} className="space-y-2">
            <Label htmlFor={fieldId} className="flex items-center text-gold-light font-medium">
              {icon}
              <span className="ml-2">{field.label}</span>
              {field.required && <span className="text-red-400 ml-1">*</span>}
            </Label>
            <Input
              id={fieldId}
              type="text"
              placeholder={`Enter ${field.label.toLowerCase()}`}
              value={formData[field.name] || ''}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              className="bg-maroon/40 border-gold-light/30 text-cream placeholder:text-cream/60 focus:border-gold-light"
            />
          </div>
        );
    }
  };

  return (
    <div className={cn("max-w-2xl mx-auto", className)}>
      <div className="relative bg-maroon/60 p-6 md:p-8 rounded-2xl gold-border overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-4 w-8 h-8 border-2 border-gold-light rounded-full"></div>
          <div className="absolute top-4 right-4 w-6 h-6 border-2 border-gold-light rounded-full"></div>
          <div className="absolute bottom-4 left-4 w-6 h-6 border-2 border-gold-light rounded-full"></div>
          <div className="absolute bottom-4 right-4 w-8 h-8 border-2 border-gold-light rounded-full"></div>
        </div>
        
        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="mb-4">
              <CheckCircle className="mx-auto text-gold-light" size={48} />
            </div>
            <h3 className="font-cormorant text-2xl md:text-3xl gold-text font-bold mb-2">
              {mode === 'edit' ? 'Edit Your RSVP' : 'Complete Your RSVP'}
            </h3>
            <p className="text-cream/80 text-sm md:text-base">
              {mode === 'edit' 
                ? 'Update your response below'
                : 'Please provide the following details to help us plan better for you'
              }
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map(renderField)}
            
            {/* Action Buttons */}
            <div className="pt-4 space-y-3">
              <Button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "w-full relative rounded-full transition-all duration-300 bg-gold-gradient hover:shadow-gold text-maroon font-bold overflow-hidden group transform hover:scale-105",
                  isInIframe ? "px-6 py-3 text-base" : "px-8 py-4 text-lg"
                )}
              >
                <span className="relative z-10 flex items-center justify-center">
                  {isSubmitting 
                    ? (mode === 'edit' ? "Updating..." : "Submitting...")
                    : (mode === 'edit' ? "Update RSVP" : "Submit RSVP")
                  }
                  <Send className="ml-2 transition-transform duration-300 group-hover:scale-125" size={isInIframe ? 18 : 20} />
                </span>
                <span className="absolute inset-0 bg-gold-light/20 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full"></span>
              </Button>
              
              {onCancel && (
                <Button
                  type="button"
                  onClick={onCancel}
                  variant="outline"
                  className={cn(
                    "w-full border-gold-light/30 text-gold-light hover:bg-gold-light/10",
                    isInIframe ? "px-6 py-3 text-base" : "px-8 py-4 text-lg"
                  )}
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DynamicRSVPForm;
