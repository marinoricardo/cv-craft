import { useState, useRef } from 'react';
import { User, Camera, X } from 'lucide-react';
import { FormSection } from '../FormSection';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { PersonalData } from '@/types/cv';
import { motion, AnimatePresence } from 'framer-motion';

interface PersonalDataSectionProps {
  data: PersonalData;
  onChange: (data: PersonalData) => void;
  photo?: string;
  onPhotoChange?: (photo: string) => void;
}

export const PersonalDataSection = ({ 
  data, 
  onChange,
  photo,
  onPhotoChange,
}: PersonalDataSectionProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (field: keyof PersonalData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onPhotoChange) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onPhotoChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    if (onPhotoChange) {
      onPhotoChange('');
    }
  };

  return (
    <FormSection
      title="Dados Pessoais"
      icon={<User size={20} />}
      defaultOpen={true}
    >
      <div className="space-y-6">
        {/* Photo Upload */}
        <div className="flex items-start gap-4">
          <div className="relative">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className={`w-24 h-24 rounded-xl overflow-hidden border-2 border-dashed transition-colors ${
                photo ? 'border-primary' : 'border-border hover:border-primary/50'
              }`}
            >
              {photo ? (
                <img
                  src={photo}
                  alt="Foto de perfil"
                  className="w-full h-full object-cover"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-full bg-muted/50 flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <Camera className="w-6 h-6" />
                  <span className="text-[10px]">Adicionar foto</span>
                </button>
              )}
            </motion.div>
            
            <AnimatePresence>
              {photo && (
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  type="button"
                  onClick={handleRemovePhoto}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center shadow-lg"
                >
                  <X className="w-3.5 h-3.5" />
                </motion.button>
              )}
            </AnimatePresence>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
          </div>

          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium text-foreground">Foto de Perfil</p>
            <p className="text-xs text-muted-foreground">
              Adicione uma foto profissional. Formatos: JPG, PNG. Tamanho máximo: 5MB.
            </p>
            {photo && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="mt-2"
              >
                Alterar foto
              </Button>
            )}
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Nome completo *</Label>
            <Input
              id="fullName"
              placeholder="Ex: Maria Silva"
              value={data.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              placeholder="Ex: maria@email.com"
              value={data.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Telefone</Label>
            <Input
              id="phone"
              placeholder="Ex: +258 84 123 4567"
              value={data.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Localização</Label>
            <Input
              id="location"
              placeholder="Ex: Maputo, Moçambique"
              value={data.location}
              onChange={(e) => handleChange('location', e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn (opcional)</Label>
            <Input
              id="linkedin"
              placeholder="Ex: linkedin.com/in/mariasilva"
              value={data.linkedin || ''}
              onChange={(e) => handleChange('linkedin', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="website">Website (opcional)</Label>
            <Input
              id="website"
              placeholder="Ex: mariasilva.com"
              value={data.website || ''}
              onChange={(e) => handleChange('website', e.target.value)}
            />
          </div>
        </div>
      </div>
    </FormSection>
  );
};
