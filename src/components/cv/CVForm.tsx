import { useState, useMemo } from 'react';
import { CVData } from '@/types/cv';
import { CVProgress } from './CVProgress';
import { PersonalDataSection } from './sections/PersonalDataSection';
import { ProfessionalProfileSection } from './sections/ProfessionalProfileSection';
import { ExperienceSection } from './sections/ExperienceSection';
import { EducationSection } from './sections/EducationSection';
import { SkillsSection } from './sections/SkillsSection';
import { LanguagesSection } from './sections/LanguagesSection';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';

interface CVFormProps {
  cvData: CVData;
  onChange: (data: CVData) => void;
}

type SectionId = 'personal' | 'profile' | 'experience' | 'education' | 'skills' | 'languages';

interface SortableItemProps {
  id: SectionId;
  children: React.ReactNode;
}

const SortableItem = ({ id, children }: SortableItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className={`relative ${isDragging ? 'opacity-90 scale-[1.02]' : ''} transition-transform`}
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  );
};

export const CVForm = ({ cvData, onChange }: CVFormProps) => {
  const [sectionOrder, setSectionOrder] = useState<SectionId[]>([
    'personal',
    'profile',
    'experience',
    'education',
    'skills',
    'languages',
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setSectionOrder((items) => {
        const oldIndex = items.indexOf(active.id as SectionId);
        const newIndex = items.indexOf(over.id as SectionId);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const sectionComponents: Record<SectionId, React.ReactNode> = useMemo(
    () => ({
      personal: (
        <PersonalDataSection
          data={cvData.personalData}
          onChange={(personalData) => onChange({ ...cvData, personalData })}
          photo={(cvData as any).photo}
          onPhotoChange={(photo) => onChange({ ...cvData, photo } as any)}
        />
      ),
      profile: (
        <ProfessionalProfileSection
          data={cvData.professionalProfile}
          onChange={(professionalProfile) => onChange({ ...cvData, professionalProfile })}
        />
      ),
      experience: (
        <ExperienceSection
          data={cvData.experiences}
          onChange={(experiences) => onChange({ ...cvData, experiences })}
        />
      ),
      education: (
        <EducationSection
          data={cvData.education}
          onChange={(education) => onChange({ ...cvData, education })}
        />
      ),
      skills: (
        <SkillsSection
          data={cvData.skills}
          onChange={(skills) => onChange({ ...cvData, skills })}
        />
      ),
      languages: (
        <LanguagesSection
          data={cvData.languages}
          onChange={(languages) => onChange({ ...cvData, languages })}
        />
      ),
    }),
    [cvData, onChange]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <CVProgress cvData={cvData} />

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={sectionOrder} strategy={verticalListSortingStrategy}>
          <div className="space-y-4 md:pl-6">
            {sectionOrder.map((sectionId) => (
              <SortableItem key={sectionId} id={sectionId}>
                {sectionComponents[sectionId]}
              </SortableItem>
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </motion.div>
  );
};
