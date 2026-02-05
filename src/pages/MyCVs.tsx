import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { AppHeader } from '@/components/layout/AppHeader';
import { AppFooter } from '@/components/layout/AppFooter';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  FileText,
  Plus,
  MoreVertical,
  Download,
  Copy,
  Trash2,
  Edit,
  Clock,
  Search,
  FolderOpen,
} from 'lucide-react';
import { Input } from '@/components/ui/input';

interface SavedCV {
  id: string;
  name: string;
  template: string;
  lastModified: string;
  createdAt: string;
  isComplete: boolean;
}

const mockCVs: SavedCV[] = [
  {
    id: '1',
    name: 'CV Principal',
    template: 'Moderno Profissional',
    lastModified: '2024-01-15T10:30:00',
    createdAt: '2024-01-10T09:00:00',
    isComplete: true,
  },
  {
    id: '2',
    name: 'CV para Tech',
    template: 'Tech Pro',
    lastModified: '2024-01-14T15:45:00',
    createdAt: '2024-01-12T14:00:00',
    isComplete: true,
  },
  {
    id: '3',
    name: 'Rascunho Marketing',
    template: 'Criativo',
    lastModified: '2024-01-13T08:20:00',
    createdAt: '2024-01-13T08:00:00',
    isComplete: false,
  },
];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-PT', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const LoadingSkeleton = () => (
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
    {[1, 2, 3].map((i) => (
      <Card key={i}>
        <CardContent className="p-0">
          <Skeleton className="aspect-[3/4]" />
          <div className="p-4 space-y-3">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

export const MyCVs = () => {
  const navigate = useNavigate();
  const [cvs, setCVs] = useState<SavedCV[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const savedCVs = localStorage.getItem('meucv_saved_cvs');
      if (savedCVs) {
        setCVs(JSON.parse(savedCVs));
      } else {
        setCVs(mockCVs);
        localStorage.setItem('meucv_saved_cvs', JSON.stringify(mockCVs));
      }
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const filteredCVs = cvs.filter(
    (cv) =>
      cv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cv.template.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: string) => {
    const updatedCVs = cvs.filter((cv) => cv.id !== id);
    setCVs(updatedCVs);
    localStorage.setItem('meucv_saved_cvs', JSON.stringify(updatedCVs));
  };

  const handleDuplicate = (cv: SavedCV) => {
    const newCV: SavedCV = {
      ...cv,
      id: Date.now().toString(),
      name: `${cv.name} (cópia)`,
      lastModified: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };
    const updatedCVs = [newCV, ...cvs];
    setCVs(updatedCVs);
    localStorage.setItem('meucv_saved_cvs', JSON.stringify(updatedCVs));
  };

  const handleEdit = (id: string) => {
    localStorage.setItem('meucv_editing_id', id);
    navigate('/builder');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <AppHeader showAnalyzeCV showTemplates showNewCV />

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 pt-24">
        <div className="max-w-5xl mx-auto">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
          >
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-1">Meus Currículos</h1>
              <p className="text-muted-foreground">
                {cvs.length} currículo{cvs.length !== 1 ? 's' : ''} guardado
                {cvs.length !== 1 ? 's' : ''}
              </p>
            </div>

            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Pesquisar currículos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </motion.div>

          {/* CV List */}
          {isLoading ? (
            <LoadingSkeleton />
          ) : filteredCVs.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Card className="border-dashed">
                <CardContent className="py-16 text-center">
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <FolderOpen className="w-8 h-8 text-muted-foreground" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {searchQuery ? 'Nenhum resultado encontrado' : 'Nenhum currículo ainda'}
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                    {searchQuery
                      ? 'Tente pesquisar com outros termos.'
                      : 'Comece criando o seu primeiro currículo profissional.'}
                  </p>
                  {!searchQuery && (
                    <Button asChild>
                      <Link to="/templates">
                        <Plus className="w-4 h-4 mr-2" />
                        Criar Primeiro CV
                      </Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence mode="popLayout">
                {filteredCVs.map((cv, index) => (
                  <motion.div
                    key={cv.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card
                      className="group hover:shadow-xl transition-all hover:border-primary/50 cursor-pointer"
                      onClick={() => handleEdit(cv.id)}
                    >
                      <CardContent className="p-0">
                        {/* CV Preview Thumbnail */}
                        <div className="aspect-[3/3.5] bg-[hsl(var(--cv-preview-bg))] p-3 relative overflow-hidden">
                          {!cv.isComplete && (
                            <Badge variant="secondary" className="absolute top-2 right-2 text-xs z-10">
                              Rascunho
                            </Badge>
                          )}

                          {/* Mini CV Preview */}
                          <motion.div
                            className="cv-paper h-full p-2 text-[5px]"
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                          >
                            <div className="border-l-2 border-primary pl-1 mb-1">
                              <div className="font-bold text-[7px] text-foreground">{cv.name}</div>
                              <div className="text-muted-foreground text-[5px]">Currículo</div>
                            </div>

                            <div className="space-y-1">
                              <div className="h-0.5 bg-muted rounded w-full" />
                              <div className="h-0.5 bg-muted rounded w-4/5" />
                              <div className="h-0.5 bg-muted rounded w-3/4" />
                              <div className="h-0.5 bg-muted rounded w-full" />
                              <div className="h-0.5 bg-muted rounded w-2/3" />
                            </div>
                          </motion.div>

                          {/* Hover overlay */}
                          <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Button size="sm" variant="secondary">
                              <Edit className="w-4 h-4 mr-2" />
                              Editar
                            </Button>
                          </div>
                        </div>

                        {/* CV Info */}
                        <div className="p-4 border-t border-border">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-foreground truncate">{cv.name}</h3>
                              <p className="text-xs text-muted-foreground">{cv.template}</p>
                            </div>

                            <DropdownMenu>
                              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEdit(cv.id);
                                  }}
                                >
                                  <Edit className="w-4 h-4 mr-2" />
                                  Editar
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDuplicate(cv);
                                  }}
                                >
                                  <Copy className="w-4 h-4 mr-2" />
                                  Duplicar
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                                  <Download className="w-4 h-4 mr-2" />
                                  Exportar PDF
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-destructive focus:text-destructive"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(cv.id);
                                  }}
                                >
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Eliminar
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>

                          <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            <span>Editado {formatDate(cv.lastModified)}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}

                {/* New CV Card */}
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: filteredCVs.length * 0.05 }}
                >
                  <Card
                    className="border-dashed hover:border-primary cursor-pointer transition-all hover:shadow-lg h-full"
                    onClick={() => navigate('/templates')}
                  >
                    <CardContent className="h-full flex flex-col items-center justify-center py-16">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-14 h-14 bg-accent rounded-full flex items-center justify-center mb-4"
                      >
                        <Plus className="w-7 h-7 text-accent-foreground" />
                      </motion.div>
                      <p className="font-medium text-foreground">Criar Novo CV</p>
                      <p className="text-sm text-muted-foreground">Escolher modelo</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </main>

      <AppFooter />
    </div>
  );
};

export default MyCVs;
